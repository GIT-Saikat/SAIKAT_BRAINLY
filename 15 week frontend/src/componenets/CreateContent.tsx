//Can  be a Modal, Pop up  Box type or a pop up to a next page
//Here we are doing  a MODAL
//Add  onOutsideClick hook handler so that modalcloses when we click outside

import { useRef, useState } from "react";
import { CrossIcon } from "../icons/cross";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
  }

export function CreateContentModal({ open, onClose }: CreateContentModalProps){
    const titleRef=useRef<HTMLInputElement>();
    const linkRef=useRef<HTMLInputElement>();

    const[type,setType]=useState(ContentType.Youtube);

    async function addContent(){
        const title=titleRef.current?.value;
        const link=linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            title,
            type
        },{
            headers:{
            "Authorization":localStorage.getItem("token")
            }
        })

        onClose();

        

    }

    return <div>
        
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            </div>

            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white opacity-100 p-4 rounded  fixed">
                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                            {/* <div onClick={onClose}> */}
                                <CrossIcon />
                            {/* </div> */}
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"}></Input>
                            <Input  reference={linkRef} placeholder={"Link"}></Input>
                        </div>
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 pb-2 justify-center">
                                <Button text="Youtube" variant={type===ContentType.Youtube?"Primary":"Secondary"} onClick={()=>{
                                    setType(ContentType.Youtube)
                                }}></Button>

                                <Button text="Twitter" variant={type===ContentType.Twitter?"Primary":"Secondary"} onClick={()=>{
                                    setType(ContentType.Twitter)
                                }}></Button>    
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {/* here the  button have more space in left side becusde in button component there  was starticon...so fix this  */}
                            <Button onClick={addContent} variant="Primary" text="Submit"></Button>
                        </div>
                    </span>
                </div>
            </div>

            

        </div>}
    </div>
        
     
    
}

