"use client";

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setParticipant, setQuestions } from "@/store/Slices/participantSlice";
import API_CONFIG from "../API";

function RoomKey({ setRightComponent, setLeftComponent }) {
  const [name, setName] = useState(""); // State to store the message
  const [quizKey, setQuizKey] = useState(""); // State to store the message
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

  const dispatch = useDispatch();

  const retrieveQuestions = async (name, quiz_key) => {
    const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_CONFIG.joinQiuz}`;

    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_key: Number(quiz_key), 
          name: name,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);

        const participant = {
          id: responseData["id"],
          name: name,
          room_key: responseData["room_key"].toString(),
        }

        const questions = responseData["questions"];

        dispatch(setParticipant(participant));
        dispatch(setQuestions(questions));

        setRightComponent("ReceiveMsg");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, quizKey);



    // recieve questions
    retrieveQuestions(name, quizKey);

    setRightComponent("ReceiveMsg");
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative  rounded-lg border-2">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Join into a Session
          </h3>
        </div>
        <div className="p-4 md:p-5">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter Your Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)} // Update state on input change
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter the Quiz Key
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter the key"
                required
                value={quizKey}
                onChange={(e) => setQuizKey(e.target.value)} // Update state on input change
              />
            </div>
            <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoomKey;
