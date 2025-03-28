import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogelIcon from "../assets/google-icon.png";
function Login() {
  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center  items-center">
      <div className=" border border-gray-500 rounded-md flex flex-col p-10 gap-y-5">
        <h2 className="text-2xl">Letter Writer App</h2>
        <button
          onClick={() => loginWithGoogle(navigate)}
          className="flex gap-x-2"
        >
          Sign In with Google
          <img src={GoogelIcon} className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export default Login;
