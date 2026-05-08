import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="text-black block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full py-3 px-4 md:py-4 md:px-6 bg-[#F6F6F8] text-[#2A2A34] text-base md:text-xl rounded-4xl placeholder:text-[#726D6D] outline-none focus:outline-none
        ${className || ""}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1 ml-2">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";
