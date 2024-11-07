import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { AbandonedBrickRoomModel, AvatarModel } from "../models";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";

const AvatarScene = ({ mouthShape }: { mouthShape: string }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const orbitControlsRef = useRef<ThreeOrbitControls>(null);

  return (
    <Canvas
      camera={{ position: [0, 0.5, -2], fov: 45 }}
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
          orbitControlsRef={orbitControlsRef}
          isMoving={isMoving}
          isJumping={isJumping}
          setIsMoving={setIsMoving}
          setIsJumping={setIsJumping}
          mouthShape={mouthShape}
          position={[0, -1.25, 0]}
          scale={1}
          receiveShadow
          castShadow
        />
      </Suspense>
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={false}
        enableRotate={true}
        enablePan={false}
        enabled={true}
        maxDistance={2}
        minDistance={2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
      <perspectiveCamera position={[0, 2, -5]} />
    </Canvas>
  );
};

export default AvatarScene;
