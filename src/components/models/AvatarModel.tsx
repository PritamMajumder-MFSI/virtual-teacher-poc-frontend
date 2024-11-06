
import { useGLTF } from '@react-three/drei'
import { avatarGlb } from '../../assets'
import { Group,  MeshStandardMaterial, Object3DEventMap, SkinnedMesh } from 'three'
import { useRef } from 'react'

export const AvatarModel = ({ ...props }) =>  {
  const { nodes, materials } = useGLTF(avatarGlb) as unknown as {
    nodes: {
      Hips: Group
      EyeLeft: SkinnedMesh
      EyeRight: SkinnedMesh
      Wolf3D_Head: SkinnedMesh
      Wolf3D_Teeth: SkinnedMesh
      Wolf3D_Hair: SkinnedMesh
      Wolf3D_Glasses: SkinnedMesh
      Wolf3D_Body: SkinnedMesh
      Wolf3D_Outfit_Bottom: SkinnedMesh
      Wolf3D_Outfit_Footwear: SkinnedMesh
      Wolf3D_Outfit_Top: SkinnedMesh
    }
    materials: {
      Wolf3D_Eye: MeshStandardMaterial
      Wolf3D_Skin: MeshStandardMaterial
      Wolf3D_Teeth: MeshStandardMaterial
      Wolf3D_Hair: MeshStandardMaterial
      Wolf3D_Glasses: MeshStandardMaterial
      Wolf3D_Body: MeshStandardMaterial
      Wolf3D_Outfit_Bottom: MeshStandardMaterial
      Wolf3D_Outfit_Footwear: MeshStandardMaterial
      Wolf3D_Outfit_Top: MeshStandardMaterial
    }
  }
  const group = useRef<Group<Object3DEventMap>>(null);

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
  )
}

useGLTF.preload(avatarGlb)

