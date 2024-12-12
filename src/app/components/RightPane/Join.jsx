import React from "react";

const Join = ({ setRightComponent, setLeftComponent }) => {
  return (
    
    // <div className="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
    //   <a
    //     className="inline-flex items-center px-3 py-2 m-3 text-sm cursor-pointer font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    //     onClick={() => setRightComponent("Login")}
    //   >
    //     Host
    //     <svg
    //       className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 14 10"
    //     >
    //       <path
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M1 5h12m0 0L9 1m4 4L9 9"
    //       />
    //     </svg>
    //   </a>
    //   <a
    //     className="inline-flex items-center px-3 py-2 m-3 text-sm cursor-pointer font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    //     onClick={() => setRightComponent("RoomKey")}
    //   >
    //     Participant
    //     <svg
    //       className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 14 10"
    //     >
    //       <path
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M1 5h12m0 0L9 1m4 4L9 9"
    //       />
    //     </svg>
    //   </a>
    // </div>
    
<>

<div className="w-full max-w-sm p-4 bg-emerald-50 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
<div className="flex items-center justify-center">
  <img
    src="logo.png"
    alt="Centered Image"
    className="w-40 rounded-sm"
  />
</div>
<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose your role...</h3>
  <ul className="grid w-full gap-2 md:grid-cols-1">
   <a onClick={() => setRightComponent("Login")}>
    <li>
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
    <li>
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
          <div className="w-full text-lg font-semibold">Participant</div>
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
