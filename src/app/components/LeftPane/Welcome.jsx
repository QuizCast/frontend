import React from "react";

const Welcome = ({ setRightComponent, setLeftComponent }) => {
  return (
    <div className="bg-glass-1 w-full p-4 md:p-6 lg:p-8 rounded-lg">
      <div className="flex flex-col items-center text-center">
        {/* Logo and Title */}
        <a
          href="#"
          className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-3 rtl:space-x-reverse"
        >
          <img
            src="logo2.png"
            className="h-16 md:h-20 lg:h-24"
            alt="Quiz Logo"
          />
          <span className="text-2xl md:text-3xl lg:text-4xl font-semibold whitespace-nowrap dark:text-white">
          QuizCast
          </span>
        </a>
      </div>

      {/* Description */}
      <div className="mt-8 text-center">
        <p className="text-md md:text-lg lg:text-xl font-normal text-gray-900 dark:text-gray-400 mb-6">
          "QuizCast" is an innovative platform for scheduling online quiz competitions, offering real-time interaction and a seamless, engaging experience.
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center py-2.5 px-5 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Read more
            <svg
              className="w-3.5 h-3.5 ml-2 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
