import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../constants/API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/admin/login`,
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem(
          "token",
          res.data.token
        );

        toast.success(res.data.message);

        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error:any) {
      toast.error(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-300 rounded gap-1 pl-2">
          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full outline-none bg-transparent py-3 px-2"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-300 rounded gap-1 pl-2">
          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full outline-none bg-transparent py-3 px-2"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full cursor-pointer mb-3 bg-indigo-500 hover:bg-indigo-600 transition py-3 rounded text-white font-medium"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;