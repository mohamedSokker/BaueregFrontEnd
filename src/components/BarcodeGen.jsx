import React, { useRef, useState } from "react";
import Barcode from "react-barcode";

import ReactToPrint from "react-to-print";
// import { useBarcode } from "@createnextapp/react-barcode";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const BarcodeGen = () => {
  const [value, setValue] = useState("Not Found");
  const [textValue, setTextValue] = useState("");
  const [file, setFile] = useState("");
  // const { inputRef } = useBarcode({
  //   value: value,
  //   options: {
  //     width: 2,
  //     height: 100,
  //     // displayValue: false,
  //     // customations here
  //   },
  // });

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

  // const handleDownload = (e) => {
  //   e.stopPropagation();
  //   let img = document.getElementById("img");
  //   setFile(img.src);
  // };

  return (
    <div className="flex flex-col w-full h-full p-2 bg-gray-100">
      <div className="flex md:flex-row flex-col justify-start md:items-center items-start mb-10">
        <input
          className=" border-b-2 border-gray-400 outline-none mr-4 pl-4 md:w-400 w-[200px] md:mb-0 mb-4"
          placeholder="Enter Part No and Description Here"
          type="text"
          onChange={(e) => setTextValue(e.target.value)}
        />
        <button
          type="button"
          className=" bg-logoColor rounded-full w-36 font-bold text-white p-2 text-center md:text-[16px] text-[16px]"
          onClick={(e) => setValue(textValue)}
        >
          Generate Code
        </button>
      </div>
      <div ref={ref} className={`barcode flex justify-center items-center`}>
        <Barcode width={1} height={40} value={value} />
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
      {/* <div className="mb-10 flex flex-row  items-center">
        <img ref={inputRef} id="img" alt="bar-code" className="" />
        <a
          className="bg-logoColor rounded-full font-bold text-white p-2 text-center mr-4 hover:cursor-pointer ml-4 flex flex-row items-center gap-1"
          onClick={handleDownload}
          href={`${file}`}
          target="_blank"
          rel="noreferrer"
          download
        >
          <MdOutlineDownloadForOffline />
          Download
        </a>
      </div> */}
    </div>
  );
};

export default BarcodeGen;
