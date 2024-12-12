import React from "react";

const Join = ({ setRightComponent, setLeftComponent }) => {
  return (
    <>
      <div className="w-full max-w-sm p-4   ">
        <div className="flex items-center justify-center">
          <img
            src="logo.png"
            alt="Centered Image"
            className="w-40 rounded-sm"
          />
        </div>
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          Choose your role...
        </h3>
        <ul className="grid w-full gap-2 md:grid-cols-1">
          <a onClick={() => setRightComponent("Login")}>
            <li className="border-1">
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                className="hidden peer"
                required
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:hover:text-blue-500 hover:border-blue-600 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-800"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">Host</div>
                  <div className="w-full">For create a session.</div>
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
              </label>
            </li>
          </a>
          <br></br>
          <a onClick={() => setRightComponent("RoomKey")}>
            <li className="border-1">
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="hosting-big"
                className="hidden peer"
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:hover:text-blue-500 hover:border-blue-600 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-800"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    Participant
                  </div>
                  <div className="w-full">For join with a session.</div>
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
              </label>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
};

export default Join;
