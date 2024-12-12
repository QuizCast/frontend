"use client";

import React, { useState } from "react";

const EnteredQuiz = ({ 
  count, 
  time, 
  setRightComponent, 
  setLeftComponent 
}) => {
  const [questions, setQuestions] = useState(
    Array.from({ length: count }, () => ({
      question: "",
      options: ["", "", "", ""],
      correct: 0,
    }))
  );

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, correctIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correct = correctIndex;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    // Send the quiz data to the server
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time, questions }),
      });

      if (response.ok) {
        alert("Quiz created successfully!");
        setRightComponent(null); // Reset to initial state
      } else {
        alert("Failed to create quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="relative p-4 w-full max-w-2xl">
      <a className="flex p-4">
        <label onClick={() => setRightComponent("Qsettings")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
        </label>
      </a>
      <div className="relative rounded-lg border-2 overflow-y-auto max-h-[35rem]"> {/* Make this container scrollable */}
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          Create Your Quiz
        </h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6">
            <div className="flex flex-wrap justify-center items-center">
            <label className="block text-sm font-medium mb-2">Question {qIndex + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter your question"
              required
            />
            </div>
            {q.options.map((option, optIndex) => (
              <div key={optIndex} className="mt-2 flex flex-wrap items-center justify-between">
                <label className="ml-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correct === optIndex}
                    onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                  />
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                  className=" p-1 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-[90%] p-2.5"
                  placeholder={`Option ${optIndex + 1}`}
                  required
                />
              </div>
            ))} <br />
          </div>
         
        ))}
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default EnteredQuiz;
