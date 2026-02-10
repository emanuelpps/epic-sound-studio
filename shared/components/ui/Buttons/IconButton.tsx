import Button from "./Button";
import { ButtonProps } from "./button.types";


export default function IconButton(props: ButtonProps) {
  return (
    <Button
      size="sm"
      className="aspect-square rounded-xl p-3"
      {...props}
    />
  );
}
