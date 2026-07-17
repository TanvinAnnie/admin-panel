import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg bg-[#B64627] px-6 py-3 font-medium text-white transition-all hover:bg-[#98391F]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}