import { useState, useEffect } from "react";
import { TMouthShape } from "../../types/type";

const SpeechInput = ({
  updateMouthShape,
}: {
  updateMouthShape: (shape: TMouthShape) => void;
}) => {
  const [text, setText] = useState<string>("");
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(
    null
  );

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const regex = /zira|female|woman|girl/i;
      const female = voices.find((voice) => {
        return regex.test(voice.name);
      });

      setFemaleVoice(female || voices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const mouthShapes: TMouthShape[] = ["closed", "open", "round", "wide"];

  const animateMouth = (boundary: SpeechSynthesisEvent) => {
    console.log(boundary.name);
    const word = boundary.charIndex;
    const mouthShape = mouthShapes[word % mouthShapes.length];
    updateMouthShape(mouthShape);
  };

  const speakText = (inputText: string) => {
    if (!inputText) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(inputText);
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onboundary = (event) => {
      animateMouth(event);
    };

    window.speechSynthesis.speak(utterance);
    setText("");
  };
  const handleSpeak = () => {
    if (text.trim()) {
      speakText(text);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4  shadow-lg">
      <div className="flex items-center justify-center max-w-xl mx-auto gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSpeak}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Speak
        </button>
      </div>
    </div>
  );
};

export default SpeechInput;
