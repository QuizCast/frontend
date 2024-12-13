"use client";

import React, { useEffect, useState } from "react";
import useSupabase from "@/app/hooks/useSupabase";
import { useSelector } from "react-redux";

const ReceiveMsg = ({ setRightComponent, setLeftComponent }) => {
  const supabase = useSupabase();
  const [message, setMessage] = useState(null); // State to store the received message
  const [loading, setLoading] = useState(true); // State to manage waiting animation
  const room_key = useSelector((state) => state.participant.Participant["room_key"]);

  useEffect(() => {
    const channel = supabase.channel(room_key);

    // Listen for broadcast messages
    channel.on("broadcast", { event: "cursor-pos" }, (payload) => {
      console.log("Message received:", payload);
      const receivedMessage = payload.payload.message;
      setMessage(receivedMessage); // Update state with the received message

      if (receivedMessage === "Start") {
        setLoading(false); // Stop waiting animation
        setRightComponent("Qdisplay"); // Render the Questions component
        setLeftComponent("LeaderBoard"); // Render the LeaderBoard component
      }
    });

    // Subscribe to the channel
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("Successfully subscribed to the channel!");
      }
    });

    // Cleanup function to remove subscription
    return () => {
      channel.unsubscribe();
      console.log("Unsubscribed from the channel.");
    };
  }, [supabase]);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">Waiting for Messages...</h2>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <h2 className="text-lg font-bold">Receiving Messages...</h2>
      )}
    </div>
  );
};

export default ReceiveMsg;
