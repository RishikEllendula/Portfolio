"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Custom3DScene() {
  const outerMeshRef = React.useRef<THREE.Mesh>(null);
  const innerMeshRef = React.useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotate meshes slightly based on elapsed time for constant idle movement
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.z = t * 0.1;
      
      // Lerp rotation to track mouse pointer movements (looks at cursor)
      outerMeshRef.current.rotation.x = THREE.MathUtils.lerp(
        outerMeshRef.current.rotation.x,
        pointer.y * 0.8,
        0.05
      );
      outerMeshRef.current.rotation.y = THREE.MathUtils.lerp(
        outerMeshRef.current.rotation.y,
        pointer.x * 0.8,
        0.05
      );
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.2;
      innerMeshRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group>
      {/* Outer abstract shape - Torus Knot wireframe */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={outerMeshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.5, 0.45, 120, 16]} />
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            roughness={0.1}
            metalness={0.9}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Inner glowing core sphere */}
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={innerMeshRef} args={[0.7, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#06b6d4"
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={3}
            emissive="#06b6d4"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export function HeroCanvas3D() {
  return (
    <div className="relative h-[350px] w-full md:h-[480px] rounded-2xl overflow-hidden bg-radial-glow border border-border/30 bg-surface/10 backdrop-blur-[2px] shadow-2xl">
      {/* Dynamic backdrop elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        shadows
        className="h-full w-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.5} />
        
        {/* Colorful lighting setup to cast neon reflections */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
        <directionalLight position={[0, 5, 2]} intensity={0.8} color="#ffffff" />

        <Custom3DScene />
      </Canvas>
    </div>
  );
}
