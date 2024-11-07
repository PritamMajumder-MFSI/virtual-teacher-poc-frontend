import { useAnimations, useGLTF } from "@react-three/drei";
import { avatarAnimationsGlb, avatarGlb } from "../../assets";
import { Group } from "three";
import { useEffect, useRef, useState } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import correspondings from "../../utils/correspondings";
import * as THREE from "three";
import { TAvatarModel } from "../../types/gltfTypes";

export const AvatarModel = ({
  mouthShape,
  ...props
}: {
  mouthShape: string;
} & GroupProps) => {
  const morphTargetSmoothing = 0.75;
  const group = useRef<Group<THREE.Object3DEventMap>>(null);
  const { animations } = useGLTF(avatarAnimationsGlb);
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState(
    animations.find((a) => a.name === "idle") ? "idle" : animations[0].name
  );
  const { nodes, materials } = useGLTF(avatarGlb) as unknown as TAvatarModel;

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  useEffect(() => {
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
    } else {
      setAnimation("idle");
    }
  }, [isSpeaking]);
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

  useFrame(() => {
    if (group.current && moveForward) {
      group.current.position.z -= 0.05;
      if (group.current.position.z < -5) {
        group.current.position.z = 0;
      }
    }
    changeMouthShape(mouthShape);
  });
  useEffect(() => {
    if (mouthShape && mouthShape != "END") {
      setIsSpeaking(true);
    } else {
      setIsSpeaking(false);
    }
  }, [mouthShape]);
  const [moveForward, setMoveForward] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "w" || event.key === "ArrowUp") {
        setMoveForward(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "w" || event.key === "ArrowUp") {
        setMoveForward(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
