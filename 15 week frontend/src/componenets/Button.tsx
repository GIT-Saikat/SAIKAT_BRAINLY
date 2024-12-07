import { ReactElement } from "react";


interface  ButtonProps{
    variant : "Primary"|"Secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?:()=>void;
    fullWidth?:boolean;
    loading?:boolean;
}

const VariantClasses={
    "Primary":"bg-purple-600 text-white",
    "Secondary":"bg-purple-200 text-purple-600",
}

const defaultStyles="px-4 py-2 rounded-md font-light flex items-center";

export function Button( {variant,text,startIcon,onClick,fullWidth,loading}: ButtonProps){


    return  <button onClick={onClick} className={VariantClasses[variant]+" "+defaultStyles+`${fullWidth?" w-full  flex justify-center items-center":""} ${loading?"opacity-45":""}`} disabled={loading}>
        <div className="pr-2">
        {startIcon}
        </div>
        
        {text}
        

    </button>
}