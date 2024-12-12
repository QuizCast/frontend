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
    // <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
    //   <div className="mb-5">
    //     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //       Enter Your Name
    //     </label>
    //     <input
    //       type="text"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Enter your message"
    //       required
    //       value={name}
    //       onChange={(e) => setName(e.target.value)} // Update state on input change
    //     />
    //   </div>

    //   <div className="mb-5">
    //     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //       Enter the Quiz Key
    //     </label>
    //     <input
    //       type="text"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Enter your message"
    //       required
    //       value={quizKey}
    //       onChange={(e) => setQuizKey(e.target.value)} // Update state on input change
    //     />
    //   </div>

    //   <button
    //     type="submit" // Set button type to submit
    //     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //   >
    //     Submit
    //   </button>
    // </form>
    
    <div className="relative p-4 w-full max-w-md max-h-full">
      <a className="flex p-4" onClick={() => setRightComponent("Join")}>
        <label>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>

        </label>
      </a>
      {/* <!-- Modal content --> */}
      <div className="relative  rounded-lg border-2">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Join into a Session
          </h3>
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-4 md:p-5">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter Your Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
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
                placeholder="Enter the key"
                required
                value={quizKey}
                onChange={(e) => setQuizKey(e.target.value)} // Update state on input change
              />
            </div>
          </form>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join
          </button>
        </div>
      </div>
      </div>
  );
}

export default RoomKey;
