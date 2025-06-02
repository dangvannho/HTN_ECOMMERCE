import { useState } from "react";

interface FloatingInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const FloatingInput = ({
  label,
  type = "text",
  placeholder,
  name,
  onChange,
  onBlur,
  ref,
}: FloatingInputProps) => {
  const [isFloating, setIsFloating] = useState(false);
  const [value, setValue] = useState(""); // Quản lý giá trị nội bộ để điều khiển label

  return (
    <div className="relative mt-1 w-full">
      <input
        type={type}
        name={name}
        className={`w-full border-2 px-2 py-3 text-sm text-[#222] focus:outline-none focus:border-2 focus:border-[#222] peer`}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value); // Cập nhật giá trị nội bộ
          setIsFloating(!!e.target.value); // Cập nhật trạng thái "nổi"
          onChange?.(e); // Gọi onChange của react-hook-form
        }}
        onFocus={() => setIsFloating(true)} // "Nổi" khi focus
        onBlur={(e) => {
          setIsFloating(!!e.target.value); // Giữ "nổi" nếu có giá trị
          onBlur?.(e); // Gọi onBlur của react-hook-form
        }}
        ref={ref} // Truyền ref từ react-hook-form
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
