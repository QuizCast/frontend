"use client";

import React from "react";

const Join = ({ setRightComponent, setLeftComponent }) => {
  return (
    <>
      <div className="w-full max-w-sm p-4 bg-emerald-50 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          Choose your role...
        </h3>
        <ul className="grid w-full gap-2 md:grid-cols-1">
          <li>
            <button
              onClick={() => setRightComponent("Login")}
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:hover:text-blue-500 hover:border-blue-600 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-800"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">
                  <p>Host</p>
                </div>
                <div className="w-full">
                  <p>For create a session.</p>
                </div>
              </div>
              <svg
                className="w-5 h-5 ms-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </li>
          <br />
          <li>
            <button
              onClick={() => setRightComponent("RoomKey")}
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:hover:text-blue-500 hover:border-blue-600 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-800"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">
                  <p>Participant</p>
                </div>
                <div className="w-full">
                  <p>For join with a session.</p>
                </div>
              </div>
              <svg
                className="w-5 h-5 ms-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Join;
