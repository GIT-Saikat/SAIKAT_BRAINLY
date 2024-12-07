import { ReactElement } from "react"

interface SideBarProps{
    text:string,
    icon:ReactElement;
}


export function SidebarItem({text,icon}:SideBarProps){

    return <div className="flex items-center text-gray-700 py-2  cursor-pointer hover:bg-gray-200 pl-4 rounded max-w-48 transition-all duration-150">

        {/* Add Hover and transition on all buttons and  cards (tweet,yt videos)  */}

        <div className="pr-2 ">
            {icon}
        </div>
        <div >
            {text}
        </div>
    </div>
}