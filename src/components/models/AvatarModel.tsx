import { useAnimations, useGLTF } from "@react-three/drei";
import { avatarAnimationsGlb, avatarGlb } from "../../assets";
import { Group } from "three";
import { useEffect, useRef, useState } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import correspondings from "../../utils/correspondings";
import * as THREE from "three";
import { TAvatarModel } from "../../types/gltfTypes";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";

export const AvatarModel = ({
  mouthShape,
  setIsMoving,
  setIsJumping,
  orbitControlsRef,
  isJumping,
  ...props
}: {
  mouthShape: string;
  orbitControlsRef: React.RefObject<ThreeOrbitControls>;
  isMoving: boolean;
  isJumping: boolean;
  setIsMoving: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJumping: React.Dispatch<React.SetStateAction<boolean>>;
} & GroupProps) => {
  const morphTargetSmoothing = 0.75;
  const group = useRef<Group<THREE.Object3DEventMap>>(null);
  const { animations } = useGLTF(avatarAnimationsGlb);
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === "idle") ? "idle" : animations[0].name
  );
  const { nodes, materials } = useGLTF(avatarGlb) as unknown as TAvatarModel;
  const [isCrouching, setIsCrouching] = useState<boolean>(false);

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [yVelocity, setYVelocity] = useState(0);

  useEffect(() => {
    console.log(actions);
    const action = actions?.[animation];
    if (action) {
      action.reset().fadeIn(0.5).play();

      return () => {
        action.fadeOut(0.5);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation]);
  useEffect(() => {
    const actionNames = ["talk_1", "talk_2", "talk_3"];
    const randomIndex = Math.floor(Math.random() * actionNames.length);
    const name = actionNames[randomIndex];
    if (isSpeaking) {
      setAnimation(name);
    }
  }, [isSpeaking]);

  useFrame(({ camera }) => {
    console.log(isJumping);
    if (
      !moveForward &&
      !moveBackward &&
      !moveLeft &&
      !moveRight &&
      !isJumping &&
      !isCrouching &&
      !isSpeaking
    ) {
      setAnimation("idle");
    }
    handleMovement(camera);
    changeMouthShape(mouthShape);
  });
  const handleMovement = (
    camera: THREE.Camera & {
      manual?: boolean;
    }
  ) => {
    if (group.current) {
      const speed = isRunning ? 0.1 : 0.05;
      let isMoving = false;

      if (moveForward) {
        group.current.position.z += speed;
        isMoving = true;
      }
      if (moveBackward) {
        group.current.position.z -= speed;
        isMoving = true;
      }
      if (moveLeft) {
        group.current.position.x += speed;
        isMoving = true;
      }
      if (moveRight) {
        group.current.position.x -= speed;
        isMoving = true;
      }
      if (isJumping) {
        isMoving = true;
        group.current.position.y += yVelocity;
        setYVelocity((prev) => prev - 0.01);
        if (group.current.position.y <= -1.25) {
          group.current.position.y = -1.25;
          adjustCamera(camera);
          console.log("called");
          isMoving = false;
          setIsJumping(false);
          setYVelocity(0);
          handleAnimation();
        }
      }
      setIsMoving(isMoving);
      if (isMoving) adjustCamera(camera);
    }
  };
  const adjustCamera = (
    camera: THREE.Camera & {
      manual?: boolean;
    }
  ) => {
    if (!group.current) {
      return;
    }
    const avatarPosition = group.current.position;

    const targetPosition = new THREE.Vector3(
      avatarPosition.x,
      avatarPosition.y + 1.5,
      avatarPosition.z - 2
    );
    orbitControlsRef.current?.target.lerp(targetPosition, 0.1);
    camera.position.lerp(targetPosition, 0.1);
  };
  const changeMouthShape = (mouthShape: string) => {
    Object.values(correspondings).forEach((value) => {
      if (
        nodes.Wolf3D_Head.morphTargetInfluences &&
        nodes.Wolf3D_Head.morphTargetDictionary &&
        nodes.Wolf3D_Teeth.morphTargetInfluences &&
        nodes.Wolf3D_Teeth.morphTargetDictionary
      ) {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[value]
        ] = THREE.MathUtils.lerp(
          nodes.Wolf3D_Head.morphTargetInfluences[
            nodes.Wolf3D_Head.morphTargetDictionary[value]
          ],
          0,
          morphTargetSmoothing
        );
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[value]
        ] = THREE.MathUtils.lerp(
          nodes.Wolf3D_Teeth.morphTargetInfluences[
            nodes.Wolf3D_Teeth.morphTargetDictionary[value]
          ],
          0,
          morphTargetSmoothing
        );
      }
    });
    if (
      nodes.Wolf3D_Head.morphTargetDictionary &&
      nodes.Wolf3D_Head.morphTargetInfluences &&
      nodes.Wolf3D_Teeth.morphTargetInfluences &&
      nodes.Wolf3D_Teeth.morphTargetDictionary &&
      mouthShape != "END"
    ) {
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[mouthShape]
      ] = THREE.MathUtils.lerp(
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[mouthShape]
        ],
        1,
        morphTargetSmoothing
      );

      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[mouthShape]
      ] = THREE.MathUtils.lerp(
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[mouthShape]
        ],
        1,
        morphTargetSmoothing
      );
    }
  };
  useEffect(() => {
    if (mouthShape && mouthShape != "END") {
      setIsSpeaking(true);
    } else {
      setIsSpeaking(false);
    }
  }, [mouthShape]);
  const handleAnimation = () => {
    if (moveForward) {
      setAnimation(isRunning ? "run" : "walk");
    } else if (moveBackward) {
      setAnimation(isRunning ? "run_back" : "walk_back");
    } else if (moveLeft) {
      setAnimation(isRunning ? "left_strafe" : "left_strafe_walk");
    } else if (moveRight) {
      setAnimation(isRunning ? "right_strafe" : "right_strafe_walk");
    } else if (isJumping) {
      setAnimation("jump");
    } else if (isCrouching) {
      setAnimation("crouch");
    } else if (isDancing) {
      setAnimation("dance");
    } else {
      setAnimation("idle");
    }
  };
  useEffect(
    () => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "x") {
          setIsDancing(true);
          return;
        }
        if (isDancing) return;

        switch (event.key) {
          case "w":
          case "ArrowUp":
            setMoveForward(true);
            handleAnimation();
            break;
          case "s":
          case "ArrowDown":
            setMoveBackward(true);
            handleAnimation();
            break;
          case "a":
          case "ArrowLeft":
            setMoveLeft(true);
            handleAnimation();
            break;
          case "d":
          case "ArrowRight":
            setMoveRight(true);
            handleAnimation();
            break;
          case "Shift":
            setIsRunning(true);
            handleAnimation();
            break;
          case " ":
            if (!isJumping) {
              setIsJumping(true);
              setYVelocity(0.2);
              handleAnimation();
            }
            break;
          case "Control":
            setIsCrouching(true);
            handleAnimation();
            break;
        }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === "x") {
          setIsDancing(false);
          return;
        }
        if (isDancing) return;

        switch (event.key) {
          case "w":
          case "ArrowUp":
            setMoveForward(false);
            break;
          case "s":
          case "ArrowDown":
            setMoveBackward(false);
            break;
          case "a":
          case "ArrowLeft":
            setMoveLeft(false);
            break;
          case "d":
          case "ArrowRight":
            setMoveRight(false);
            break;
          case "Shift":
            setIsRunning(false);
            break;
          case "Control":
            setIsCrouching(false);
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isRunning,
      isJumping,
      isDancing,
      moveForward,
      moveBackward,
      moveLeft,
      moveRight,
      isCrouching,
    ]
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
};

useGLTF.preload(avatarGlb);
