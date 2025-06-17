
import { cn } from "@/lib/utils";
interface ButtomProps {
    title: string;
    onClick?: () => void;
    className?: string 
    disabled?: boolean
}

const ButtomCommon = ({ title, onClick, className = "", disabled }: ButtomProps) => {
    return (
        <button
            className={cn("w-full bg-black text-white py-5 mt-5 text-sm font-medium hover:bg-gray-700 ", className, disabled && "cursor-not-allowed opacity-50 hover:bg-black")}
            onClick={onClick}
           
        >
            {title}
        </button>
    )
}

export default ButtomCommon