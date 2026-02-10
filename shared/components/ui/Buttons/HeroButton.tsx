import Button from "./Button";
import { ButtonProps } from "./button.types";


export default function HeroButton(props: ButtonProps) {
  return (
    <Button
      size="lg"
      variant="primary"
      className="shadow-[0_0_40px_rgba(249,31,195,0.5)]"
      {...props}
    />
  );
}
