import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { AvatarModel } from "../models/AvatarModel"
import { OrbitControls } from "@react-three/drei"


const AvatarScene = () => {
  return (
    <>
    <Canvas
       camera={{ position: [2, 0, 12.25], fov: 15 }}
       style={{
          backgroundColor: '#f9f9',
          width: '100vw',
          height: '100vh',
       }}
    >
       <ambientLight intensity={1.25} />
       <ambientLight intensity={0.1} />
       <directionalLight intensity={0.4} />
       <Suspense fallback={null}>
       <AvatarModel 
        position={[0,-0.5,0]}
          receiveShadow
        />
       </Suspense>
       <OrbitControls />
    </Canvas>
  </>
  )
}

export default AvatarScene