import React from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

export type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLink?: false;
  };

export type ButtonAsLink = BaseProps & {
  isLink: true;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;
