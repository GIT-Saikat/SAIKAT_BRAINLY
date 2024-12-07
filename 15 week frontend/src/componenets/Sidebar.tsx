import { BrainIcon } from "../icons/brain";
import { TwitterIcon } from "../icons/twitter";
import { YoutubeIcon } from "../icons/youtube";
import { SidebarItem } from "./SidebarItem";

export function SideBar(){
    return <div  className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 ">
        <div className="flex items-center text-2xl pt-8">
            <div className="pr-2 text-purple-800 ">
                <BrainIcon />
            </div>
            
            Brainly Saikat
            
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />}/>
            
            <SidebarItem text="Youtube" icon={<YoutubeIcon />}/>
        </div>

    </div>
}