
import { cn } from "@/lib/utils";
interface ButtomProps {
    title: string;
    onClick?: () => void;
    className?: string
}

const ButtomCommon = ({ title, onClick, className = "" }: ButtomProps) => {
    return (
        <button
            className={cn("w-full bg-black text-white py-5 mt-5 text-sm font-medium hover:bg-gray-700 ", className)}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default ButtomCommon