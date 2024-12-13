import express from "express";


import * as dotenv from 'dotenv';
dotenv.config();


import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";

import {JWT_PASSWORD} from "./config";

if (!JWT_PASSWORD) {
    throw new Error('JWT_PASSWORD is not defined in the environment variables');
}else{
    console.log("VALID JWT");
}
import { UserMiddleware } from "./middleware";
import { random } from "./utils";
import cors from  "cors";
import bcrypt from "bcrypt";
import { SchemaZod } from "./zodFile";






const  app=express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup",async (req:any, res:any)=>{
    //zod validation , hash the password , all try catch status code update from slides
    const result=SchemaZod.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect data format",
            error: result.error,
        });
    }

    const username=req.body.username;
    const password=req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        await UserModel.create({
            username:username,
            password:hashedPassword
        })
    
        res.json({
            message:"User Signed Up"
        })
    } catch(e){
        res.status(411).json({
            message:"Username alreadyu exists"
        })
    }

})

app.post("/api/v1/signin",async(req:any, res:any)=>{

    const result=SchemaZod.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect data format",
            error: result.error,
        });
    }

    const username=req.body.username;
    const password=req.body.password;

   
    try{
        const existingUser=await UserModel.findOne({
            username

        })

        if (!existingUser || !existingUser.password ) {
            return res.status(401).json({
                message: "Incorrect Credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        


        if(isPasswordValid){
            const token=jwt.sign({
                id:existingUser._id
            },JWT_PASSWORD, { expiresIn: '1h' })

            return res.json({
                token
            });
        }else{
            return res.status(411).json({
                message:"Incorrect Credentials"
            })
        }
    }catch (err){
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
})

app.post("/api/v1/content",UserMiddleware,async(req,res)=>{
    const  link=req.body.link;
    const type=req.body.type;

    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        userId:req.userId,
        tags:[]
    })

    res.json({
        message:"Content Added"
    })

})
app.get("/api/v1/content", UserMiddleware, async (req, res) => {
    
    const userId = req.userId;

    const content = await ContentModel.find({ userId: userId })
        // .select("title type") 
        .populate("userId", "username");  

    res.json({
        
        content,
    });

});

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})


app.post("/api/v1/brain/share",UserMiddleware,async (req,res)=>{

    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash=random(10);
        await LinkModel.create({
            userId:req.userId,
            hash:hash
        })
        
        res.json({
            hash
        })
    }else{
        await LinkModel.deleteOne({
            userId:req.userId
        })
    }

    res.json({
        message:"removed Link"
    })


})

app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    //after sharing link we can get that link
    const hash=req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    })


    if(!link){
        res.status(411).json({
        message:"Sorry Incorrect Input"
        })
        return;
    }
    
    //userId
    const content=await ContentModel.find({
        userId:link.userId
    })

    console.log(link);


    const user = await UserModel.findOne({ 
        _id: link.userId
    })


    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })    
});


//npm install -d @types/express

app.listen(3000);