"use client";

import React, { useEffect } from "react";
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
  const room_key = useSelector((state) => state.room_key.room_key);

  useEffect(() => {
    const channel = supabase
      .channel(room_key)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: process.env.NEXT_PUBLIC_DB_TABLE,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            console.log("New Participant Added");
            if (payload.new.room_key !== parseInt(room_key)) return;
            dispatch(
              insertLeaderboard({
                id: payload.new.id,
                name: payload.new.name,
                score: payload.new.score,
              })
            );
          } else if (payload.eventType === "UPDATE") {
            if (payload.new.room_key !== parseInt(room_key)) return;
            console.log("Participant Updated");
            dispatch(
              updateLeaderboard([{
                id: payload.new.id,
                name: payload.new.name,
                score: payload.new.score,
              }])
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe(); // Cleanup subscription on component unmount
    };
  }, [supabase, dispatch, setLeftComponent]);

  // Calculate the highest score for progress bar scaling
  const highestScore = scoreBoard.reduce(
    (max, participant) => Math.max(max, participant.score),
    0
  );

  // Map and sort the scoreBoard for leaderboard display
  const sortedScoreBoard = scoreBoard
    .map((participant) => ({
      ...participant,
      progress: highestScore ? (participant.score / highestScore) * 100 : 0, // Scale progress relative to the highest score
    }))
    .sort((a, b) => b.score - a.score); // Sort by original score

  const resetLeaderboard = () => {
    dispatch(cleanLeaderboard());
  };

  return (
    <div className="bg-glass-1 w-full p-4 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full">
        <h2 className="font-bold text-lg text-slate-950 text-center">
          LEADER BOARD
        </h2>
        <div className="mt-4 space-y-6">
          {sortedScoreBoard.map((participant) => (
            <div
              key={participant.id}
              className="flex flex-wrap items-center justify-between"
            >
              <div className="flex items-center min-w-[10rem] space-x-2">
                <FaUserCircle className="w-8 h-8 text-gray-700 dark:text-white" />
                <span className="text-sm font-medium text-gray-700 dark:text-white truncate">
                  {participant.name} ({participant.score}) {/* Show original score */}
                </span>
              </div>
              <div className="flex flex-1 items-center ml-auto space-x-2">
                <div className="w-full max-w-[8rem] rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${participant.progress}%` }} // Use progress for the graph
                  ></div>
                </div>
                <span className="min-w-30 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {participant.progress.toFixed(1)}% {/* Show progress as percentage */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <button
        type="button"
        className="bg-glass-1 w-full p-3 text-sm text-slate-650 hover:text-slate-950"
        onClick={resetLeaderboard}
      >
        reset
      </button>
    </div>
  );
};

export default LeaderBoard;
