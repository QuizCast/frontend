"use client";

import React, { useState } from "react";
import useSupabase from "@/app/hooks/useSupabase";
import { useSelector } from "react-redux";

const BroadCast = ({ setRightComponent, setLeftComponent }) => {
  const [message, setMessage] = useState("");
  const supabase = useSupabase();
  const room_key = useSelector((state) => state.room_key.room_key);

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
    console.log(message);
    e.preventDefault(); // Prevent form default behavior
    if (message.trim() !== "") {
      castMessage(room_key); // Trigger broadcast message
      console.log("Message sent!", message);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      {/* <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter Your Message to Broadcast
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update state on input change
        />
      </div> */}
      <button
        type="submit" // Set button type to submit
        className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setMessage("Start")} // Set message to start the quiz
      >
        Start The Quiz
      </button>
      <button
        type="submit" // Set button type to submit
        className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setMessage("End")} // Set message to end the quiz
      >
        End The Quiz
      </button>
    </form>
  );
};

export default BroadCast;
