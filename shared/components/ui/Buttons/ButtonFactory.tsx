import ButtonVariants from "./ButtonVariants";


type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonFactoryProps extends React.ComponentProps<"button"> {
  variant: ButtonVariant;
}

export default function ButtonFactory({
  variant,
  ...props
}: ButtonFactoryProps) {
  return <ButtonVariants variant={variant} {...props} />;
}
