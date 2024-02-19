import React, { useState } from "react";

const Header = ({ name, isParBorder, Par2Cond, category, setCategory }) => {
  return (
    <div
      className="h-full py-2 flex justify-start items-center text-black font-[400] text-[14px] cursor-pointer"
      onClick={() => setCategory(name)}
      style={{
        minWidth: "224px",
        backgroundColor: category === name ? "white" : "rgb(209,213,219)",
        borderTopWidth: category === name ? 1 : 0,
        borderRightWidth: category === name ? 1 : 0,
        borderLeftWidth: category === name ? 1 : 0,
        borderBottomWidth: category === name ? 0 : 1,
        borderTopRightRadius: "6px",
        borderTopLeftRadius: "6px",
        borderColor: "rgb(156,163,175)",
      }}
    >
      <p
        className="w-full text-center border-gray-400"
        style={{
          borderRightWidth:
            category === name || category === Par2Cond || !isParBorder ? 0 : 1,
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default Header;
