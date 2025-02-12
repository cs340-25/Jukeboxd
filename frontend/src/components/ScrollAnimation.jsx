import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree, Canvas } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

function AnimatedModel() {
  const mesh = useRef()
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    const scrollProgress = scroll.offset // Value between 0 and 1
    
    // Rotate based on scroll position
    mesh.current.rotation.x = scrollProgress * Math.PI * 2
    mesh.current.rotation.y = scrollProgress * Math.PI * 2
    
    // Scale based on scroll
    const scale = 1 + scrollProgress * 0.5
    mesh.current.scale.set(scale, scale, scale)
    
    // Change color based on scroll
    mesh.current.material.color.setHSL(scrollProgress, 0.5, 0.5)
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function ScrollAnimation() {
  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedModel />
      </Canvas>
    </div>
  )
}

export default ScrollAnimation 