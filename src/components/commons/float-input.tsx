import { useState } from "react";

interface FloatingInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput = ({
  label,
  type = "text",
  value = "",
  onChange,
}: FloatingInputProps) => {
  // State để kiểm soát trạng thái "nổi" của label
  const [isFloating, setIsFloating] = useState(!!value);

  return (
    <div className="relative mt-1 w-full">
      <input
        type={type}
        className="w-full border-2 border-gray-300 px-2 py-3 text-sm text-[#222] focus:outline-none focus:border-2 focus:border-[#222] peer"
        value={value}
        onChange={(e) => {
          onChange?.(e); // Cập nhật giá trị bằng props
          setIsFloating(!!e.target.value); // Cập nhật trạng thái "nổi"
        }}
        onFocus={() => setIsFloating(true)} // "Nổi" khi focus
        onBlur={() => setIsFloating(!!value)} // Giữ "nổi" nếu có giá trị
      />
      <label
        className={`
          absolute 
          left-2 
          top-1/2 
          transform 
          -translate-y-1/2 
          text-sm 
         ${isFloating || value ? "text-[#222]" : "text-[#767676]"}
          transition-all 
          duration-200 
          ease-in-out  
          pointer-events-none
          px-1
          ${
            isFloating || value
              ? "top-0 font-medium bg-white px-1 -translate-y-[calc(100%+14px)]"
              : ""
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
