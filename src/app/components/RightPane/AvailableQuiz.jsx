"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "@/store/Slices/roomSlice";
import API_CONFIG from "../API";

const AvailableQuiz = ({ setRightComponent, setLeftComponent }) => {
  const user = useSelector((state) => state.user.user);
  const [quizHistory, setQuizHistory] = useState([]);

  const dispatch = useDispatch();

  const ENDPOINT =
    process.env.NEXT_PUBLIC_BACKEND_URL +
    API_CONFIG.getQuizHistory +
    user["user_id"];

  const fetchQuizHistory = async () => {
    try {
      const response = await fetch(ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (response.status === 200) {
        if (responseData.length === 0) {
          setRightComponent("Qsettings"); // Navigate if no history
        } else {
          setQuizHistory(responseData); // Update quiz history
        }
      } else {
        console.error("Error fetching quiz history");
      }
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    }
  };

  const setQuiz = (room_key) => {
    setLeftComponent("LeaderBoard");
    dispatch(setRoom(room_key.toString()));
    setRightComponent("BroadCast");
  };

  const newQuiz = () => {
    setRightComponent("Qsettings");
  };

  useEffect(() => {
    fetchQuizHistory();
  }, []);

  return (
    <div className="bg-white relative p-4 w-full max-w-md max-h-full">
      <div className="relative rounded-lg border-2 flex flex-col items-center pb-10 pt-4">
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Available Quizzes
      </h1>
      {/* <div>
        <button type="button" onClick={newQuiz}>New Quiz</button>
      </div> */}
      <button
        type="submit"
        className="inline-flex items-center justify-between w-30 p-2 mb-6 text-black bg-white border border-green-200 rounded-md cursor-pointer hover:bg-green-100 hover:text-green-900 dark:bg-green-600 dark:text-white dark:hover:bg-green-500 dark:border-green-600"
        onClick={newQuiz}
      >
        <div className="block">
          <div className="w-full text-sm font-semibold">New Quiz</div>
        </div>
      </button>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-sm text-left text-slate-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Room Key
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {quizHistory.length > 0 ? (
              quizHistory.map((quiz, index) => (
                <tr
                  key={quiz["room_key"]}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-lg font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-lg">{quiz["room_key"]}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 dark:text-blue-500 hover:underline font-semibold"
                      onClick={() => setQuiz(quiz["room_key"])}
                    >
                      Go to Quiz
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-lg text-gray-500 dark:text-gray-400"
                >
                  No quiz history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AvailableQuiz;
