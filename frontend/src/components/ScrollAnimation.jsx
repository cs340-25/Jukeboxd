import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape({ scrollY }) {
  const meshRef = useRef()
  const rotationSpeed = 0.003
  const scrollEffect = 0.0005

  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation regardless of scroll
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed

      // Subtle scale effect based on scroll
      const scale = 1 + Math.sin(scrollY.current * scrollEffect) * 0.2
      meshRef.current.scale.set(scale, scale, scale)

      // Color variation based on scroll
      const hue = (scrollY.current * 0.0005) % 1
      meshRef.current.material.color.setHSL(hue, 0.5, 0.5)
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial 
        metalness={0.5}
        roughness={0.5}
        envMapIntensity={1}
      />
    </mesh>
  )
}

export default function ScrollAnimation() {
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      opacity: 0.8,
    }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <spotLight 
          position={[-10, -10, -10]} 
          angle={0.15} 
          penumbra={1} 
        />
        <AnimatedShape scrollY={scrollY} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
        />
      </Canvas>
    </div>
  )
} 