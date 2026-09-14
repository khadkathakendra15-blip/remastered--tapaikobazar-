"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* A low-poly electric van built from primitives — no external model needed.
   Styled as a glossy white EV minivan so it reads well under the studio
   spotlights, on a slow turntable rotation for the "reveal". */

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      {/* tyre */}
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
        <meshStandardMaterial color="#111318" metalness={0.4} roughness={0.7} />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 24]} />
        <meshStandardMaterial color="#c9ccd2" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial color="#2a2d33" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function VanModel() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.28;
  });

  const paint = (
    <meshStandardMaterial color="#eef1f4" metalness={0.6} roughness={0.28} envMapIntensity={1.1} />
  );

  return (
    <group ref={g} position={[0, -0.15, 0]} rotation={[0, -0.5, 0]}>
      {/* main body */}
      <RoundedBox args={[3.9, 1.05, 1.72]} radius={0.22} smoothness={5} position={[0, 0.78, 0]} castShadow>
        {paint}
      </RoundedBox>

      {/* dark lower cladding / skirt */}
      <RoundedBox args={[3.92, 0.3, 1.74]} radius={0.1} smoothness={4} position={[0, 0.34, 0]}>
        <meshStandardMaterial color="#26282d" metalness={0.5} roughness={0.6} />
      </RoundedBox>

      {/* cabin / greenhouse */}
      <RoundedBox args={[3.15, 0.9, 1.6]} radius={0.2} smoothness={5} position={[0, 1.5, 0.02]} castShadow>
        {paint}
      </RoundedBox>

      {/* wrap-around dark glass (pokes out past the cabin as side windows) */}
      <RoundedBox args={[2.55, 0.58, 1.66]} radius={0.12} smoothness={5} position={[0, 1.55, 0.02]}>
        <meshStandardMaterial color="#0b1420" metalness={0.9} roughness={0.08} envMapIntensity={1.4} />
      </RoundedBox>

      {/* roof */}
      <RoundedBox args={[2.95, 0.16, 1.5]} radius={0.08} smoothness={4} position={[0, 2.02, 0.02]}>
        {paint}
      </RoundedBox>

      {/* front light bar (emissive, EV signature) */}
      <mesh position={[-1.97, 0.95, 0]}>
        <boxGeometry args={[0.06, 0.14, 1.28]} />
        <meshStandardMaterial color="#eaf6ff" emissive="#bfe6ff" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      {/* rear light bar */}
      <mesh position={[1.97, 0.95, 0]}>
        <boxGeometry args={[0.06, 0.13, 1.24]} />
        <meshStandardMaterial color="#ff5a5f" emissive="#ff2b39" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* subtle brand strip on the side (red accent) */}
      <mesh position={[0, 0.62, 0.865]}>
        <boxGeometry args={[2.6, 0.05, 0.02]} />
        <meshStandardMaterial color="#FF4D5E" emissive="#FF4D5E" emissiveIntensity={0.35} />
      </mesh>

      {/* wheels */}
      <Wheel position={[-1.28, 0.42, 0.9]} />
      <Wheel position={[-1.28, 0.42, -0.9]} />
      <Wheel position={[1.28, 0.42, 0.9]} />
      <Wheel position={[1.28, 0.42, -0.9]} />
    </group>
  );
}

export function Van3D({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={className}
      shadows={false}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [5.2, 2.1, 5.8], fov: 30 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.75, 0)}
    >
      <ambientLight intensity={0.35} />
      {/* key light from the ceiling, matching the studio spotlights' cool tone */}
      <spotLight position={[0, 8, 2]} angle={0.6} penumbra={1} intensity={2.2} color="#dfeaff" />
      <pointLight position={[-5, 2, -3]} intensity={0.7} color="#5f7dff" />
      <pointLight position={[5, 1.5, 3]} intensity={0.5} color="#ffffff" />

      <VanModel />

      {/* soft contact shadow on the studio floor */}
      <ContactShadows position={[0, -0.16, 0]} opacity={0.55} scale={12} blur={2.6} far={5} resolution={512} color="#000000" />

      {/* in-memory studio env for glossy paint reflections (no external HDR) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[7, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.3} position={[-5, 2, 1]} scale={[3, 5, 1]} color="#aecbff" />
        <Lightformer intensity={1.3} position={[5, 2, 1]} scale={[3, 5, 1]} color="#ffffff" />
        <Lightformer intensity={0.8} position={[0, 3, -4]} scale={[8, 3, 1]} color="#ffd9b0" />
      </Environment>
    </Canvas>
  );
}
