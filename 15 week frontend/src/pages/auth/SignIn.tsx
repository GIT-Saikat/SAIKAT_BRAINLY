import { useRef } from "react";
import { Button } from "../../componenets/Button";
import { Input } from "../../componenets/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";


export function SignIn(){
    const usernameRef=useRef<HTMLInputElement>();
    const passwordRef=useRef<HTMLInputElement>();
    const navigate=useNavigate();

    async function signin(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        const response=await axios.post(BACKEND_URL+"/api/v1/signin",{
            
                username,
                password
            
        })
        const  jwt=response.data.token;
        localStorage.setItem("token",jwt);
        //now redirect user to the dashboard
        navigate("/dashboard")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username"/>
            <Input reference={passwordRef} placeholder="Password"/>

            <div className="flex justify-center pt-4">
                <Button  onClick={signin} loading={false} variant="Primary" text="SignIn" fullWidth={true}/>
            </div>
        </div>
    </div>
}