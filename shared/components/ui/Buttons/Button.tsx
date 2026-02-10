import Link from "next/link";
import { ButtonProps } from "./button.types";
import { baseStyles, variantStyles, sizeStyles } from "./button.styles";

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;

  const classes = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  if (props.isLink) {
    const { href, ...linkProps } = props;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { isLink, ...buttonProps } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
