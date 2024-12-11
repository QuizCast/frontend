import React, { useEffect, useState } from "react";
import useSupabase from "@/app/hooks/useSupabase";

const ReceiveMsg = ({ setRightComponent, setLeftComponent }) => {
  const supabase = useSupabase();
  const [message, setMessage] = useState(null); // State to store the received message

  useEffect(() => {
    const channel = supabase.channel("room1");

    // Listen for broadcast messages
    channel.on("broadcast", { event: "cursor-pos" }, (payload) => {
      console.log("Message received:", payload);
      setMessage(payload.payload.message); // Update state with the received message
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
      <h2 className="text-lg font-bold">Receive Messages</h2>
      {message ? (
        <p className="mt-2 text-green-600">Received Message: {message}</p>
      ) : (
        <p className="mt-2 text-gray-500">Waiting for messages...</p>
      )}
    </div>
  );
};

export default ReceiveMsg;
