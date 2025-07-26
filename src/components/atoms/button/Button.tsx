import React, { memo } from 'react';
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
};

function ButtonComponent({ variant = 'primary', className = '', ...props }: ButtonProps) {
    const variantClass = {
        primary: styles.primary,
        secondary: styles.secondary,
    }[variant];

    return <button className={`${styles.button} ${variantClass} ${className}`} {...props} />;
}

const Button = memo(ButtonComponent);
export default Button;
