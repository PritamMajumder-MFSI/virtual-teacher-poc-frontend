import { useState } from "react";
import { AvatarScene } from "../components/scene";
import { SpeechInput } from "../components/ui";

const Home = () => {
  const [mouthShape, sestring] = useState<string>("");
  const updateMouthShape = (shape: string) => {
    sestring(shape);
  };
  return (
    <>
      <AvatarScene mouthShape={mouthShape} />
      <SpeechInput updateMouthShape={updateMouthShape} />
    </>
  );
};

export default Home;
