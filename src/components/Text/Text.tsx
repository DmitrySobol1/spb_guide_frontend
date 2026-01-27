import type { FC, CSSProperties } from 'react';
import './Text.css';

interface TextProps {
  text?: string;
  hometext?: string;
  padding?: CSSProperties['padding'];
}

export const Text: FC<TextProps> = ({ text, hometext, padding }) => {
  return (
    <div className="text" style={padding ? { padding } : undefined}>
      <div className="text__text">{text}</div>
      <div className="text__hometext">{hometext}</div>
    </div>
  );
};
