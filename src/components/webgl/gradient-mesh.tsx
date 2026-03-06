"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneWrapper } from "./scene-wrapper";

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Gentle vertex displacement
    pos.z += sin(pos.x * 2.0 + uTime * 0.3) * 0.1;
    pos.z += cos(pos.y * 1.5 + uTime * 0.2) * 0.08;
    pos.z += sin((pos.x + pos.y) * 1.8 + uTime * 0.25) * 0.06;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  void main() {
    // Flowing gradient that shifts over time
    float t1 = sin(vUv.x * 3.0 + uTime * 0.15) * 0.5 + 0.5;
    float t2 = cos(vUv.y * 2.0 + uTime * 0.1) * 0.5 + 0.5;
    float blend = (t1 + t2) * 0.5;

    vec3 color;
    if (blend < 0.5) {
      color = mix(uColor1, uColor2, blend * 2.0);
    } else {
      color = mix(uColor2, uColor3, (blend - 0.5) * 2.0);
    }

    gl_FragColor = vec4(color, 0.6);
  }
`;

function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#F5E6D1") },
    uColor2: { value: new THREE.Color("#FFD6AD") },
    uColor3: { value: new THREE.Color("#FF8361") },
  });

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef} rotation={[-0.1, 0, 0]} position={[0, 0, -1]}>
      <planeGeometry args={[10, 6, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function GradientMesh() {
  return (
    <SceneWrapper opacity={0.3}>
      <GradientPlane />
    </SceneWrapper>
  );
}
