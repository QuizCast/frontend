"use client";

import React, { useState } from "react";
import useSupabase from "@/app/hooks/useSupabase";
import { useSelector } from "react-redux";
import API_CONFIG from "../API";

const BroadCast = ({ setRightComponent, setLeftComponent }) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    e.preventDefault(); // Prevent form default behavior
    if (message.trim() !== "") {
      castMessage(room_key); // Trigger broadcast message
      if (message === "Start") {
        setLeftComponent("LeaderBoard"); // Display LeaderBoard
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
        setLeftComponent(null); // Hide LeaderBoard
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <button
        type="submit" // Set button type to submit
        className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setMessage("Start")} // Set message to start the quiz
      >
        Start Quiz
      </button>
      <button
        type="submit" // Set button type to submit
        className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setMessage("End")} // Set message to end the quiz
      >
        End Quiz
      </button>
      <button
        type="submit" // Set button type to submit
        className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => deleteRoom()} // Set message to end the quiz
      >
        Delete Room
      </button>
    </form>
  );
};

export default BroadCast;
