import { type FC, type ButtonHTMLAttributes } from 'react';

import styles from './ActionButton.module.css';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ActionButton: FC<ActionButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`${styles.button}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
