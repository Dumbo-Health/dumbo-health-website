"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneWrapper } from "./scene-wrapper";

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Irregular wave — disrupted sleep breathing
    float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
    float wave2 = sin(pos.x * 3.5 + uTime * 1.2) * 0.08;
    float wave3 = cos(pos.x * 1.2 + uTime * 0.4) * 0.12;
    float disruption = sin(uTime * 0.3) * sin(pos.x * 5.0 + uTime * 2.0) * 0.06;

    pos.z = wave1 + wave2 + wave3 + disruption;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorDeep;
  uniform vec3 uColorAccent;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float t = smoothstep(-0.3, 0.3, vElevation);
    vec3 color = mix(uColorDeep, uColorAccent, t);
    float alpha = 0.6 + 0.4 * t;
    gl_FragColor = vec4(color, alpha);
  }
`;

function Wave() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColorDeep: { value: new THREE.Color("#031F3D") },
    uColorAccent: { value: new THREE.Color("#78BFBC") },
  });

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[8, 4, 64, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function WaveDistortion() {
  return (
    <SceneWrapper opacity={0.35}>
      <Wave />
    </SceneWrapper>
  );
}
