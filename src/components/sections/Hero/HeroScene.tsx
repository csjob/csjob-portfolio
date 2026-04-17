"use client";

import { useRef, useMemo, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Stars, 
  Float, 
  useGLTF, 
  PerspectiveCamera, 
  Environment,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Astronaut() {
  const { scene } = useGLTF("/models/astronaut.glb");
  const astronautRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const isMobile = viewport.width < 10;
  const responsiveScale = isMobile ? 1.8 : 2.5;
  const startX = isMobile ? -viewport.width / 2 + 0.8 : -5;
  const endX = isMobile ? viewport.width / 2 - 0.8 : 5;

  // Bone references
  const bones = useRef<{ left: THREE.Object3D | null; right: THREE.Object3D | null }>({
    left: null,
    right: null
  });

  useLayoutEffect(() => {
    // Find bones in the original scene
    scene.traverse((obj) => {
      if (obj.type === "Bone" || obj.name.toLowerCase().includes("arm")) {
        if (obj.name.toLowerCase().includes("left") && obj.name.toLowerCase().includes("upper")) {
          bones.current.left = obj;
        }
        if (obj.name.toLowerCase().includes("right") && obj.name.toLowerCase().includes("upper")) {
          bones.current.right = obj;
        }
      }
    });

    if (!astronautRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // 1. Horizontal Path (Left -> Center -> Right)
    tl.fromTo(astronautRef.current.position, 
      { 
        x: startX, 
        z: isMobile ? -2.5 : -3.5, 
        y: isMobile ? 1 : 0 
      },
      { 
        x: endX, 
        z: isMobile ? -1 : -1.5, 
        y: isMobile ? -1 : -0.8, 
        ease: "none" 
      }, 
      0
    );

    // 2. The Fly-By (Center Zoom) - Adjusted slightly back for mobile
    tl.to(astronautRef.current.position, {
      z: isMobile ? 0.8 : 1.2, 
      duration: 0.4,
      ease: "power1.inOut"
    }, 0.3);
    
    tl.to(astronautRef.current.position, {
      z: isMobile ? -1 : -1.5,
      y: isMobile ? -0.5 : -0.8,
      duration: 0.3,
      ease: "power1.in"
    }, 0.7);

    // 3. Banking Tilt (rotation.z)
    tl.to(astronautRef.current.rotation, {
      z: isMobile ? 0.25 : 0.35,
      duration: 0.5,
      ease: "power2.inOut"
    }, 0);
    tl.to(astronautRef.current.rotation, {
      z: isMobile ? -0.25 : -0.35,
      duration: 0.5,
      ease: "power2.inOut"
    }, 0.5);

    // 4. 360 Degree Spin
    tl.to(astronautRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none"
    }, 0);

    // 5. Raising Hands (Peak at Stage 2 / Center)
    if (bones.current.left && bones.current.right) {
      tl.to([bones.current.left.rotation, bones.current.right.rotation], {
        x: -Math.PI / 3,
        ease: "power2.inOut",
      }, 0.35);

      tl.to(bones.current.left.rotation, {
        z: -Math.PI / 1.5,
        ease: "power2.inOut"
      }, 0.35);
      
      tl.to(bones.current.right.rotation, {
        z: Math.PI / 1.5,
        ease: "power2.inOut"
      }, 0.35);
    }

    return () => {
      tl.kill();
    };
  }, [scene, viewport.width, isMobile, startX, endX]);

  // Mouse parallax logic - significantly reduced for mobile
  useFrame((state) => {
    if (astronautRef.current) {
      const parallaxFactor = isMobile ? 20 : 10;
      const targetX = (mouse.x * viewport.width) / parallaxFactor;
      const targetY = (mouse.y * viewport.height) / parallaxFactor;
      
      const group = astronautRef.current.children[0];
      if (group) {
        group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.05);
        group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.05);
        
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouse.x * (isMobile ? 0.05 : 0.15), 0.05);
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -mouse.y * (isMobile ? 0.03 : 0.08), 0.05);
      }
    }
  });

  return (
    <group ref={astronautRef}>
      <Float
        speed={1.5} 
        rotationIntensity={0.5} 
        floatIntensity={0.8}
        floatingRange={[-0.15, 0.15]}
      >
        <group scale={responsiveScale} position={[0, -1, 0]} rotation={[0.2, Math.PI / 4, 0]}>
          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.4, mouse.y * 0.4, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#0A0A0F"]} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      
      {/* Boosted Lighting for Brighter Astronaut */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={4.5} color="#ffffff" />
      <pointLight position={[-5, 5, 10]} intensity={3.5} color="#3B82F6" />
      <spotLight position={[0, 20, 10]} angle={0.25} penumbra={1} intensity={5.0} color="#ffffff" />

      <Suspense fallback={null}>
        <Stars 
          radius={120} 
          depth={60} 
          count={9000} 
          factor={6} 
          saturation={0} 
          fade 
          speed={1.5} 
        />
        
        <Astronaut />
        
        <Environment preset="night" />
      </Suspense>

      <Rig />
    </Canvas>
  );
}
