import { type FC, type ReactNode } from 'react';
import './Page_my.css';

interface PageMyProps {
  children: ReactNode;
}

export const Page_my: FC<PageMyProps> = ({ children }) => {
  return <div className="page-my">{children}</div>;
};
