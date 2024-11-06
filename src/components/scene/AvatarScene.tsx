import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AvatarModel } from "../models/AvatarModel";
import { OrbitControls, Sky } from "@react-three/drei";

const AvatarScene = ({ mouthShape }: { mouthShape: string }) => {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0.5, 1.5], fov: 42 }}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <ambientLight intensity={1.25} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <Sky />
          <AvatarModel
            mouthShape={mouthShape}
            position={[0, -1.25, 0]}
            scale={1}
            receiveShadow
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default AvatarScene;
