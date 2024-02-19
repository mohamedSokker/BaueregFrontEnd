import React from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { useSpeechSynthesis } from "react-speech-kit";

const Voice = ({ text, size }) => {
  const { speak, voices } = useSpeechSynthesis();

  const handleSpeak = () => {
    console.log(voices);
    speak({ text: text, voice: voices[22], rate: 0.8 });
  };
  return (
    <div
      className="text-[14px] text-gray-400 font-[600] hover:cursor-pointer"
      onClick={handleSpeak}
    >
      <MdKeyboardVoice size={size} />
    </div>
  );
};

export default Voice;
