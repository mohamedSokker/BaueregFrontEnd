import React, { useRef, useState } from "react";
import Barcode from "react-barcode";

import ReactToPrint from "react-to-print";

const BarcodeGen = () => {
  const [value, setValue] = useState("Not Found");
  const [textValue, setTextValue] = useState("");
  const [textSabValue, setTextSabValue] = useState("");

  const ref = useRef();

  const pageStyle = `
    @page {
      size: 38.1mm 25.4mm;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 0;
    };

    @media all {
      .pageBreak {
        display: none
      }
    };

    @media print {
      .pageBreak {
        page-break-before: always;
      }
    }
  `;

  return (
    <div className="flex flex-col w-full h-full p-2 bg-gray-100">
      <div className="flex md:flex-row flex-col justify-start md:items-center items-start mb-10">
        <input
          className=" border-b-2 border-gray-400 outline-none mr-4 pl-4 md:w-400 w-[200px] md:mb-0 mb-4"
          placeholder="Enter Code Here"
          type="text"
          onChange={(e) => setTextValue(e.target.value)}
        />
        <input
          className=" border-b-2 border-gray-400 outline-none mr-4 pl-4 md:w-400 w-[200px] md:mb-0 mb-4"
          placeholder="Enter Sabcode Here"
          type="text"
          onChange={(e) => setTextSabValue(e.target.value)}
        />
        <button
          type="button"
          className=" bg-logoColor rounded-full w-36 font-bold text-white p-2 text-center md:text-[16px] text-[16px]"
          onClick={(e) => setValue(textValue)}
        >
          Generate Code
        </button>
      </div>
      <div
        ref={ref}
        className={`barcode flex flex-col justify-center items-center`}
      >
        <input type="text" value={textSabValue} className="text-center" />
        <Barcode
          width={1}
          height={40}
          value={value}
          fontSize={16}
          textMargin={8}
        />
      </div>

      <ReactToPrint
        trigger={() => (
          <button className="bg-logoColor rounded-md text-white p-2 mt-4">
            Print
          </button>
        )}
        content={() => ref.current}
        pageStyle={pageStyle}
      />
    </div>
  );
};

export default BarcodeGen;
