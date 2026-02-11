import Link from "next/link";
import { ButtonVariant } from "./button.type";

interface ButtonVariantsProps extends React.ComponentProps<"button"> {
  variant: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  link?: string;
}

export default function ButtonVariants({
  variant,
  className = "",
  children,
  link,
  ...props
}: ButtonVariantsProps) {
  const buttonVariants: Record<ButtonVariant, string> = {
    primary:
      "w-full group relative flex items-center justify-center gap-3 bg-[#f91fc3] text-white font-bold text-md py-5 px-10 rounded-full btn-glow overflow-hidden cursor-pointer",
    secondary:
      "w-full text-gray-400 hover:text-white font-medium text-md flex items-center justify-center gap-2 border border-white/10 hover:border-[#f91fc3]/50 rounded-full backdrop-blur-sm transition py-5 px-10 rounded-full cursor-pointer",
    tertiary:
      "text-xl text-white font-bold underline underline-offset-4 hover:opacity-80 transition",
  };

  const classes = `${buttonVariants[variant]} ${className}`;

  if (link) {
    return (
      <Link href={link} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
