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
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const channel = supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: process.env.NEXT_PUBLIC_DB_TABLE },
        (payload) => {
          if (payload.eventType === "INSERT") {
            console.log("New Participant Added");
            dispatch(
              insertLeaderboard({
                id: payload.new.id,
                name: payload.new.name,
                score: payload.new.score,
              })
            );
          } else if (payload.eventType === "UPDATE") {
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
          } else if (payload.eventType === "DELETE") {
            console.log("Participant Deleted");
            dispatch(cleanLeaderboard());
            setLeftComponent("Welcome");
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe(); // Cleanup subscription on component unmount
    };
  }, [supabase, dispatch, setLeftComponent]);

  const sortedScoreBoard = scoreBoard
    .map((participant) => ({
      ...participant,
      score: Math.min(100, Math.max(0, participant.score)), // Clamp score
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="bg-glass-1 w-full p-4 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full">
        <h2 className="font-bold text-lg text-slate-950 text-center">
          LEADER BOARD
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 text-center">
          <span className="font-medium text-slate-500 ">
            Participant
          </span>
          <span className="font-medium text-slate-500">
            Score
          </span>
        </div>
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
               {participant.score}
                </span> 
                <div className="w-full max-w-[8rem] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${participant.score}%` }}
                  ></div>
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
