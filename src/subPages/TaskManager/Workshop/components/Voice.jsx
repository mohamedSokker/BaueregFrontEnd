import React, { useEffect, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { useSpeechSynthesis } from "react-speech-kit";

const Voice = ({ text, size }) => {
  const { speak, voices } = useSpeechSynthesis();
  const [voice, setVoice] = useState(voices[0]);

  console.log(voices);

  useEffect(() => {
    const targetVoice = voices?.filter((voice) => voice.lang === "ar");
    console.log(targetVoice[0]);
    setVoice(targetVoice[0]);
  }, [voices]);

  const handleSpeak = () => {
    // console.log(voices);
    speak({ text: text, voice: voice, rate: 0.8 });
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
