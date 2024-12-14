"use client";

import React, { useState } from "react";
import API_CONFIG from "../../API";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "@/store/Slices/roomSlice";

const EnteredQuiz = ({ count, time, setRightComponent, setLeftComponent }) => {
  const [questions, setQuestions] = useState(
    Array.from({ length: count }, () => ({
      question: "",
      answers: ["", "", "", ""],
      correct_answer: "", // Store the actual answer string
      errors: {
        question: "",
        answers: ["", "", "", ""],
        correct_answer: "",
      },
    }))
  );

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateQuestion = (index) => {
    const currentQuestion = questions[index];
    const errors = { question: "", answers: ["", "", "", ""], correct_answer: "" };

    if (!currentQuestion.question.trim()) {
      errors.question = "Question cannot be empty.";
    }

    currentQuestion.answers.forEach((answer, i) => {
      if (!answer.trim()) {
        errors.answers[i] = `Option ${i + 1} cannot be empty.`;
      }
    });

    if (!currentQuestion.correct_answer) {
      errors.correct_answer = "A correct answer must be selected.";
    }

    return errors;
  };

  const validateAll = () => {
    const updatedQuestions = questions.map((q, index) => {
      return {
        ...q,
        errors: validateQuestion(index),
      };
    });

    setQuestions(updatedQuestions);

    // Check if any question has validation errors
    return !updatedQuestions.some(
      (q) =>
        q.errors.question ||
        q.errors.answers.some((error) => error) ||
        q.errors.correct_answer
    );
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[optIndex] = value;

    // Update the correct answer if it matches the changed option
    if (updatedQuestions[qIndex].correct_answer === updatedQuestions[qIndex].answers[optIndex]) {
      updatedQuestions[qIndex].correct_answer = value;
    }

    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correct_answer =
      updatedQuestions[qIndex].answers[optIndex];
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    if (!validateAll()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true); // Set submitting state to true
    const END_POINT = process.env.NEXT_PUBLIC_BACKEND_URL + API_CONFIG.addQuiz;

    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          user_id: user["user_id"],
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
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
              <label className="block text-sm font-medium mb-2">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter your question"
                required
              />
              {q.errors.question && (
                <span className="text-red-500 text-sm">{q.errors.question}</span>
              )}
            </div>
            {q.answers.map((option, optIndex) => (
              <div
                key={optIndex}
                className="mt-2 flex flex-wrap items-center justify-between"
              >
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
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-[90%] p-2.5"
                  placeholder={`Option ${optIndex + 1}`}
                  required
                />
                {q.errors.answers[optIndex] && (
                  <span className="text-red-500 text-sm">
                    {q.errors.answers[optIndex]}
                  </span>
                )}
              </div>
            ))}
            {q.errors.correct_answer && (
              <span className="text-red-500 text-sm">{q.errors.correct_answer}</span>
            )}
            <br />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button 
            className="flex p-2 bg-white border-slate-700 text-slate-700 rounded-lg"
            onClick={() => setRightComponent("Qsettings")}
          >
            <label className="cursor-pointer flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5"
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
            disabled={isSubmitting}
            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${
              isSubmitting
                ? "bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 inline-flex items-center"
                : "bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Quiz"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnteredQuiz;
