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

// FL and TX approximate normalized positions on a US-ish map
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float ripple(vec2 uv, vec2 center, float time, float delay) {
    float dist = length(uv - center);
    float t = mod(time - delay, 4.0);
    float radius = t * 0.15;
    float ring = smoothstep(radius - 0.02, radius, dist) - smoothstep(radius, radius + 0.02, dist);
    float fade = 1.0 - smoothstep(0.0, 0.6, radius);
    return ring * fade;
  }

  void main() {
    vec2 uv = vUv;

    // FL position (southeast) and TX position (south-central)
    vec2 fl = vec2(0.65, 0.35);
    vec2 tx = vec2(0.35, 0.35);

    float r = 0.0;
    // Multiple ripple waves with staggered timing
    r += ripple(uv, fl, uTime, 0.0);
    r += ripple(uv, fl, uTime, 1.5);
    r += ripple(uv, fl, uTime, 3.0);
    r += ripple(uv, tx, uTime, 0.5);
    r += ripple(uv, tx, uTime, 2.0);
    r += ripple(uv, tx, uTime, 3.5);

    // Center dots
    float dotFL = smoothstep(0.015, 0.01, length(uv - fl));
    float dotTX = smoothstep(0.015, 0.01, length(uv - tx));

    vec3 color = uColor;
    float alpha = r * 0.6 + (dotFL + dotTX) * 0.8;

    gl_FragColor = vec4(color, alpha);
  }
`;

function Ripples() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#78BFBC") },
  });

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[8, 5, 1, 1]} />
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

export function RippleMap() {
  return (
    <SceneWrapper opacity={0.5}>
      <Ripples />
    </SceneWrapper>
  );
}
