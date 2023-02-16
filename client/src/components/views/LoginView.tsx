import React from "react";
import LoginForm from "../forms/LoginForm";

export default function Register() {
  return (
    <div className="flex gap-5 justify-start pt-20 items-center flex-col h-full">
      <div className="flex flex-col gap-4 shadow-md p-10 rounded-md">
        <h3 className="font-bold text-xl text-emerald-500 mb-10">Log In Now!</h3>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
