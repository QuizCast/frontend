import React from "react";
import useSupabase from "@/app/hooks/useSupabase";

const LeaderBoard = () => {
  const supabase = useSupabase();

  supabase.channel('room1')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'demo-table' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe()


  return <div><p>LeaderBoard</p></div>;
};

export default LeaderBoard;
