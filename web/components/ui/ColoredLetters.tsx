import React, { FC } from "react";

interface ColoredLettersProps {
  letters: string[];
  tailwindClasses: string[];
}

const ColoredLetters: FC<
  ColoredLettersProps & React.HTMLProps<HTMLDivElement>
> = ({ letters, tailwindClasses, className, ...htmlElements }) => {
  return (
    <div className={`${className}`} {...htmlElements}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`group group-hover:${tailwindClasses[index]} transition-colors duration-300`}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default ColoredLetters;
