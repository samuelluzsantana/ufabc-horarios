import React from "react";
import { Button as NextUIButton } from "@nextui-org/button";
import { ButtonProps } from "@nextui-org/react";

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <>
      <NextUIButton
        {...rest}
        className="text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]"
      >
        {children}
      </NextUIButton>
    </>
  );
};

export default Button;
