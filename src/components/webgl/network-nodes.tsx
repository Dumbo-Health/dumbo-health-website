"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneWrapper } from "./scene-wrapper";

const NODE_COUNT = 18;
const CONNECTION_DISTANCE = 2.5;

function Network() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);

  const nodePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      pos.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      );
    }
    return new Float32Array(pos);
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(NODE_COUNT * NODE_COUNT * 6),
    []
  );

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    // Update node positions with gentle drift
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      nodePositions[ix] += Math.sin(t * 0.3 + i) * delta * 0.1;
      nodePositions[ix + 1] += Math.cos(t * 0.25 + i * 1.3) * delta * 0.08;
      nodePositions[ix + 2] += Math.sin(t * 0.2 + i * 0.7) * delta * 0.05;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update line connections
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_DISTANCE) {
          linePositions[lineIdx++] = nodePositions[i * 3];
          linePositions[lineIdx++] = nodePositions[i * 3 + 1];
          linePositions[lineIdx++] = nodePositions[i * 3 + 2];
          linePositions[lineIdx++] = nodePositions[j * 3];
          linePositions[lineIdx++] = nodePositions[j * 3 + 1];
          linePositions[lineIdx++] = nodePositions[j * 3 + 2];
        }
      }
    }
    // Zero out remaining
    for (let i = lineIdx; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FF8361"
          size={0.12}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF8361"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export function NetworkNodes() {
  return (
    <SceneWrapper opacity={0.4}>
      <Network />
    </SceneWrapper>
  );
}
