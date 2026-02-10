import { ButtonVariant, ButtonSize } from "./button.types";

export const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#f91fc3] text-white font-bold btn-glow hover:scale-[1.02] active:scale-[0.98]",

  secondary:
    "text-gray-300 border border-white/15 hover:border-[#f91fc3]/50 backdrop-blur-sm hover:text-white",

  tertiary: "text-white underline underline-offset-4 hover:opacity-80",
};

export const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-md",
  lg: "px-10 py-5 text-lg",
};

export const baseStyles =
  "inline-flex items-center justify-center gap-3 rounded-full transition-all duration-300 cursor-pointer";
