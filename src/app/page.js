"use client";

import { useState } from "react";
import LeaderBoard from "./components/LeftPane/LeaderBoard";
import Login from "./components/RightPane/Login";
import SignUp from "./components/RightPane/SignUp";
import Join from "./components/RightPane/Join";
import BroadCast from "./components/RightPane/BroadCast";
import ReceiveMsg from "./components/RightPane/ReceiveMsg";
import RoomKey from "./components/RightPane/RoomKey";
import Questions from "./components/RightPane/Questions";

export default function Home() {
  const [leftComponent, setLeftComponent] = useState("LeaderBoard");
  const [rightComponent, setRightComponent] = useState("Join");

  const renderLeftComponent = () => {
    switch (leftComponent) {
      case "LeaderBoard":
        return (
          <LeaderBoard
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      default:
        return null;
    }
  };

  const renderRightComponent = () => {
    switch (rightComponent) {
      case "SignUp":
        return (
          <SignUp
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      case "Login":
        return (
          <Login
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      case "Join":
        return (
          <Join
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      case "BroadCast":
        return (
          <BroadCast
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      case "ReceiveMsg":
        return (
          <ReceiveMsg
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      case "RoomKey":
        return (
          <RoomKey
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      case "Questions":
        return (
          <Questions
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
      default:
        return <Login />;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-animated-gradien-1"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Large Floating Card */}
      <div className="w-11/12 md:w-4/5 lg:w-5/6 h-[90%] bg-white rounded-2xl shadow-2xl ">
        <div className="flex h-full">
          {/* Left Half */}
          <div
            className="w-2/5 h-full flex items-center justify-center relative"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 z-0">
              <div className="area">
                <ul className="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div className="z-10 w-4/5">{renderLeftComponent()}</div>
          </div>

          {/* Right Half */}
          <div className="w-3/5 h-full flex items-center justify-center">
            {renderRightComponent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-1 text-center">
        <p className="text-slate-50 font-small font-bold">
          This is created by Team{" "}
          <span className="font-extrabold text-yellow-100">QuizCast</span> ❤️
        </p>
      </footer>
    </div>
  );
}
