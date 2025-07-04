import React, { useState } from "react";

const ConfirmDeleteCard = ({
  setIsCard,
  handleDelete,
  message,
  deleteIcon,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      <div
        className={`md:w-[100%] w-[100%] md:h-[100%] h-[100%] flex flex-col justify-center items-center relative z-[1001] overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="group select-none w-[250px] md:w-[460px]  flex flex-col p-4 relative items-center justify-center bg-gray-200 dark:bg-gray-800 dark:border-gray-800 border border-gray-200 shadow-lg rounded-2xl">
          <div className="">
            <div className="text-center p-3 flex-auto justify-center">
              {deleteIcon && (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              )}

              <h2 className="text-xl font-bold py-4 text-gray-800 dark:text-gray-200">
                Are you sure?
              </h2>
              <p class="font-bold text-sm text-gray-500 px-2">
                {/* Do you really want to continue ? This process cannot be undone */}
                {message}
              </p>
            </div>
            <div className="p-2 mt-2 text-center space-x-1 md:block">
              <button
                className="mb-2 md:mb-0 bg-gray-300 dark:bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-400 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition ease-in duration-300"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsCard(false);
                  }, 500);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                onClick={() => {
                  setIsCanceled(true);
                  handleDelete();
                  setTimeout(() => {
                    setIsCard(false);
                  }, 500);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteCard;
