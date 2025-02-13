import React, { useCallback } from 'react'
import { loadSlim } from "tsparticles-slim"
import Particles from "react-tsparticles"

function ParticlesBackground() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      className="particles-background"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        particles: {
          color: {
            value: "#1a237e",
          },
          links: {
            enable: true,
            color: "#1a237e",
            distance: 150,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            direction: "none",
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
      }}
    />
  )
}

export default ParticlesBackground 