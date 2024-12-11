"use client";

import React from "react";
import useSupabase from "@/app/hooks/useSupabase";


const LeaderBoard = () => {
  const supabase = useSupabase();

  supabase.channel('room1')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'demo-table' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe()


  return (
    <>
          <div className="w-full max-w-sm p-4 bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full p-4">
      <span className="font-extrabold text-lg text-blue-800 dark:text-gray-400">LEADER BOARD</span>
  <div className="mt-4 grid grid-cols-2 gap-4">
    <span className="font-medium text-gray-500 dark:text-gray-400">MEMBERS</span>
    <span className="font-medium text-gray-500 dark:text-gray-400">COMPLETION</span>
  </div>
  <div className="mt-4 space-y-6">
    {/* Task 1 */}
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700 dark:text-white">
        John Doe
      </div>
      <div className="w-full ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            75%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
    </div>

    {/* Task 2 */}
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700 dark:text-white">
      John Doe
      </div>
      <div className="w-full ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-green-700 dark:text-white">
            100%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
    </div>

    {/* Task 3 */}
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700 dark:text-white">
      John Doe
      </div>
      <div className="w-full ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-red-700 dark:text-white">
            25%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-red-600 h-2.5 rounded-full"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>
    </div>

    {/* Task 4 */}
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700 dark:text-white">
      John Doe
      </div>
      <div className="w-full ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-orange-700 dark:text-white">
            50%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-orange-600 h-2.5 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>
    </div>

    {/* Task 5 */}
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700 dark:text-white">
      John Doe
      </div>
      <div className="w-full ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            90%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "90%" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

    </>
  );
};

export default LeaderBoard;
