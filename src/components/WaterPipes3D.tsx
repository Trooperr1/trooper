import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Individual Pipe Component
 */
function Pipe({ position, rotation, length }: { position: [number, number, number]; rotation: [number, number, number]; length: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle pulsing effect
      meshRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.3, 0.3, length, 32]} />
      <meshStandardMaterial
        color="#1890ff"
        metalness={0.8}
        roughness={0.2}
        emissive="#0050b3"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/**
 * Water Droplet Component
 */
function WaterDroplet({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 1 + Math.random() * 2, []);

  useFrame(() => {
    if (meshRef.current) {
      // Falling animation
      meshRef.current.position.y -= 0.02 * speed;
      if (meshRef.current.position.y < -8) {
        meshRef.current.position.y = 8;
      }
      // Slight rotation
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.y += 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#00bfff"
          metalness={0.3}
          roughness={0.1}
          transparent
          opacity={0.8}
          emissive="#00bfff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

/**
 * Pipe Network Component
 */
function PipeNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.2;
    }
  });

  // Generate water droplets
  const droplets = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main vertical pipes */}
      <Pipe position={[-4, 0, 0]} rotation={[0, 0, 0]} length={10} />
      <Pipe position={[4, 0, 0]} rotation={[0, 0, 0]} length={10} />

      {/* Horizontal connecting pipes */}
      <Pipe position={[0, 3, 0]} rotation={[0, 0, Math.PI / 2]} length={8} />
      <Pipe position={[0, -2, 0]} rotation={[0, 0, Math.PI / 2]} length={8} />

      {/* Diagonal pipes */}
      <Pipe position={[-2, 1, -2]} rotation={[0, 0, Math.PI / 4]} length={6} />
      <Pipe position={[2, -1, 2]} rotation={[0, 0, -Math.PI / 4]} length={6} />

      {/* Additional depth pipes */}
      <Pipe position={[0, 0, -3]} rotation={[Math.PI / 2, 0, 0]} length={8} />
      <Pipe position={[0, 2, 2]} rotation={[Math.PI / 2, 0, 0]} length={6} />

      {/* Water droplets */}
      {droplets.map((droplet) => (
        <WaterDroplet key={droplet.id} position={droplet.position} />
      ))}

      {/* Ambient light effects */}
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#1890ff" />
      <pointLight position={[0, 0, -5]} intensity={0.3} color="#00bfff" />
    </group>
  );
}

/**
 * Main 3D Water Pipes Scene Component
 */
export function WaterPipes3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#1890ff" />
        <spotLight position={[0, 15, 0]} angle={0.3} intensity={0.5} color="#00bfff" />

        {/* Pipe Network */}
        <PipeNetwork />

        {/* Controls - subtle auto-rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Background */}
        <color attach="background" args={['#0a0f19']} />
        <fog attach="fog" args={['#0a0f19', 15, 30]} />
      </Canvas>
    </div>
  );
}
