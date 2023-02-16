import React from "react";

interface props {
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
}

export function Button({ onClick = () => {}, children, className, disabled }: props) {
  const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick();
  };

  return (
    <button disabled={disabled} type="button" className={` disabled:bg-gray-400 disabled:pointer-events-none p-2 rounded-md shadow-sm hover:translate-y-[-1px] ${className}`} onClick={onClickHandler}>
      {children}
    </button>
  );
}
