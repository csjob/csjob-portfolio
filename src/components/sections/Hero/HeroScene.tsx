"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Grid() {
  const gridRef = useRef<THREE.Group>(null);
  const gridSize = 15;
  const spacing = 1.2;

  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = -gridSize; i <= gridSize; i += 2) {
      for (let j = -gridSize; j <= gridSize; j += 2) {
        if (Math.abs(i) + Math.abs(j) > gridSize * 0.2) {
          pts.push([i * spacing, j * spacing, 0]);
        }
      }
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -2]}>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    // Deterministic pseudo-random to keep render pure.
    const pr = (n: number) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };

    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pr(i * 3.1 + 1) - 0.5) * 30;
      pos[i * 3 + 1] = (pr(i * 3.1 + 2) - 0.5) * 30;
      pos[i * 3 + 2] = (pr(i * 3.1 + 3) - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#0A0A0F"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={1} />
      <pointLight position={[-10, -10, 5]} color="#8B5CF6" intensity={0.5} />
      <Grid />
      <ParticleField />
    </Canvas>
  );
}
