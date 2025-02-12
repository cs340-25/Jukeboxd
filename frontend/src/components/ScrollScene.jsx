import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

function FloatingObjects() {
  const objectsRef = useRef([])
  const scroll = useScroll()
  
  // Create multiple objects with different positions
  const objects = Array.from({ length: 15 }, (_, i) => ({
    position: [
      Math.random() * 10 - 5,  // x between -5 and 5
      Math.random() * 10 - 2,  // y between -2 and 8
      Math.random() * 5 - 10   // z between -10 and -5
    ],
    rotation: Math.random() * Math.PI,
    speed: Math.random() * 0.5 + 0.2
  }))

  useFrame((state) => {
    const scrollOffset = scroll.offset // Value between 0 and 1
    
    objectsRef.current.forEach((mesh, i) => {
      if (!mesh) return
      
      // Rotate based on scroll and individual speed
      mesh.rotation.x = scrollOffset * Math.PI * 2 * objects[i].speed
      mesh.rotation.y = scrollOffset * Math.PI * 2 * objects[i].speed
      
      // Move up and down slightly
      mesh.position.y = objects[i].position[1] + Math.sin(state.clock.elapsedTime * objects[i].speed) * 0.3
      
      // Scale based on scroll
      const scale = 1 + scrollOffset * 0.2
      mesh.scale.set(scale, scale, scale)
    })
  })

  return (
    <group>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          ref={el => objectsRef.current[i] = el}
          position={obj.position}
        >
          {/* Create a vinyl record shape */}
          <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
          <meshStandardMaterial 
            color="#6B46C1"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

function ScrollScene() {
  return (
    <div className="scroll-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingObjects />
      </Canvas>
    </div>
  )
}

export default ScrollScene 