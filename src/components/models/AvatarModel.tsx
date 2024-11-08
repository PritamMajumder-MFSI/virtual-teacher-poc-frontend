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
  sceneRef,
  ...props
}: {
  mouthShape: string;
  orbitControlsRef: React.RefObject<ThreeOrbitControls>;
  isMoving: boolean;
  isJumping: boolean;
  roomRef: React.RefObject<Group<THREE.Object3DEventMap>>;
  setIsMoving: React.Dispatch<React.SetStateAction<boolean>>;
  sceneRef: React.RefObject<HTMLDivElement>;

  setIsJumping: React.Dispatch<React.SetStateAction<boolean>>;
} & GroupProps) => {
  const morphTargetSmoothing = 0.75;
  const group = useRef<Group<THREE.Object3DEventMap>>(null);
  const { animations } = useGLTF(avatarAnimationsGlb);
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === "idle") ? "idle" : animations[0].name
  );
  const [rotateY, setRotateY] = useState(false);
  const [rotateYA, setRotateYA] = useState(false);
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
    const action = actions?.[animation];
    console.log(animation, action, actions);
    if (action) {
      action.reset().fadeIn(0.5).play();

      return () => {
        action.fadeOut(0.5);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation]);

  useFrame(({ camera }) => {
    handleAnimation();
    handleMovement();
    changeMouthShape(mouthShape);
    adjustCamera(camera);
  });
  const handleMovement = () => {
    if (group.current) {
      const speed = isRunning ? 0.05 : 0.025;
      let isMoving = false;

      if (rotateY) {
        group.current.rotation.y -= 0.05;
      }
      if (rotateYA) {
        group.current.rotation.y += 0.05;
      }

      const forwardDirection = new THREE.Vector3(0, 0, 1);
      const rightDirection = new THREE.Vector3(1, 0, 0);

      forwardDirection.applyQuaternion(group.current.quaternion);

      rightDirection.applyQuaternion(group.current.quaternion);

      forwardDirection.normalize();
      rightDirection.normalize();

      const movementVector = new THREE.Vector3();

      if (moveForward) {
        movementVector.add(forwardDirection.multiplyScalar(speed));
        isMoving = true;
      }
      if (moveBackward) {
        movementVector.add(forwardDirection.multiplyScalar(-speed));
        isMoving = true;
      }
      if (moveLeft) {
        movementVector.add(rightDirection.multiplyScalar(speed));
        isMoving = true;
      }
      if (moveRight) {
        movementVector.add(rightDirection.multiplyScalar(-speed));
        isMoving = true;
      }

      if (isMoving) {
        const newPosition = group.current.position.clone().add(movementVector);

        group.current.position.set(
          THREE.MathUtils.clamp(newPosition.x, -29.75, 31.5),
          group.current.position.y,
          THREE.MathUtils.clamp(newPosition.z, -43, 42)
        );
      }

      if (isJumping) {
        isMoving = true;
        group.current.position.y += yVelocity;
        setYVelocity((prev) => prev - 0.01);
        if (group.current.position.y <= -1.25) {
          group.current.position.y = -1.25;
          isMoving = false;
          setIsJumping(false);
          setYVelocity(0);
        }
      }

      setIsMoving(isMoving);
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
      avatarPosition.z
    );
    camera.position.lerp(targetPosition, 0.1);
    orbitControlsRef.current?.target.lerp(targetPosition, 0.1);
    orbitControlsRef.current?.update();
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
  const handleAnimation = () => {
    if (isSpeaking) {
      const actionNames = ["talk_1", "talk_2", "talk_3"];
      if (actionNames.includes(animation)) {
        return;
      }
      const randomIndex = Math.floor(Math.random() * actionNames.length);
      const name = actionNames[randomIndex];
      if (isSpeaking) {
        setAnimation(name);
      }
    } else if (isCrouching && moveForward) {
      if (animation === "crouch_walk") {
        return;
      }
      setAnimation("crouch_walk");
    } else if (isCrouching && moveBackward) {
      if (animation === "crouch_walk_back") {
        return;
      }
      setAnimation("crouch_walk_back");
    } else if (isCrouching && moveLeft) {
      if (animation === "crouch_walk_right") {
        return;
      }
      setAnimation("crouch_walk_right");
    } else if (isCrouching && moveRight) {
      if (animation === "crouch_walk_left") {
        return;
      }
      setAnimation("crouch_walk_left");
    } else if (moveForward) {
      if (
        (isRunning && animation === "run") ||
        (!isRunning && animation === "walk")
      ) {
        return;
      }
      setAnimation(isRunning ? "run" : "walk");
    } else if (moveBackward) {
      if (
        (isRunning && animation === "run_back") ||
        (!isRunning && animation === "walk_back")
      ) {
        return;
      }
      setAnimation(isRunning ? "run_back" : "walk_back");
    } else if (moveLeft) {
      if (
        (isRunning && animation === "left_strafe") ||
        (!isRunning && animation === "left_strafe_walk")
      ) {
        return;
      }
      setAnimation(isRunning ? "left_strafe" : "left_strafe_walk");
    } else if (moveRight) {
      if (
        (isRunning && animation === "right_strafe") ||
        (!isRunning && animation === "right_strafe_walk")
      ) {
        return;
      }
      setAnimation(isRunning ? "right_strafe" : "right_strafe_walk");
    } else if (isJumping) {
      if (animation === "jump") {
        return;
      }
      setAnimation("jump");
    } else if (isCrouching) {
      if (animation === "crouch") {
        return;
      }
      setAnimation("crouch");
    } else if (isDancing) {
      if (animation === "dance") {
        return;
      }
      setAnimation("dance");
    } else {
      if (animation === "idle") {
        return;
      }
      setAnimation("idle");
    }
  };

  useEffect(() => {
    if (mouthShape && mouthShape != "END") {
      setIsSpeaking(true);
    } else {
      setIsSpeaking(false);
    }
  }, [mouthShape]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "x") {
        setIsDancing(true);
        return;
      }
      if (isDancing) return;

      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setMoveForward(true);
          break;
        case "s":
        case "arrowdown":
          setMoveBackward(true);
          break;
        case "a":
        case "arrowleft":
          setMoveLeft(true);
          break;
        case "d":
        case "arrowright":
          setMoveRight(true);
          break;
        case "shift":
          setIsRunning(true);
          break;
        case " ":
          if (!isJumping) {
            setIsJumping(true);
            setYVelocity(0.2);
          }
          break;
        case "c":
          setIsCrouching(true);
          break;
        case "r":
          setRotateY(true);
          break;
        case "q":
          setRotateYA(true);
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "x") {
        setIsDancing(false);
        return;
      }
      if (isDancing) return;

      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setMoveForward(false);
          break;
        case "s":
        case "arrowdown":
          setMoveBackward(false);
          break;
        case "a":
        case "arrowleft":
          setMoveLeft(false);
          break;
        case "d":
        case "arrowright":
          setMoveRight(false);
          break;
        case "shift":
          setIsRunning(false);
          break;
        case "c":
          setIsCrouching(false);
          break;
        case "r":
          setRotateY(false);
          break;
        case "q":
          setRotateYA(false);
          break;
      }
    };
    const canvasContainer = sceneRef.current;
    if (canvasContainer) {
      canvasContainer.addEventListener("keydown", handleKeyDown);
      canvasContainer.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      if (canvasContainer) {
        canvasContainer.removeEventListener("keydown", handleKeyDown);
        canvasContainer.removeEventListener("keyup", handleKeyUp);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isRunning,
    isJumping,
    isDancing,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    isCrouching,
  ]);

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
