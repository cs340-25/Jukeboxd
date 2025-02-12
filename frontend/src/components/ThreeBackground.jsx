import React, { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'

function AnimatedSphere({ position, size, speed, color }) {
  const meshRef = useRef()
  const initialY = position[1]
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Slower bounce with larger amplitude
    meshRef.current.position.y = initialY + Math.sin(time * speed) * 1.5
    
    // Subtle size pulsing
    const scale = 1 + Math.sin(time * speed * 0.5) * 0.3
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <Float 
      speed={1}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="night" intensity={0.5} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      
      {/* Left side spheres */}
      <AnimatedSphere 
        position={[-8, 0, -2]} 
        size={1.2} 
        speed={0.3} 
        color="#1a1a1a" 
      />
      <AnimatedSphere 
        position={[-6, -3, -3]} 
        size={0.8} 
        speed={0.2} 
        color="#2a2a2a" 
      />
      
      {/* Right side spheres */}
      <AnimatedSphere 
        position={[8, 1, -4]} 
        size={1.5} 
        speed={0.25} 
        color="#333333" 
      />
      <AnimatedSphere 
        position={[6, -2, -5]} 
        size={1.0} 
        speed={0.15} 
        color="#404040" 
      />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="three-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
} 