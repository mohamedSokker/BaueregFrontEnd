import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeRead = () => {
  const [data, setData] = useState("Not Found");
  const [finalData, setFinalData] = useState("");
  const [stopStream, setStopStream] = useState(false);

  const dismissQrReader = () => {
    setFinalData(data);
    // setStopStream(true);
  };

  const reEnterQrReader = () => {
    setFinalData("");
    // setStopStream(false);
  };
  return (
    <div className="flex flex-col w-full h-full p-2 bg-gray-100">
      <div className="bg-gray-400 p-2 w-[320px] rounded-xl border-[2px] border-dashed border-logoColor">
        <BarcodeScannerComponent
          width={300}
          height={300}
          onUpdate={(err, result) => {
            if (result) {
              setData(result.text);
            } else setData("Not Found");
          }}
          stopStream={stopStream}
        />
      </div>
      <div>
        <p>{data}</p>
        <p>{finalData}</p>
        <button
          type="button"
          className="bg-logoColor rounded-full w-36 font-bold text-white p-2 text-center mr-4"
          onClick={dismissQrReader}
        >
          Save
        </button>
        <button
          type="button"
          className="bg-logoColor rounded-full w-36 font-bold text-white p-2 text-center"
          onClick={reEnterQrReader}
        >
          New Scan
        </button>
      </div>
    </div>
  );
};

export default BarcodeRead;
