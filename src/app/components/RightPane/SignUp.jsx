"use client";

import React, { useState } from "react";
import API_CONFIG from "../API";

const SignUp = ({ setRightComponent, setLeftComponent }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const checkCredentials = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous errors

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_CONFIG.signup}`;

    setIsLoading(true); // Show spinner
    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setRightComponent("Login");
      } else {
        setErrorMessage(responseData.detail || "User already exists");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative rounded-lg border-2">
        <form className="space-y-6" onSubmit={checkCredentials}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h5>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
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
              placeholder="minimum 6 characters"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm your password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="minimum 6 characters"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="flex justify-center w-full text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-blue-500 border-solid"></div>
            ) : (
              "Create an Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
