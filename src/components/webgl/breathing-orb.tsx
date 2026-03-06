"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneWrapper } from "./scene-wrapper";

// 4-7-8 breathing pattern: inhale 4s, hold 7s, exhale 8s = 19s cycle
const CYCLE_DURATION = 19;
const INHALE = 4;
const HOLD = 7;

const vertexShader = `
  uniform float uScale;
  uniform float uTime;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vUv = uv;
    vec3 pos = position * uScale;

    // Subtle vertex displacement for organic feel
    float noise = sin(pos.x * 3.0 + uTime * 0.5) * cos(pos.y * 2.5 + uTime * 0.3) * 0.05;
    pos += normal * noise;

    vDist = length(pos.xy);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  uniform float uScale;
  uniform float uTime;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center) * 2.0;

    vec3 color = mix(uColorInner, uColorOuter, dist);

    // Soft glow pulse
    float glow = 1.0 - smoothstep(0.0, 1.0, dist);
    float pulse = sin(uTime * 0.5) * 0.1 + 0.9;
    float alpha = glow * pulse * 0.8;

    gl_FragColor = vec4(color, alpha);
  }
`;

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uScale: { value: 1.0 },
    uTime: { value: 0 },
    uColorInner: { value: new THREE.Color("#78BFBC") },
    uColorOuter: { value: new THREE.Color("#FFD6AD") },
  });

  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
    const t = uniforms.current.uTime.value % CYCLE_DURATION;

    let scale: number;
    if (t < INHALE) {
      // Inhale: expand 0.8 → 1.3
      const p = t / INHALE;
      scale = 0.8 + 0.5 * smoothStep(p);
    } else if (t < INHALE + HOLD) {
      // Hold
      scale = 1.3;
    } else {
      // Exhale: contract 1.3 → 0.8
      const p = (t - INHALE - HOLD) / (CYCLE_DURATION - INHALE - HOLD);
      scale = 1.3 - 0.5 * smoothStep(p);
    }

    uniforms.current.uScale.value = scale;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

function smoothStep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function BreathingOrb() {
  return (
    <SceneWrapper opacity={0.4}>
      <Orb />
    </SceneWrapper>
  );
}
