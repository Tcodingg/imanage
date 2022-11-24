import React from 'react';

const Button = ({ label, background, width, textColor }) => {
  const buttonClass = `border p-3 text-center  items-center capitalize gap-4 rounded-sm ${background} ${width} ${textColor}`;
  return <button className={buttonClass}>{label}</button>;
};

export default Button;
