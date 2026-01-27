import type { FC, CSSProperties } from 'react';
import './Text.css';

interface TextProps {
  text?: string;
  hometext?: string;
  padding?: CSSProperties['padding'];
  isClickable?: boolean;
  onClick?: () => void;
}

export const Text: FC<TextProps> = ({ text, hometext, padding, isClickable, onClick }) => {
  return (
    <div
      className={`text ${isClickable ? 'text--clickable' : ''}`}
      style={padding ? { padding } : undefined}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="text__text">{text}</div>
      <div className="text__hometext">{hometext}</div>
    </div>
  );
};
