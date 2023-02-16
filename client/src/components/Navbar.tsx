import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { user } = useUserContext();
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    setAuthorized(user !== null);
  }, [user]);
  return (
    <div className="flex gap-5 w-full p-2 items-center bg-emerald-100 shadow-md">
      <Link to="/" className="flex justify-center items-center gap-2">
        <img src="/folder.png" className="App-logo" alt="logo" width={50} height={50} />
        <p className="text-3xl bold">
          Watch<span className="bg-emerald-700 p-2 ml-2 rounded-md text-white">Tube</span>
        </p>
      </Link>
      <SearchBar
        onSubmit={(query: string) => {
          //best practices this would be sanitized and made sure its a proper string
          navigate("/search/" + query);
        }}
      ></SearchBar>
      <div className="spacer flex-1"></div>
      {authorized ? (
        <div className="flex gap-10 justify-center items-center p-5">
          <p>Hi, {user?.username}</p>
          <Link className="font-bold text-lg hover:text-emerald-900 duration-200" to="/upload">
            Upload Video
          </Link>
        </div>
      ) : (
        <div className="flex gap-10 justify-center items-center p-5">
          <Link className="font-bold text-lg hover:text-emerald-900 duration-200" to="/login">
            Login
          </Link>
          <Link className="font-bold text-lg hover:text-emerald-900 duration-200" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
