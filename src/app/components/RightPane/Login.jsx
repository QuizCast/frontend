"use client";

import React, { useState, useEffect } from "react";
import API_CONFIG from "../API";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/Slices/userSlice";

const Login = ({ setRightComponent, setLeftComponent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      setRightComponent("Qsettings");
    }
  }, [user, setRightComponent]);

  const checkCredentials = async (e) => {
    e.preventDefault();
    const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_CONFIG.login}`;

    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(setUser(responseData));
        setLeftComponent("Welcome");
        setRightComponent("Qsettings");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative rounded-lg border-2">
        <form className="space-y-6" onSubmit={checkCredentials}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
              onClick={() => setRightComponent("SignUp")}
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
