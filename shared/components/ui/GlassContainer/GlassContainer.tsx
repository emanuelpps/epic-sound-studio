import { ComponentProps } from "react";

type GlassContainerProps = ComponentProps<"div">;

export default function GlassContainer({
  children,
  className = "",
  ...props
}: GlassContainerProps) {
  const classes = `
    flex flex-col items-center text-center
    glass-panel rounded-3xl
    ${className}
  `;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
