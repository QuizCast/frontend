import React from "react";

const AboutUs = () => {
  return (
    <section className="about-us-section relative bg-white">
  <div className="content-container py-4 px-4 max-w-screen-xl text-center z-10 relative">
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
    <h1 className="mb-4 text-4xl font-semibold">
      Empowering Learning with Real-Time Engagement
    </h1>
    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl lg:px-0 sm:px-16">
    QuizCast, a platform by Team Vertex for real-time MCQ sessions. Perfect for educators, trainers, and trivia lovers to create, share, and answer questions easily.
    </p>
    <div className="features-container mb-8 text-gray-600 text-left ml-32">
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
  </div>
  <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
</section>

  );
};

export default AboutUs;
