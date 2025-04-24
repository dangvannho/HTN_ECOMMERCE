import Reac, {useState} from 'react'
import { ChevronDown } from 'lucide-react'

interface ButtonFilterProps {
    title: string;
    onClick: () => void;
    openCats: boolean;
}
const ButtonFilter = ({title, onClick, openCats}: ButtonFilterProps) => {
    
  return (
    <button 
        className="flex items-center justify-between gap-2 w-full text-[#222] font-medium not-italic text-sm lg:text-lg uppercase mb-[23px]"
        onClick={onClick}
      >
        {title}
        <ChevronDown size={18} className={`ml-1 transition-transform ${openCats ? "rotate-180" : ""}`} />
      </button>
  )
}

export default ButtonFilter