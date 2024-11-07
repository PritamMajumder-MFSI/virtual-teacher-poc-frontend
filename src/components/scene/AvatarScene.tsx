import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { AbandonedBrickRoomModel, AvatarModel } from "../models";

const AvatarScene = ({ mouthShape }: { mouthShape: string }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 2], fov: 45 }}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} castShadow />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.15}
        intensity={1}
        castShadow
      />{" "}
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <Sky sunPosition={[1, 0.5, 12]} />
        <AbandonedBrickRoomModel
          position={[0, -1.25, 0]}
          scale={4}
          receiveShadow
        />
        <AvatarModel
          mouthShape={mouthShape}
          position={[0, -1.25, 0]}
          scale={1}
          receiveShadow
          castShadow
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enableRotate={true}
        enablePan={false}
        enableDamping
        dampingFactor={0.25}
      />
    </Canvas>
  );
};

export default AvatarScene;
