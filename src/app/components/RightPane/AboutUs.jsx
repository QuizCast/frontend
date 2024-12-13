import React from "react";

const AboutUs = () => {
  return (
    <section className="about-us-section relative bg-white">
      <div className="content-container py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
        >
          <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
            New
          </span>
          <span className="text-sm font-medium">
            Introducing QuizCast: Real-Time Learning Redefined
          </span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
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
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Empowering Learning with Real-Time Engagement
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
          Welcome to QuizCast, a cutting-edge platform developed by Team Vertex
          for hosting real-time MCQ sessions. Whether you're an educator,
          trainer, or just someone who loves trivia, our platform provides an
          engaging way to create, share, and answer questions in real-time.
        </p>
        <div className="features-container mb-8 text-gray-600">
          <h2 className="text-2xl font-semibold mb-4">Platform Highlights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Effortless question creation and sharing with a unique key.</li>
            <li>
              Real-time leaderboard to track participants' performance and make
              learning fun.
            </li>
            <li>
              Intuitive interface for hosts and participants to easily engage.
            </li>
            <li>
              Perfect for educational sessions, corporate training, and casual
              quizzes.
            </li>
          </ul>
        </div>
        <form className="w-full max-w-md mx-auto">
          <label
            htmlFor="signup-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Email sign-up
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              id="signup-email"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email to stay updated"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  );
};

export default AboutUs;
