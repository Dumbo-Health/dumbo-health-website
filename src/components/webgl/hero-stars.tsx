"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneWrapper } from "./scene-wrapper";

const PARTICLE_COUNT = 200;

const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.3 + aPhase) * 0.2;
    pos.y += cos(uTime * 0.2 + aPhase * 1.3) * 0.15;
    pos.z += sin(uTime * 0.15 + aPhase * 0.7) * 0.1;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    vAlpha = 0.4 + 0.6 * sin(uTime * 0.5 + aPhase * 2.0) * 0.5 + 0.5;
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
    float mix_factor = sin(uTime * 0.1) * 0.5 + 0.5;
    vec3 color = mix(uColorA, uColorB, mix_factor);
    gl_FragColor = vec4(color, alpha * 0.7);
  }
`;

function Stars() {
  const meshRef = useRef<THREE.Points>(null);
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color("#031F3D") },
    uColorB: { value: new THREE.Color("#78BFBC") },
  });

  const { positions, sizes, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    const ph = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sz[i] = Math.random() * 3 + 1;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, sizes: sz, phases: ph };
  }, []);

  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroStars() {
  return (
    <SceneWrapper opacity={0.5}>
      <Stars />
    </SceneWrapper>
  );
}
