import * as React from 'react';

interface IButton {
    onClick?: any;
    text: string;
    className?: string;
    type?: string;
}

const Button: React.FunctionComponent<IButton> = ({text, onClick, className = "", type = "submit"}) => {
  return (
      <button type={type} className={`${className} button`} onClick={onClick !== undefined ? onClick : () => console.log()}>{text}</button>
  )
};

export default Button;