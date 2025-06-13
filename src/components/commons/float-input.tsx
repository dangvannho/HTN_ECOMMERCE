import { useState, useEffect } from "react";

interface FloatingInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  defaultValue?: string; 
  disabled?: boolean
}

const FloatingInput = ({
  label,
  type = "text",
  placeholder,
  name,
  onChange,
  onBlur,
  ref,
  value,
  defaultValue, 
  disabled
}: FloatingInputProps) => {
  const [isFloating, setIsFloating] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || "");

  useEffect(() => {
    // Nếu có value prop (controlled input), sử dụng nó
    if (value !== undefined) {
      setIsFloating(!!value);
    } else {
      // Nếu không có value prop (uncontrolled input), sử dụng inputValue
      setIsFloating(!!inputValue);
    }
  }, [value, inputValue]);

  return (
    <div className="relative mt-1 w-full">
      <input 
        disabled = {disabled}
        type={type}
        name={name}
        value={value !== undefined ? value : inputValue}
        className={`w-full border-2 px-2 py-3 text-sm text-[#222] focus:outline-none focus:border-2 focus:border-[#222] peer`}
        placeholder={placeholder}
        onChange={(e) => {
          if (value === undefined) {
            setInputValue(e.target.value);
          }
          setIsFloating(!!e.target.value);
          onChange?.(e);
        }}
        onFocus={() => setIsFloating(true)}
        onBlur={(e) => {
          setIsFloating(!!e.target.value);
          onBlur?.(e);
        }}
        ref={ref}
      />
      <label
        className={`
          absolute 
          left-2 
          top-1/2 
          transform 
          -translate-y-1/2 
          text-sm 
          ${isFloating ? "text-[#222]" : "text-[#767676]"}
          transition-all 
          duration-200 
          ease-in-out  
          pointer-events-none
          px-1
          ${
            isFloating
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