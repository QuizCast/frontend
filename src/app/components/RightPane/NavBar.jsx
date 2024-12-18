import React, { use, useState } from "react";
import UserSession from "./UserSession";
import { useSelector } from "react-redux";

const NavBar = ({ setRightComponent, setLeftComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderJoin = () => {
    setRightComponent("Join");
    setLeftComponent("Welcome");
  };

  const renderAbout = () => {
    setRightComponent("AboutUs");
    setLeftComponent("Welcome");
  };

  const renderNewQuiz = () => {
    setRightComponent("Qsettings");
    setLeftComponent("Welcome");
  };

  const renderHistory = () => {
    setRightComponent("AvailableQuiz");
    setLeftComponent("Welcome");
  };

  return (
    <nav className="w-full z-20 ">
      <div className="cursor-pointer max-w-screen-xl flex flex-wrap items-center align-start justify-between mx-auto ">
        <a onClick={() => renderJoin()} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logo.png" className="h-16" alt="Flowbite Logo" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <UserSession
            setRightComponent={setRightComponent}
            setLeftComponent={setLeftComponent}
          />
        </div>

        <div
          className={`items-center justify-between   ${
            isMenuOpen ? "flex border-3 " : "hidden"
          } w-full md:flex md:w-auto md:order-1  `}
          id="navbar-sticky"
        >
          <ul className="w-full flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:text-gray-900 hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer"
                onClick={() => renderJoin()}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer"
                onClick={() => renderAbout()}
              >
                About
              </a>
            </li>
            {user &&
              (<>
                <li>
                  <a
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer"
                    onClick={() => renderNewQuiz()}
                  >
                    New Quiz
                  </a>
                </li>
                <li>
                  <a
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer"
                    onClick={() => renderHistory()}
                  >
                    History
                  </a>
                </li>
              </>)
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
