"use client";

import React, { useState } from "react";
import useSupabase from "@/app/hooks/useSupabase";
import { useSelector } from "react-redux";
import API_CONFIG from "../API";

const BroadCast = ({ setRightComponent, setLeftComponent }) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const supabase = useSupabase();
  const room_key = useSelector((state) => state.room_key.room_key);
  const user = useSelector((state) => state.user.user);

  const castMessage = (key) => {
    const channel = supabase.channel(key);

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({
          type: "broadcast",
          event: "cursor-pos",
          payload: { message: message },
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      castMessage(room_key);
      if (message === "Start") {
        setLeftComponent("LeaderBoard");
      }
    }
  };

  const deleteRoom = async () => {
    const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_CONFIG.deleteRoom}`;

    try {
      const response = await fetch(END_POINT, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user["access_token"]}`,
        },
        body: JSON.stringify({
          user_id: user["user_id"],
          room_key: room_key,
        }),
      });

      if (response.ok) {
        setRightComponent("Qsettings");
        setLeftComponent("Welcome"); // Hide LeaderBoard
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const copyRoomKey = () => {
    navigator.clipboard.writeText(room_key).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      {/* Room Key Display */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          Room Key
        </h2>
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600">
            {room_key}
          </div>
          <button
            onClick={copyRoomKey}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Copy
          </button>
        </div>
        {copySuccess && (
          <p className="mt-2 text-sm text-green-600">Copied to clipboard!</p>
        )}
      </div>

      {/* Buttons */}
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  <ul className="space-y-4 mb-4">
    <li>
      <button
        type="submit"
        className="inline-flex items-center justify-between w-full p-5 text-black bg-white border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 hover:text-green-900 dark:bg-green-600 dark:text-white dark:hover:bg-green-500 dark:border-green-600"
        onClick={() => setMessage("Start")}
      >
        <div className="block">
          <div className="w-full text-lg font-semibold">Start Quiz</div>
        </div>
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </li>
    <li>
      <button
        type="submit"
        className="inline-flex items-center justify-between w-full p-5 text-black bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-400 dark:border-blue-800"
        onClick={() => setMessage("End")}
      >
        <div className="block">
          <div className="w-full text-lg font-semibold">End Quiz</div>
        </div>
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </li>
    <li>
      <button
        type="submit"
        className="inline-flex items-center justify-between w-60 p-5 text-black bg-white border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 hover:text-red-900 dark:bg-gray-600 dark:text-white dark:hover:bg-red-300 dark:border-red-600"
        onClick={() => deleteRoom()}
      >
        <div className="block">
          <div className="w-full text-lg font-semibold">Delete Room</div>
        </div>
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </li>
  </ul>
</form>

      {/* Error Message */}
      {errorMessage && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default BroadCast;
