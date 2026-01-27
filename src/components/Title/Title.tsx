import type { FC } from 'react';
import './Title.css';

interface TitleProps {
  text: string;
}

export const Title: FC<TitleProps> = ({ text }) => {
  return <div className="title">{text}</div>;
};
