import { type FC, type ReactNode } from 'react';
import './SectionPage.css';

interface SectionPageProps {
  children: ReactNode;
}

export const SectionPage: FC<SectionPageProps> = ({ children }) => {
  return <div className="section-page">{children}</div>;
};
