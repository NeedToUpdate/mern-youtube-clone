import React from "react";
import UploadForm from "../forms/UploadForm";

export default function Upload() {
  return (
    <div className="flex gap-5 justify-start pt-20 items-center flex-col h-full">
      <div className="flex flex-col gap-4 shadow-md p-10 rounded-md">
        <h3 className="font-bold text-xl text-emerald-500 mb-10">Upload a Video!</h3>
        <UploadForm></UploadForm>
      </div>
    </div>
  );
}
