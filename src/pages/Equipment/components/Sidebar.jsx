import React from "react";
// import { TiArrowSortedDown } from "react-icons/ti";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

const Sidebar = ({
  setIsAnimate,
  setIsPartsAnimate,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  rpm,
  setRPM,
}) => {
  const smallPlateGearRPM = (rpm * (28 / 21)).toFixed(2);
  const smallPlateRPM = (rpm * (28 / 69)).toFixed(2);
  const bigPlateSunGearRPM = (rpm * (28 / 69)).toFixed(2);
  const bigPlateGearRPM = (rpm * (28 / 69) * (28 / 21)).toFixed(2);
  const bigPlateRPM = (rpm * (28 / 69) * (28 / 69)).toFixed(2);
  const coverSunGearRPM = (rpm * (28 / 69) * (28 / 69)).toFixed(2);
  const coverGearRPM = (rpm * (28 / 69) * (28 / 69) * (21 / 24)).toFixed(2);
  const coverRPM = (rpm * (28 / 69) * (28 / 69) * (21 / 69)).toFixed(2);
  const ringRPM = (rpm * (28 / 69) * (28 / 69) * (21 / 69)).toFixed(2);

  const parts = [
    { name: "smallPlateGearRPM", value: smallPlateGearRPM },
    { name: "smallPlateRPM", value: smallPlateRPM },
    { name: "bigPlateSunGearRPM", value: bigPlateSunGearRPM },
    { name: "bigPlateGearRPM", value: bigPlateGearRPM },
    { name: "bigPlateRPM", value: bigPlateRPM },
    { name: "coverSunGearRPM", value: coverSunGearRPM },
    { name: "coverGearRPM", value: coverGearRPM },
    { name: "coverRPM", value: coverRPM },
    { name: "ringRPM", value: ringRPM },
  ];

  return (
    <div
      style={{
        width: "250px",
        maxHeight: "94%",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        position: "absolute",
        left: "8px",
        top: "2%",
        zIndex: 10,
        boxShadow: "-2px -2px 10px 2px grey",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "rgb(41,45,57)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          borderBottomLeftRadius: isSidebarCollapsed ? "12px" : 0,
          borderBottomRightRadius: isSidebarCollapsed ? "12px" : 0,
          transition: "height 0.5s ease-in-out",
        }}
      >
        {isSidebarCollapsed ? (
          <MdArrowRight
            size={26}
            color="rgb(83,87,96)"
            style={{ cursor: "pointer" }}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          />
        ) : (
          <MdArrowDropDown
            size={26}
            color="rgb(83,87,96)"
            style={{ cursor: "pointer" }}
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          />
        )}
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(24,28,32)",
          padding: isSidebarCollapsed ? 0 : "8px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          // justifyContent: "space-between",
          alignItems: "center",
          overflowY: "auto",
          overflowX: "hidden",
          height: isSidebarCollapsed ? 0 : "auto",
          transition: "height 0.5s ease-in-out",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "12px",
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "6px",
              paddingLeft: "4px",
              paddingRight: "4px",
              outline: "none",
              border: "none",
              backgroundColor: "#2191FF",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsAnimate(true)}
          >
            Start Working Animation
          </button>
          <button
            style={{
              width: "100%",
              padding: "6px",
              paddingLeft: "4px",
              paddingRight: "4px",
              outline: "none",
              border: "none",
              backgroundColor: "#2191FF",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsAnimate(false)}
          >
            Stop Working Animation
          </button>
          <button
            style={{
              width: "100%",
              padding: "6px",
              paddingLeft: "4px",
              paddingRight: "4px",
              outline: "none",
              border: "none",
              backgroundColor: "#2191FF",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsPartsAnimate(true)}
          >
            Start Parts Animation
          </button>
          <button
            style={{
              width: "100%",
              padding: "6px",
              paddingLeft: "4px",
              paddingRight: "4px",
              outline: "none",
              border: "none",
              backgroundColor: "#2191FF",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsPartsAnimate(false)}
          >
            Stop Parts Animation
          </button>
          <button
            style={{
              width: "100%",
              padding: "6px",
              paddingLeft: "4px",
              paddingRight: "4px",
              outline: "none",
              border: "none",
              backgroundColor: "#2191FF",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsPartsAnimate("Reverse")}
          >
            Reverse Parts Animation
          </button>
        </div>
        <div
          style={{
            width: "100%",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <label htmlFor="rpm" style={{ fontSize: "12px", fontWeight: "800" }}>
            {`RPM: `}
          </label>
          <input
            id="rpm"
            style={{
              width: "100%",
              padding: "4px",
              outline: "none",
              paddingLeft: "4px",
              fontSize: "12px",
              borderRadius: "4px",
            }}
            value={rpm}
            onChange={(e) => setRPM(e.target.value)}
          />
        </div>

        {parts.map((item, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <label
              htmlFor={`${item.name}`}
              style={{ fontSize: "12px", fontWeight: "800" }}
            >
              {`${item.name}: `}
            </label>
            <p
              id={`${item.name}`}
              style={{
                width: "100%",
                padding: "4px",
                outline: "none",
                paddingLeft: "4px",
                fontSize: "12px",
                borderRadius: "4px",
                backgroundColor: "gray",
                margin: 0,
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
