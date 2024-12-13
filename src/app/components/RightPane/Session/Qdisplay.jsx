"use client";

import { useSelector } from "react-redux";
import { useState } from "react";

const Qdisplay = () => {
  const questions = useSelector((state) => state.participant.Questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const handleSubmitAnswer = () => {
    // Logic to handle answer submission
    setAnswerSubmitted(true);

    // Move to the next question after submission
    if (currentQuestionIndex < questions[0].length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswerSubmitted(false);
      }, 0); // Optional delay for better UX
    } else {
      // Handle end of questions logic
      alert("You've completed all the questions!");
    }
  };

  if (!questions.length) {
    return <p>No questions available.</p>;
  }

  const currentQuestion = questions[0][currentQuestionIndex];

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
       {currentQuestion.time}
      <div className="relative rounded-lg border-2">
        <div className="p-4 border-b-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Q. {currentQuestionIndex + 1}
          </label>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            {currentQuestion.question}
          </h5>
          <br/>
          <ul>
            {currentQuestion.answers.map((answer, idx) => (
              <li className="p-2" key={idx}>
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  className={`w-full text-white ${
                    answerSubmitted
                      ? "bg-gray-500"
                      : "bg-slate-950 hover:bg-blue-700"
                  } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                  disabled={answerSubmitted}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Qdisplay;
