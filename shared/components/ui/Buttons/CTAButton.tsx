import Button from "./Button";
import { ButtonProps } from "./button.types";


export default function CTAButton(props: ButtonProps) {
  return (
    <Button
      variant="primary"
      className="uppercase tracking-wide"
      {...props}
    />
  );
}
