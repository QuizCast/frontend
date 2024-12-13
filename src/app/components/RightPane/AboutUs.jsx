import React from "react";

const AboutUs = () => {
  return (
    <section className="about-us-section relative bg-white sm:p-8 lg:p-12 dark:bg-gray-800">
      <div className="content-container py-8 px-4 max-w-screen-xl mx-auto text-center z-10 relative">
        {/* New Badge and Announcement */}
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-6 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
        >
          <span className="text-xs sm:text-sm bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
            New
          </span>
          <span className="text-sm font-medium">
            Introducing QuizCast: Real-Time Learning Redefined
          </span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>

        {/* Heading */}
        <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
          Empowering Learning with Real-Time Engagement
        </h1>

        {/* Description */}
        <p className="mb-8 text-base sm:text-lg lg:text-xl font-normal text-gray-500 dark:text-gray-300 lg:px-0 sm:px-8">
          QuizCast, a platform by Team Vertex for real-time MCQ sessions. Perfect for educators, trainers, and trivia lovers to create, share, and answer questions easily.
        </p>

        {/* Platform Highlights */}
        <div className="features-container mb-12 text-gray-600 dark:text-gray-400 text-left px-4 sm:px-12 lg:px-32">

        </div>
      </div>

      {/* Background Gradient */}
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  );
};

export default AboutUs;
