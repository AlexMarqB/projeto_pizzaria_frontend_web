import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'> & {
    color: 'green' | 'red',
    loading?: boolean
}

export function Button({loading = false, color, ...props }: ButtonProps) {
    return (
        !loading ? 
        <button className={`text-white-100 text-center items-center justify-center ${color === "red" ? 'bg-red-100' : 'bg-green-100'} w-full h-10 md:h-[36px] lg:h-[40px] xl:h-[46px] text-sm md:text-[14px] lg:text-[16px] xl:text-[18px]`}  {...props}/>
        :
        <Loader2 className={`animate-spin w-6 h-6 ${color === "red" ? 'text-red-100' : 'text-green-100'}`} />
    )
}
