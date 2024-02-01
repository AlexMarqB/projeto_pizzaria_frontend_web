import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<'button'> & {
    color?: 'green' | 'red' | 'ghost',
    loading?: boolean
}

export function Button({loading = false, color = 'ghost', ...props }: ButtonProps) {
    return (
        !loading ? 
        <button className={`transform transition hover:scale-105 ease-in-out text-center items-center justify-center ${color === "red" ? 'bg-red-100 text-white-100 w-full' : color === 'green' ? 'bg-green-100 text-blue-200 w-full' : 'text-white-200 text-[22px] md:text-[26px] lg:text-[25px] xl:text-[25px]'} h-10 md:h-[36px] lg:h-[40px] xl:h-[43px] text-sm md:text-[14px] lg:text-[16px] xl:text-[18px]`}  {...props}/>
        :
        <Loader2 className={`animate-spin w-6 h-6 ${color === "red" ? 'text-red-100' : 'text-green-100'}`} />
    )
}
