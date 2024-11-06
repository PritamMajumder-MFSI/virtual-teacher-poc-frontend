import { useState } from "react";
import { AvatarScene } from "../components/scene";
import { SpeechInput } from "../components/ui";
import { TMouthShape } from "../types/type";

const Home = () => {
  const [mouthShape, setMouthShape] = useState<TMouthShape>("closed");
  const updateMouthShape = (shape: TMouthShape) => {
    setMouthShape(shape);
  };
  return (
    <>
      <AvatarScene mouthShape={mouthShape} />
      <SpeechInput updateMouthShape={updateMouthShape} />
    </>
  );
};

export default Home;
