import { ButtonVariant } from "./button.type";
import ButtonVariants from "./ButtonVariants";




interface ButtonFactoryProps extends React.ComponentProps<"button"> {
  variant: ButtonVariant;
  link?: string;
}

export default function ButtonFactory({
  variant,
  ...props
}: ButtonFactoryProps) {
  return <ButtonVariants variant={variant} {...props} />;
}
