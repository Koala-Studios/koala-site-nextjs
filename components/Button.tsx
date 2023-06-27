import React from "react";

interface Props {
  children: React.ReactNode;
  type: "primary" | "secondary" | "primary light" | "secondary light";
  classes?: string;
  onClick?: any;
  style?: React.CSSProperties;
}

const Button: React.FC<Props> = ({
  style,
  children,
  type,
  classes,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn--${type} ${classes}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
