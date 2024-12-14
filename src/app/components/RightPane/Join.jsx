import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanQuestions, removeParticipant } from "@/store/Slices/participantSlice";
import { removeRoom } from "@/store/Slices/roomSlice";
import { cleanLeaderboard } from "@/store/Slices/leaderBoardSlice";

const Join = ({ setRightComponent, setLeftComponent }) => {
  const dispatch = useDispatch();

  const sendToWaiting = () => {
    dispatch(cleanQuestions());
    dispatch(removeParticipant());
    dispatch(removeRoom());
    dispatch(cleanLeaderboard());
    setRightComponent("RoomKey");
  };

  return (
    <>
    <div className="w-full max-w-xs md:max-w-sm p-4 md:p-8">
        <h3 className="mb-8 flex justify-center text-lg font-medium text-gray-900 dark:text-white">
          Choose Your Role...
        </h3>
        <ul className="grid w-full gap-2 md:grid-cols-1">
          <a onClick={() => setRightComponent("Login")}>
            <li className="border-1">
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                className="hidden peer"
                required
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:border-gray-700 dark:hover:text-blue-500 hover:border-blue-600 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-800"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">Host</div>
                  <div className="w-full">Create a session.</div>
                </div>
                <svg
                  className="w-5 h-5 ms-3 rtl:rotate-180"
                  aria-hidden="true"
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
              </label>
            </li>
          </a>
          <br></br>
          <a onClick={() => sendToWaiting()}>
            <li className="border-1">
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="hosting-big"
                className="hidden peer"
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:border-gray-700 dark:hover:text-blue-500 hover:border-blue-600 hover:text-blue-600 dark:text-gray-400 dark:bg-gray-800"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    Participant
                  </div>
                  <div className="w-full">Join with a session.</div>
                </div>
                <svg
                  className="w-5 h-5 ms-3 rtl:rotate-180"
                  aria-hidden="true"
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
              </label>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
};

export default Join;
