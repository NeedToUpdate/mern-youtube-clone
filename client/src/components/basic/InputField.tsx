import React from "react";
import { ChangeEventHandler } from "react";

export interface inputProps {
  value: string | undefined;
  errors: string[];
  placeholder?: string;
  label: string;
  type: string;
  required: boolean;
  invalid?: boolean;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}
export function InputField(props: inputProps) {
  const { label, invalid, onChange, className, errors, ...inputProps } = props;
  return (
    <div className={"relative z-0 w-full " + (className || "")}>
      <input
        className={
          "duration-300 block mb-1 py-1.5 pt-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none  focus:outline-none focus:ring-0 peer " +
          (errors.length || invalid ? "text-red-900 dark:text-red-400 border-red-300 focus:border-red-600" : "text-primary-900 dark:text-primary-100 border-primary-400 focus:border-primary-600")
        }
        {...inputProps}
        onChange={onChange}
      />
      <label
        htmlFor={inputProps.name}
        className={
          "duration-300 peer-focus:font-medium absolute text-sm transform -translate-y-[1rem] scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0  peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[1rem] " +
          (errors.length || invalid ? "text-red-500 dark:text-red-300 peer-focus:text-red-600 dark:peer-focus:text-red-400" : "text-primary-700 peer-focus:text-primary-800")
        }
      >
        {label}
      </label>
      {errors ? (
        errors.map((err, i) => {
          return (
            <p key={i} className="text-red-500 dark:text-red-400 text-sm font-thin mt-1 before:content-['•'] before:mr-1">
              {err.trim() === "" ? "Something went wrong. Please try again later." : err}
            </p>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
