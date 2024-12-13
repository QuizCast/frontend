import React from 'react';

const Welcome = ({ setRightComponent, setLeftComponent }) => {
    return (
        <div className="bg-glass-1 w-full p-4 rounded-lg md:p-8">
            <div className="w-full p-4">
            <a
<<<<<<< HEAD
          href="#"
          className="flex items-center space-x-6 rtl:space-x-reverse"
=======
          className="flex items-center space-x-3 rtl:space-x-reverse"
>>>>>>> f05e96c6de833b03cbaddc4adbdccacbe2108615
        >
          <img
            src="logo.png"
            className="h-36"
            alt="Flowbite Logo"
          />
<<<<<<< HEAD
=======
          <span className="hidden sm:block max-w-screen-xl self-center text-6xl font-semibold whitespace-nowrap">
            Quiz
            </span>
>>>>>>> f05e96c6de833b03cbaddc4adbdccacbe2108615
        </a>
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-6 mt-4">Welcome!</h1>
            <p className="text-lg font-normal text-gray-900 dark:text-gray-400 mb-6">"Quiz" is an innovative platform for scheduling online quiz competitions, offering real-time interaction and a seamless, engaging experience.</p>
            <a 
            className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 cursor-pointer"
            onClick={() => setRightComponent("AboutUs")}
            >
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
