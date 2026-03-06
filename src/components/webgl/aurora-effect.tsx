"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneWrapper } from "./scene-wrapper";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  // Simple noise function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;

    // Aurora bands
    float band1 = smoothstep(0.3, 0.5, uv.y + sin(uv.x * 4.0 + uTime * 0.3) * 0.1 + noise(uv * 3.0 + uTime * 0.1) * 0.15);
    float band2 = smoothstep(0.5, 0.7, uv.y + cos(uv.x * 3.0 + uTime * 0.2) * 0.12 + noise(uv * 2.5 + uTime * 0.15) * 0.1);
    float band3 = smoothstep(0.6, 0.85, uv.y + sin(uv.x * 5.0 + uTime * 0.25) * 0.08);

    float aurora = band1 * (1.0 - band2) * 0.6 + band2 * (1.0 - band3) * 0.4 + band3 * 0.2;

    // Shimmer
    float shimmer = noise(uv * 8.0 + uTime * 0.4) * 0.3;
    aurora += shimmer * aurora;

    // Color mixing
    float colorMix = sin(uv.x * 2.0 + uTime * 0.1) * 0.5 + 0.5;
    vec3 color;
    if (colorMix < 0.33) {
      color = mix(uColor1, uColor2, colorMix * 3.0);
    } else if (colorMix < 0.66) {
      color = mix(uColor2, uColor3, (colorMix - 0.33) * 3.0);
    } else {
      color = mix(uColor3, uColor1, (colorMix - 0.66) * 3.0);
    }

    float alpha = aurora * 0.7;
    gl_FragColor = vec4(color, alpha);
  }
`;

function Aurora() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#78BFBC") },
    uColor2: { value: new THREE.Color("#FF8361") },
    uColor3: { value: new THREE.Color("#FFD6AD") },
  });

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[10, 6, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function AuroraEffect() {
  return (
    <SceneWrapper opacity={0.5}>
      <Aurora />
    </SceneWrapper>
  );
}
