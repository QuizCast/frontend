"use client";

import React, { useState } from "react";
import API_CONFIG from "../API";

const Login = ({ setRightComponent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkCredentials = async (e) => {
    e.preventDefault();
    
    const END_POINT = process.env.NEXT_PUBLIC_BACKEND_URL + API_CONFIG.login;

    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setRightComponent("Questions");
      } else {
        const data = await response.json();
        setErrorMessage(data.detail || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <a className="flex p-4">
      <label  onClick={() => setRightComponent("Join")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>

        </label>
      </a>
      <a className="flex p-4">
      <label  onClick={() => setRightComponent("ReceiveMsg")}>
        recevie
        </label>
      </a>
      <a className="flex p-4">
      <label  onClick={() => setRightComponent("Qsettings")}>
       questions

        </label>
      </a>
      <div className="relative  rounded-lg border-2">
      <form className="space-y-6" onSubmit={checkCredentials}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
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
          <div className="text-sm text-red-600 dark:text-red-400">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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