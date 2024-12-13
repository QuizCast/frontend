import React, { useState } from "react";

const UserSession = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        type="button"
        id="dropdownInformationButton"
        aria-expanded={isDropdownOpen}
        aria-controls="dropdownInformation"
        onClick={toggleDropdown}
        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <img
          className="w-8 h-8 rounded-full"
          src="profile2.png"
          alt="user photo"
        />
      </button>

      {/* Dropdown Menu */}
      <div
        id="dropdownInformation"
        className={`absolute right-0 mt-2 z-40 ${
          isDropdownOpen ? "block" : "hidden"
        }  border-3 bg-white divide-y divide-gray-300 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium truncate">name@flowbite.com</div>
        </div>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserSession;
