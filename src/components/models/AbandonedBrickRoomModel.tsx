import { useGLTF } from "@react-three/drei";
import { abandonedBrickRoom } from "../../assets";
import { GroupProps } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three/src/Three.js";

export const AbandonedBrickRoomModel = ({ ...props }: {} & GroupProps) => {
  const { nodes, materials } = useGLTF(abandonedBrickRoom) as unknown as {
    nodes: {
      Object_2: Mesh;
    };
    materials: {
      material: MeshStandardMaterial;
    };
  };
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload(abandonedBrickRoom);
