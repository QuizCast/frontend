"use client";

import React from "react";
import { useState } from "react";

function RoomKey({ setRightComponent, setLeftComponent }) {
  const [name, setName] = useState(""); // State to store the message
  const [quizKey, setQuizKey] = useState(""); // State to store the message

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, quizKey);
    setRightComponent("ReceiveMsg");
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter Your Name
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your message"
          required
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state on input change
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter the Quiz Key
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your message"
          required
          value={quizKey}
          onChange={(e) => setQuizKey(e.target.value)} // Update state on input change
        />
      </div>

      <button
        type="submit" // Set button type to submit
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default RoomKey;