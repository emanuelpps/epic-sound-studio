import Button from "./Button";
import { ButtonProps } from "./button.types";


export default function GhostButton(props: ButtonProps) {
  return (
    <Button
      variant="secondary"
      className="bg-transparent"
      {...props}
    />
  );
}
