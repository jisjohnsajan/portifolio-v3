"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Group, Mesh } from "three";

function Blob({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const wire = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (animate) {
      // Ease the whole group toward the pointer for a parallax feel.
      const { x, y } = state.pointer;
      group.current.rotation.y += (x * 0.4 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-y * 0.3 - group.current.rotation.x) * 0.05;
      if (wire.current) {
        wire.current.rotation.y -= delta * 0.15;
        wire.current.rotation.x += delta * 0.08;
      }
    }
  });

  return (
    <group ref={group}>
      <Float
        speed={animate ? 1.4 : 0}
        rotationIntensity={animate ? 0.5 : 0}
        floatIntensity={animate ? 0.8 : 0}
      >
        {/* Core distorted form */}
        <Icosahedron args={[1.35, 5]}>
          <MeshDistortMaterial
            color="#0d0d16"
            metalness={0.55}
            roughness={0.28}
            distort={animate ? 0.38 : 0.2}
            speed={animate ? 1.6 : 0}
          />
        </Icosahedron>

        {/* Techy wireframe shell */}
        <Icosahedron ref={wire} args={[1.85, 1]}>
          <meshBasicMaterial color="#4b6bff" wireframe transparent opacity={0.25} />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = !reduce && inView;

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={reduce ? "demand" : inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 5]} intensity={2.2} />
        <directionalLight position={[-5, -2, -3]} intensity={2.6} color="#4b6bff" />
        <pointLight position={[0, 0, 3]} intensity={8} color="#7c8cff" />
        <Blob animate={animate} />
      </Canvas>
    </div>
  );
}
