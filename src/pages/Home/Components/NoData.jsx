import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import "../Styles/noData.css"; // We'll define styles below

const NoData = () => {
  return (
    <div className="no-data-container">
      <div className="icon-wrapper">
        {/* Optional SVG with animation */}
        <svg
          className="empty-state-svg"
          viewBox="0 0 240 180"
          width="240"
          height="180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 160C20 160 50 120 120 120C190 120 220 160 220 160"
            stroke="#B0B0B0"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="
                M20 160C20 160 50 120 120 120C190 120 220 160 220 160;
                M20 160C20 160 50 140 120 140C190 140 220 160 220 160;
                M20 160C20 160 50 120 120 120C190 120 220 160 220 160"
              dur="5s"
              repeatCount="indefinite"
            />
          </path>
          <circle cx="70" cy="70" r="10" fill="#E0E0E0">
            <animate
              attributeName="r"
              values="10;15;10"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="170" cy="70" r="10" fill="#E0E0E0">
            <animate
              attributeName="r"
              values="10;15;10"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Alert Icon */}
        <FiAlertCircle className="alert-icon" />
      </div>

      <h3 className="title">No Data Available</h3>
      <p className="message">
        It seems there is no data to display at the moment.
      </p>
    </div>
  );
};

export default NoData;
