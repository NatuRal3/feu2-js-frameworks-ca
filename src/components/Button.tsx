import React from "react";
import Button from "react-bootstrap/Button";

type ButtonsProps = {
  variant: string;
  type: "button" | "submit" | "reset";
  text: string;
  onClick: () => void;
};

function Buttons(props: ButtonsProps) {
  return (
    <Button variant={props.variant} type={props.type} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export default Buttons;
