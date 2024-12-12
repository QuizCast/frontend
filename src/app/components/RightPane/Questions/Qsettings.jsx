"use client";

import React, { useState } from "react";

const Qsettings = ({ setRightComponent }) => {
  const [count, setCount] = useState(3);
  const [time, setTime] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const quizSettings = { count, time };
  const validateInputs = () => {
    if (count < 1 || count > 10) {
      setErrorMessage("Number of questions must be between 1 and 10.");
      return false;
    }
    if (time < 5 || time > 60) {
      setErrorMessage("Time per question must be between 5 and 60 seconds.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    // Pass props to EnteredQuiz
    setRightComponent("EnteredQuiz", quizSettings);
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative rounded-lg border-2">
        <form className="space-y-6" onSubmit={handleNext}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Customize the Quiz
          </h5>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Number of Questions
            </label>
            <input
              type="number"
              value={count}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              min="1"
              max="10"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Time Per Question (seconds)
            </label>
            <input
              type="number"
              value={time}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setTime(parseInt(e.target.value) || 0)}
              min="5"
              max="60"
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Qsettings;
