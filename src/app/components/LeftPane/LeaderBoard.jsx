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
        { event: "*", schema: "public", table: process.env.NEXT_PUBLIC_DB_TABLE },
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
              updateLeaderboard([ 
                {
                  id: payload.new.id,
                  name: payload.new.name,
                  score: payload.new.score,
                },
              ])
            );
          }
          // else if (payload.eventType === "DELETE") {
          //   console.log("Participant Deleted");
          //   dispatch(cleanLeaderboard());
          //   setLeftComponent("Welcome");
          // }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe(); // Cleanup subscription on component unmount
    };
  }, [supabase, dispatch, setLeftComponent]);

  // Map scoreBoard and store both the original score and scaled score for the graph
  const sortedScoreBoard = scoreBoard
    .map((participant) => ({
      ...participant,
      originalScore: participant.score, // Store the original score
      scaledScore: Math.min(100, Math.max(0, participant.score)), // Clamp the score for graph rendering
    }))
    .sort((a, b) => b.scaledScore - a.scaledScore); // Sort by scaled score for leaderboard

  const resetLeaderboard = () => {
    dispatch(cleanLeaderboard());
  };

  return (
    <div className="bg-glass-1 w-full p-4 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full">
        <h2 className="font-bold text-lg text-slate-950 text-center">
          LEADER BOARD
        </h2>
        {/* <div className="mt-4 grid flex justify-right sm:gap-4 text-center">
          <span className="font-medium text-slate-500">Score</span>
        </div> */}
        <div className="mt-4 space-y-6">
          {sortedScoreBoard.map((participant) => (
            <div
              key={participant.id}
              className="flex flex-wrap items-center justify-between"
            >
              <div className="flex items-center min-w-[10rem] space-x-2">
                <FaUserCircle className="w-8 h-8 text-gray-700 dark:text-white" />
                <span className="text-sm font-medium text-gray-700 dark:text-white truncate">
                  {participant.name}
                </span>
              </div>
              <div className="flex flex-1 items-center ml-auto space-x-2">
                <span className="min-w-30 text-sm font-medium text-blue-700 dark:text-white">
                  {participant.originalScore} {/* Display original score */}
                </span>
                <div className="w-full max-w-[8rem] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${participant.scaledScore}%` }} // Use the scaled score for the graph
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br/>
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
