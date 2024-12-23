import React, { useState } from "react";

const SuccessCard = ({ setIsCard, message }) => {
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
        <div className="w-full max-w-[570px] rounded-[20px] bg-gray-900 py-12 px-8 text-center md:py-[60px] md:px-[70px]">
          <h3 className="text-white pb-2 text-xl font-bold sm:text-2xl">
            Your Message Sent Successfully
          </h3>
          <span className="bg-indigo-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            {message}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="text-white block w-full rounded-lg border border-gray-700 p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsCard(false);
                }, 500);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
