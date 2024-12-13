import React from 'react';

const Welcome = ({ setRightComponent, setLeftComponent }) => {
    return (
        <div className="bg-glass-1 w-full p-4 rounded-lg md:p-8 dark:bg-gray-800">
            <div className="w-full p-4">
            <a
          href="#"
          className="flex items-center space-x-6 rtl:space-x-reverse"
        >
          <img
            src="logo.png"
            className="h-36"
            alt="Flowbite Logo"
          />
        </a>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-6 mt-4">Welcome!</h1>
            <p className="text-lg font-normal text-gray-900 dark:text-gray-400 mb-6">"Quiz" is an innovative platform for scheduling online quiz competitions, offering real-time interaction and a seamless, engaging experience.</p>
            <a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Read more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            </div>
        </div>

    );
}

export default Welcome;
