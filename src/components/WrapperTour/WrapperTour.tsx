import type { FC, PropsWithChildren } from 'react';
import './WrapperTour.css';

export const WrapperTour: FC<PropsWithChildren> = ({ children }) => {
  return <div className="wrapper-tour">{children}</div>;
};
