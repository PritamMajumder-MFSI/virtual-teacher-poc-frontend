import { useGLTF } from "@react-three/drei";
import { abandonedBrickRoom } from "../../assets";
import { GroupProps } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three/src/Three.js";

export const AbandonedBrickRoomModel = ({ ...props }: {} & GroupProps) => {
  const { nodes, materials } = useGLTF(abandonedBrickRoom) as unknown as {
    nodes: {
      [key: string]: Mesh;
    };
    materials: {
      [key: string]: MeshStandardMaterial;
    };
  };
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.005}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes[
                  "Factory002_WindowsIndustrial-frontSolid-OpenWindows_Mat_0"
                ].geometry
              }
              material={
                materials["WindowsIndustrial-frontSolid-OpenWindows_Mat"]
              }
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes["Factory002_WindowsIndustrial-frontSolid_Mat_0"].geometry
              }
              material={materials["WindowsIndustrial-frontSolid_Mat"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes["Factory002_WindowsIndustrial-frontDoorclosed_Mat_0"]
                  .geometry
              }
              material={materials["WindowsIndustrial-frontDoorclosed_Mat"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes["Factory002_WindowsIndustrial-frontDoorOpen_Mat_0"]
                  .geometry
              }
              material={materials["WindowsIndustrial-frontDoorOpen_Mat"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes["Factory002_WindowsIndustrial-front_Mat_0"].geometry
              }
              material={materials["WindowsIndustrial-front_Mat"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Factory002_11_-_Default_0"].geometry}
              material={materials["11_-_Default"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Object001_20_-_Default_0"].geometry}
            material={materials["20_-_Default"]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(abandonedBrickRoom);
