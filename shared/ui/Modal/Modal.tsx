"use client";
import React, { ReactNode, useRef } from "react";
import Image from "next/image";
import CloseIcon from "@/shared/assets/close.svg";
import { useRouter } from "next/navigation";

export const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = () => {
    router.push("/");
  };
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === overlay.current) {
      onDismiss();
    }
  };
  return (
    <div ref={overlay} onClick={handleClick} className={"modal"}>
      <button onClick={onDismiss} className={"absolute top-4 right-8"}>
        <Image width={17} height={17} src={CloseIcon} alt={"close"} />
      </button>
      <div ref={wrapper} className={"modal_wrapper"}>
        {children}
      </div>
    </div>
  );
};
