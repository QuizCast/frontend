import React, { useState } from "react";

const UserSession = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <button 
        type="button"  
        id="dropdownInformationButton"
        onClick={toggleDropdown}
        className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <img className="w-8 h-8 rounded-full" src="profile.svg" alt="user photo"/>
        </button>

      <div
        id="dropdownInformation"
        className={`z-40 ${
          isDropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
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
    </>
  );
};

export default UserSession;
