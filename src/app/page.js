"use client";

import { useState } from "react";
import LeaderBoard from "./components/LeftPane/LeaderBoard";
import Welcome from "./components/LeftPane/Welcome";
import Login from "./components/RightPane/Login";
import SignUp from "./components/RightPane/SignUp";
import Join from "./components/RightPane/Join";
import BroadCast from "./components/RightPane/BroadCast";
import ReceiveMsg from "./components/RightPane/ReceiveMsg";
import RoomKey from "./components/RightPane/RoomKey";
import Qsettings from "./components/RightPane/Questions/Qsettings";
import EnteredQuiz from "./components/RightPane/Questions/EnteredQuiz";
import Qdisplay from "./components/RightPane/Session/Qdisplay";
import UserSession from "./components/RightPane/UserSession";
import NavBar from "./components/RightPane/NavBar";

export default function Home() {
  const [leftComponent, setLeftComponent] = useState("Welcome");
  const [rightComponent, setRightComponent] = useState("Join");

  const [quizSettings, setQuizSettings] = useState({
    count: 3,
    time: 10,
  });

  // const [sessionStarted, setSessionStarted] = useState(false); // Track session status

  // const renderLeftComponent = () => {
  //   if (sessionStarted) {
  //     return (
  //       <LeaderBoard
  //         setRightComponent={setRightComponent}
  //         setLeftComponent={setLeftComponent}
  //       />
  //     );
  //   }

  //   switch (leftComponent) {
  //     case "LeaderBoard":
  //       return (
  //         <LeaderBoard
  //           setRightComponent={setRightComponent}
  //           setLeftComponent={setLeftComponent}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const renderLeftComponent = () => {
    switch (leftComponent) {
      case "LeaderBoard":
        return (
          <LeaderBoard
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );

      case "Welcome":
        return (
          <Welcome
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
      case "NavBar":
        return (
          <NavBar
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
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
        case "Qsettings":
          return (
            <Qsettings
              setRightComponent={(component, settings) => {
                setRightComponent(component);
                if (settings) {
                  setQuizSettings(settings);
                }
              }}
              setLeftComponent={setLeftComponent}
            />
          );
          case "EnteredQuiz":
            return (
              <EnteredQuiz
                count={quizSettings.count}
                time={quizSettings.time}
                setRightComponent={setRightComponent}
                setLeftComponent={setLeftComponent}
                //startSession={() => setSessionStarted(true)}
              />
            );

          case "Qdisplay":
              return (
                <Qdisplay
                  setRightComponent={setRightComponent}
                  setLeftComponent={setLeftComponent}
                />
            );
      default:
        return (
          <Login
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        );
    }
  };

  return (
    <div
      className="bg-animated-gradien-1 flex flex-col items-center justify-center h-screen"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
  
{/* Large Floating Card */}
<div className="z-10 pd-1 w-11/12 md:w-4/5 lg:w-5/6 h-[90%] bg-white rounded-2xl shadow-2xl">
  <div className="flex h-full">
    {/* Left Half */}
    <div
      className="w-2/5 h-full flex items-center justify-center relative rounded-bl-2xl rounded-tl-2xl"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxHeight: "100%", // Prevent overflow
        overflow: "hidden", // Optional: Control overflow behavior
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
      <div className="z-10 block w-4/5 h-full flex items-center justify-center">{renderLeftComponent()}</div>
    </div>

    {/* Right Half */}
    <div className="w-3/5 h-full flex flex-col">
      {/* Top Navbar */}
      
      <div className="w-full h-[10%] flex items-start justify-between p-4">
      <NavBar></NavBar>
        {/* <a className="z-50 flex p-4" onClick={() => setRightComponent("Join")}>
          <label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </label>
        </a> */}
      </div>

      {/* Content Area */}
      <div
        className="flex-grow flex items-center justify-center p-1"
        style={{
          maxHeight: "90%", // Adjust to leave space for the navbar
          overflow: "auto", // Optional: Allows scrolling if content exceeds height
        }}
      >
        {renderRightComponent()}
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
      <footer className="w-full p-1 text-center">
        <p className="text-slate-50 font-small font-bold">
          This is created by{" "}
          <span className="font-extrabold text-yellow-100">Team Vertex</span> ❤️
        </p>
      </footer>
    </div>
  );
}
