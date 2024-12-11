import React from "react";

const SignUp = ({ setRightComponent, setLeftComponent }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4 text-2xl font-bold">SignUp</div>
      <button
        onClick={() => setRightComponent("Login")}
        className="px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Go to Login
      </button>
      <button
        onClick={() => setLeftComponent("LeaderBoard")}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Show Leaderboard
      </button>
    </div>
  );
};

export default SignUp;
