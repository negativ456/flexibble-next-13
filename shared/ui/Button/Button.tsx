"use client";
import { ButtonHTMLAttributes, MouseEventHandler, useMemo } from "react";
import Image from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
}
export const Button = (props: ButtonProps) => {
  const {
    textColor,
    bgColor,
    disabled,
    onClick,
    leftIcon,
    rightIcon,
    title,
    type,
    ...otherProps
  } = props;
  const bgClass = useMemo(() => {
    return disabled ? "bg-black/50" : bgColor || "bg-primary-purple";
  }, [bgColor, disabled]);
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm max-md:w-full ${bgClass} ${
        textColor || "text-white"
      }`}
    >
      {leftIcon && <Image src={leftIcon} alt={"left"} width={14} height={14} />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} alt={"left"} width={14} height={14} />
      )}
    </button>
  );
};
