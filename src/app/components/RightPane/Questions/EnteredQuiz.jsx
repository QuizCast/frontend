"use client";

import React, { useState } from "react";
import API_CONFIG from "../../API";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "@/store/Slices/roomSlice";

const EnteredQuiz = ({ 
  count, 
  time, 
  setRightComponent, 
  setLeftComponent 
}) => {
  const [questions, setQuestions] = useState(
    Array.from({ length: count }, () => ({
      question: "",
      answers: ["", "", "", ""],
      correct_answer: "", // Store the actual answer string
    }))
  );

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[optIndex] = value;

    // Update the correct answer if the selected option changes
    if (updatedQuestions[qIndex].correct_answer === updatedQuestions[qIndex].answers[optIndex]) {
      updatedQuestions[qIndex].correct_answer = value;
    }

    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correct_answer = updatedQuestions[qIndex].answers[optIndex];
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    const END_POINT = process.env.NEXT_PUBLIC_BACKEND_URL + API_CONFIG.addQuiz;
    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          user_id: user['user_id'],
          time: time, 
          questions: questions,
        }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        dispatch(setRoom(responseData["room_key"]));
        setRightComponent("BroadCast"); 
        setLeftComponent("LeaderBoard");
      } else {
        alert("Failed to create quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="relative p-4 w-full max-w-2xl">
      <div className="relative rounded-lg border-2 overflow-y-auto max-h-[35rem]">
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
            {q.answers.map((option, optIndex) => (
              <div key={optIndex} className="mt-2 flex flex-wrap items-center justify-between">
                <label className="ml-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correct_answer === option}
                    onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                  />
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                  className="p-1 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-[90%] p-2.5"
                  placeholder={`Option ${optIndex + 1}`}
                  required
                />
              </div>
            ))}
            <br />
          </div>
        ))}
        <div className="flex justify-between items-center">
        <button 
            className=" flex p-2  bg-white border-slate-700 text-slate-700  rounded-lg " 
            onClick={() => setRightComponent("Qsettings")}
          >
            <label className="cursor-pointer flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              <span>Back</span>
            </label>
        </button>
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit Quiz
        </button>
        </div>
      </div>
    </div>
  );
};

export default EnteredQuiz;
