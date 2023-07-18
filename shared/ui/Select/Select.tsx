"use client";
import React from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import ArrowDownIcon from "@/shared/assets/arrow-down.svg";

interface SelectProps<T> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
  label: string;
}

const Select = <T extends string>(props: SelectProps<T>) => {
  const { value, options, onChange, label } = props;
  return (
    <div className={"flexStart flex-col w-full gap-7 relative"}>
      <label className={"w-full text-gray-100"}>{label}</label>
      <Menu as={"div"} className={"self-start relative"}>
        <div>
          <Menu.Button className={"flexCenter custom_menu-btn"}>
            {value || "Select a category"}
            <Image
              src={ArrowDownIcon}
              width={10}
              height={5}
              alt={"arrow-down"}
            />
          </Menu.Button>
        </div>
        <Menu.Items className={"flexStart custom_menu-items"}>
          {options.map((option) => (
            <Menu.Item key={option}>
              <button
                className={"custom_menu-item"}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Select;
