import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface props {
  onSubmit: Function;
}

export default function SearchBar(props: props) {
  const [query, setQuery] = useState("");
  return (
    <div className="group w-full h-10 max-w-[500px]  bg-white rounded-md flex items-center">
      <MagnifyingGlassIcon className="w-6 h-6 m-2 group-hover:text-emerald-500 duration-200"></MagnifyingGlassIcon>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          props.onSubmit(query);
        }}
      >
        <input
          className="w-full"
          type="text"
          value={query}
          onChange={(ev) => {
            setQuery(ev.target.value);
          }}
        />
      </form>
    </div>
  );
}
