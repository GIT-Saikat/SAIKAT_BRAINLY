export function Input({placeholder,reference}: {placeholder:string;reference?:any})
// similar to inputProps interface 
{

    return <div>
        <input  ref={reference}  placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-2" ></input>
    </div>
}