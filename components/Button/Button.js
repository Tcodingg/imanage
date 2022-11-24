import React from 'react';

const Button = ({ label, background, width }) => {
  const buttonClass = `border p-3 text-center flex justify-center items-center
            gap-4 ${background} ${width}`;
  return <button className={buttonClass}>{label}</button>;
};

export default Button;
