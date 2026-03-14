"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function Node({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
    </mesh>
  )
}

export default function AIFactory3D() {
  return (
    <div className="h-[400px] mt-10 rounded-xl border border-zinc-800">

      <Canvas camera={{ position: [0, 0, 8] }}>

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Node position={[-3,0,0]} />
        <Node position={[-1,0,0]} />
        <Node position={[1,0,0]} />
        <Node position={[3,0,0]} />

        <OrbitControls enableZoom={false} />

      </Canvas>

    </div>
  )
}