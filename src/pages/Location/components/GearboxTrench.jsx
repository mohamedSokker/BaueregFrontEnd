import { Experience } from "./Experience";
import { useState } from "react";
import Sidebar from "./Sidebar";

function GearboxTrench() {
  const [rpm, setRPM] = useState(10);

  const [isAnimate, setIsAnimate] = useState(false);
  const [isPartsAnimate, setIsPartsAnimate] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div style={{ width: "100dvw", height: "100dvh" }}>
      <Sidebar
        setIsAnimate={setIsAnimate}
        setIsPartsAnimate={setIsPartsAnimate}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        rpm={rpm}
        setRPM={setRPM}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Experience
          isAnimate={isAnimate}
          isPartsAnimate={isPartsAnimate}
          rpm={rpm}
        />
      </div>
    </div>
  );
}

export default GearboxTrench;
