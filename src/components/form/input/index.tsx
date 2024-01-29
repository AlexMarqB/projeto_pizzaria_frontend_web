import { ComponentProps } from "react";

type InputProps = ComponentProps<'input'>

export function Input(props: InputProps) {
    return (<input className="border-gray-100 border rounded-sm text-white-100 w-full p-3 bg-blue-200 h-10 md:h-[36px] lg:h-[40px] xl:h-[46px] text-sm md:text-[14px] lg:text-[16px] xl:text-[18px]"  {...props}/>)
}