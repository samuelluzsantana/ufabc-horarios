import React from 'react';
import { Button as NextUIButton } from '@nextui-org/button';
import { ButtonProps } from '@nextui-org/react';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <>
            <NextUIButton {...rest}>
                {children}
            </NextUIButton>
        </>
    );
};

export default Button;
