import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { AbandonedBrickRoomModel, AvatarModel } from "../models";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";
import { LoaderScene } from "./LoaderScene";
import { Group } from "three/src/Three.js";

const AvatarScene = ({ mouthShape }: { mouthShape: string }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const orbitControlsRef = useRef<ThreeOrbitControls>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<Group>(null);

  return (
    <div ref={sceneRef} tabIndex={0}>
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
        <Suspense fallback={<LoaderScene />}>
          <Sky sunPosition={[1, 0.5, 12]} />
          <AbandonedBrickRoomModel
            position={[0, -1.5, 0]}
            scale={4}
            ref={roomRef}
            receiveShadow
          />
          <AvatarModel
            orbitControlsRef={orbitControlsRef}
            isMoving={isMoving}
            isJumping={isJumping}
            sceneRef={sceneRef}
            setIsMoving={setIsMoving}
            setIsJumping={setIsJumping}
            mouthShape={mouthShape}
            roomRef={roomRef}
            rotation={[0, 5, 0]}
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
          maxDistance={3}
          minDistance={3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
        <perspectiveCamera position={[0, 2, -5]} />
      </Canvas>
    </div>
  );
};

export default AvatarScene;
