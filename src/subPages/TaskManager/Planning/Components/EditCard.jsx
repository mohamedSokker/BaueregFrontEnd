import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "../Styles/EditCard.css";
import EditCardFields from "./EditCardFields";
import { editFields } from "../Model/model";

const EditCard = ({
  setIsEditCard,
  item,
  category,
  handleSave,
  handleDelete,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [val, setVal] = useState(editFields);

  console.log(val);

  useEffect(() => {
    let values = {};
    Object.keys(item).map((el) => {
      values = { ...values, [el]: item[el] };
    });
    setVal(values);
  }, []);

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
        className={`md:w-[36.6%] w-[90%] md:h-[74.5%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <div>Edit</div>
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 hover:rounded-full hover:bg-gray-300 aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsEditCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <EditCardFields
            name="Title"
            col="title"
            data={item?.title}
            focused={true}
            inputType={"text"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={false}
          />
          <EditCardFields
            name="Equipment"
            col="eq"
            data={item?.eq}
            focused={false}
            inputType={"text"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={true}
          />
        </div>

        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <EditCardFields
            name="Start"
            col="start"
            data={item?.start}
            focused={false}
            inputType={"datetime-local"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={false}
          />
          <EditCardFields
            name="End"
            col="end"
            data={item?.end}
            focused={false}
            inputType={"datetime-local"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={false}
          />
        </div>
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <EditCardFields
            name="Duration"
            col="duration"
            data={item?.duration}
            focused={false}
            inputType={"text"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={false}
          />
          <EditCardFields
            name="Workshop"
            col="workshop"
            data={item?.workshop}
            focused={false}
            inputType={"text"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={false}
          />
        </div>
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <EditCardFields
            name="Assigned To"
            col="name"
            data={item?.name}
            focused={false}
            inputType={"text"}
            w={"45%"}
            input={"input"}
            val={val}
            setVal={setVal}
            disabled={true}
          />
          <EditCardFields
            name="Periority"
            col="periority"
            data={item.periority}
            focused={false}
            input={`combobox`}
            w={`45%`}
            options={["high", "medium", "low"]}
            val={val}
            setVal={setVal}
            disabled={false}
          />
        </div>
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <EditCardFields
            name={`Description`}
            col="desc"
            data={item.desc}
            focused={false}
            input={`textarea`}
            w={`100%`}
            val={val}
            setVal={setVal}
            disabled={false}
          />
        </div>
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <EditCardFields
            name={`Description_Ar`}
            col="descAr"
            data={item.descAr}
            focused={false}
            input={`textarea`}
            w={`100%`}
            val={val}
            setVal={setVal}
            disabled={true}
          />
        </div>
        <div className="w-full flex flex-row gap-4 justify-between items-center p-2 px-6">
          <div>
            <button
              className="text-gray-500 font-[600] text-[14px]"
              onClick={async () => {
                handleDelete(val, category);
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              DELETE
            </button>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <button
              className=" text-red-400 font-[600] text-[14px]"
              onClick={async () => {
                handleSave(val, category);
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              SAVE
            </button>
            <button
              className=" text-gray-500 font-[600] text-[14px]"
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
