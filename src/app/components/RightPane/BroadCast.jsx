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
        setLeftComponent(null);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          className="w-full px-5 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-700"
          onClick={() => setMessage("Start")}
        >
          Start Quiz
        </button>
        <button
          type="submit"
          className="w-full px-5 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
          onClick={() => setMessage("End")}
        >
          End Quiz
        </button>
        <button
          type="button"
          className="w-full px-5 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700"
          onClick={deleteRoom}
        >
          Delete Room
        </button>
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
