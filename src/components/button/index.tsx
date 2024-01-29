import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'> & {
    color: 'green' | 'red'
}

export function Button({ color, ...props }: ButtonProps) {
    return (<button className={`text-white-100 text-center items-center justify-center ${color === "red" ? 'bg-red-100' : 'bg-green-100'} w-full h-10 md:h-[36px] lg:h-[40px] xl:h-[46px] text-sm md:text-[14px] lg:text-[16px] xl:text-[18px]`}  {...props}/>)
}
