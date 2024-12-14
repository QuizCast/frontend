"use client";

import React from "react";
import useSupabase from "@/app/hooks/useSupabase";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLeaderboard,
  cleanLeaderboard,
  insertLeaderboard,
} from "@/store/Slices/leaderBoardSlice";

const LeaderBoard = ({ setRightComponent, setLeftComponent }) => {
  const supabase = useSupabase();
  const dispatch = useDispatch();
  const scoreBoard = useSelector((state) => state.leaderBoard.leaderBoard);

  const leaderboardUpdate = (payload) => {
    if (payload.eventType === "INSERT") {
      console.log("New Participant Added");
      const record = {
        id: payload["new"]["id"],
        name: payload["new"]["name"],
        score: payload["new"]["score"],
      };
      dispatch(insertLeaderboard(record));
    } else if (payload.eventType === "UPDATE") {
      console.log("Participant Updated");
      const record = {
        id: payload["new"]["id"],
        name: payload["new"]["name"],
        score: payload["new"]["score"],
      };
      dispatch(updateLeaderboard([record]));
    } else if (payload.eventType === "DELETE") {
      console.log("Participant Deleted");
      dispatch(cleanLeaderboard());
      setLeftComponent("Welcome");
    }
  };

  supabase
    .channel("room1")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: process.env.NEXT_PUBLIC_DB_TABLE },
      (payload) => {
        leaderboardUpdate(payload);
      }
    )
    .subscribe();

  const sortedScoreBoard = [...scoreBoard]
    .map((participant) => ({
      ...participant,
      score: Math.min(100, Math.max(0, participant.score)), // Clamp score between 0 and 100
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="bg-glass-1 w-full p-4 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full p-4">
        <span className="font-extrabold text-lg text-blue-800 dark:text-gray-400">
          LEADER BOARD
        </span>
        <div className="mt-4 grid grid-cols-2 gap-10">
          <span className="font-medium text-gray-500 dark:text-gray-400">
            Participant
          </span>
          <span className="font-medium text-gray-500 dark:text-gray-400">
            Score
          </span>
        </div>
        <div className="mt-4 space-y-6">
          {sortedScoreBoard.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center min-w-0"> {/* Ensure fixed width for the name section */}
                <FaUserCircle className="w-8 h-8 text-gray-700 dark:text-white mr-4" />
                <span className="text-sm font-medium text-gray-700 dark:text-white truncate">
                  {participant.name}
                </span>
              </div>
              <div className="flex ml-auto">
              <div className="flex-1 ml-6"> {/* Ensures the progress bar takes consistent width */}
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {participant.score}%
                  </span>
                </div>
                <div className="w-40 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${participant.score}%` }}
                  ></div>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
