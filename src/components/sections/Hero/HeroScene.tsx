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
  
  // Create a clone for the holographic overlay that stays in sync
  const holographicScene = useMemo(() => scene.clone(), [scene]);

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

    // Fallback if "upper" isn't found, try just "arm"
    if (!bones.current.left || !bones.current.right) {
      scene.traverse((obj) => {
        if (obj.name.toLowerCase().includes("left") && obj.name.toLowerCase().includes("arm")) {
          bones.current.left = obj;
        }
        if (obj.name.toLowerCase().includes("right") && obj.name.toLowerCase().includes("arm")) {
          bones.current.right = obj;
        }
      });
    }

    if (!astronautRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // 360 Degree Spin
    tl.to(astronautRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none"
    }, 0);

    // Raising Hands (Starts at 30%, peaks at 60%, holds till end)
    if (bones.current.left && bones.current.right) {
      tl.to(bones.current.left.rotation, {
        z: -Math.PI / 1.5, // Rotate left arm up
        x: -Math.PI / 4,
        ease: "power2.inOut"
      }, 0.3);
      
      tl.to(bones.current.right.rotation, {
        z: Math.PI / 1.5, // Rotate right arm up
        x: -Math.PI / 4,
        ease: "power2.inOut"
      }, 0.3);
    } else {
      // Fallback: scale or float intensity shift if bones aren't found
      tl.to(astronautRef.current.position, {
        y: 1,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0.4);
    }

    return () => {
      tl.kill();
    };
  }, [scene]);

  // Sync holographic clone bones every frame if they exist
  useFrame(() => {
    if (bones.current.left && bones.current.right) {
      holographicScene.traverse((obj) => {
        if (obj.name === bones.current.left?.name) {
          obj.rotation.copy(bones.current.left.rotation);
        }
        if (obj.name === bones.current.right?.name) {
          obj.rotation.copy(bones.current.right.rotation);
        }
      });
    }
  });

  // Mouse parallax logic
  useFrame((state) => {
    if (astronautRef.current) {
      const targetX = (mouse.x * viewport.width) / 10;
      const targetY = (mouse.y * viewport.height) / 10;
      
      // Floating animation offset + Mouse Parallax
      // We apply these to a nested group to avoid conflicting with GSAP's scroll rotation
      const group = astronautRef.current.children[0];
      if (group) {
        group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.05);
        group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.05);
        
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouse.x * 0.2, 0.05);
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -mouse.y * 0.1, 0.05);
      }
    }
  });

  return (
    <group ref={astronautRef}>
      <Float
        speed={1.5} 
        rotationIntensity={0.5} 
        floatIntensity={1}
        floatingRange={[-0.2, 0.2]}
      >
        <group scale={1.5} position={[0, -1, 0]} rotation={[0.2, Math.PI / 4, 0]}>
          <primitive object={scene} />
          {/* Holographic Wireframe Overlay */}
          <primitive object={holographicScene}>
            <meshBasicMaterial 
              color="#3B82F6" 
              wireframe 
              transparent 
              opacity={0.12} 
            />
          </primitive>
        </group>
      </Float>
    </group>
  );
}

function Nebula() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -10]} scale={[25, 25, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial
        color="#0A0A0F"
        speed={1.5}
        distort={0.4}
        radius={1}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z), 0.05);
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
      
      {/* Lighting for realistic space */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-5, -5, 10]} intensity={1.5} color="#3B82F6" />
      <spotLight position={[5, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#8B5CF6" />

      <Suspense fallback={null}>
        <Stars 
          radius={100} 
          depth={50} 
          count={7000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <Astronaut />
        <Nebula />
        
        <Environment preset="night" />
      </Suspense>

      <Rig />
    </Canvas>
  );
}
