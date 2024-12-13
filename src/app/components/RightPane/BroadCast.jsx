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


    // <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
    //   <button
    //     type="submit" // Set button type to submit
    //     className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     onClick={() => setMessage("Start")} // Set message to start the quiz
    //   >
    //     Start Quiz
    //   </button>
    //   <button
    //     type="submit" // Set button type to submit
    //     className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     onClick={() => setMessage("End")} // Set message to end the quiz
    //   >
    //     End Quiz
    //   </button>
    //   <button
    //     type="submit" // Set button type to submit
    //     className="text-white bg-blue-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     onClick={() => deleteRoom()} // Set message to end the quiz
    //   >
    //     Delete Room
    //   </button>
    // </form>

  //   <div
  //   id="select-modal"
  //   tabIndex="-1"
  //   aria-hidden="true"
  //   className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  // >
  //   <div className="relative p-4 w-full max-w-md max-h-full">
  //     {/* <!-- Modal content --> */}
  //     <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
  //       {/* <!-- Modal body --> */}
  //       <div className="p-4 md:p-5">
  //         <ul className="space-y-4 mb-4">
  //           <li>
  //             <input
  //               type="radio"
  //               id="job-1"
  //               name="job"
  //               value="job-1"
  //               className="hidden peer"
  //               required
  //             />
  //             <label
  //               htmlFor="job-1"
  //               className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
  //             >
  //               <div className="block">
  //                 <div className="w-full text-lg font-semibold">
  //                   UI/UX Engineer
  //                 </div>
  //                 <div className="w-full text-gray-500 dark:text-gray-400">
  //                   Flowbite
  //                 </div>
  //               </div>
  //               <svg
  //                 className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
  //                 aria-hidden="true"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 14 10"
  //               >
  //                 <path
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M1 5h12m0 0L9 1m4 4L9 9"
  //                 />
  //               </svg>
  //             </label>
  //           </li>
  //           <li>
  //             <input
  //               type="radio"
  //               id="job-2"
  //               name="job"
  //               value="job-2"
  //               className="hidden peer"
  //             />
  //             <label
  //               htmlFor="job-2"
  //               className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
  //             >
  //               <div className="block">
  //                 <div className="w-full text-lg font-semibold">
  //                   React Developer
  //                 </div>
  //                 <div className="w-full text-gray-500 dark:text-gray-400">
  //                   Alphabet
  //                 </div>
  //               </div>
  //               <svg
  //                 className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
  //                 aria-hidden="true"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 14 10"
  //               >
  //                 <path
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M1 5h12m0 0L9 1m4 4L9 9"
  //                 />
  //               </svg>
  //             </label>
  //           </li>
  //           <li>
  //             <input
  //               type="radio"
  //               id="job-3"
  //               name="job"
  //               value="job-3"
  //               className="hidden peer"
  //             />
  //             <label
  //               htmlFor="job-3"
  //               className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
  //             >
  //               <div className="block">
  //                 <div className="w-full text-lg font-semibold">
  //                   Full Stack Engineer
  //                 </div>
  //                 <div className="w-full text-gray-500 dark:text-gray-400">
  //                   Apple
  //                 </div>
  //               </div>
  //               <svg
  //                 className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
  //                 aria-hidden="true"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 viewBox="0 0 14 10"
  //               >
  //                 <path
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M1 5h12m0 0L9 1m4 4L9 9"
  //                 />
  //               </svg>
  //             </label>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  );
};

export default BroadCast;
