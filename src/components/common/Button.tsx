import React from "react";

type ButtonProps = {
  btnTitle: string;
  handleClick: () => void;
  btnType?: "button" | "submit";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  btnType,
  btnTitle,
  className,
  handleClick,
}) => {
  return (
    <button
      type={btnType || "button"}
      className={`w-full py-2 rounded-md text-sm bg-indigo-300/50 font-semibold ${className}`}
      onClick={handleClick}
    >
      {btnTitle}
    </button>
  );
};

export default Button;
