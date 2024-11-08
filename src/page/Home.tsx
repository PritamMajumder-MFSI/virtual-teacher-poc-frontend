import { useState } from "react";
import { AvatarScene } from "../components/scene";
import { InstructionsPopup, SpeechInput } from "../components/ui";

const Home = () => {
  const [mouthShape, sestring] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const updateMouthShape = (shape: string) => {
    sestring(shape);
  };

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={togglePopup}
          className="absolute top-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full"
        >
          Instructions
        </button>

        <AvatarScene mouthShape={mouthShape} />
        <SpeechInput updateMouthShape={updateMouthShape} />
      </div>

      <InstructionsPopup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
};

export default Home;
