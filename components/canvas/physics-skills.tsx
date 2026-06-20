"use client";

import * as React from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SkillItem {
  name: string;
  level: number;
}

// ─── Canvas Texture ───────────────────────────────────────────────────────────
function makeTexture(name: string): THREE.CanvasTexture {
  const SIZE = 512;
  const cvs = document.createElement("canvas");
  cvs.width = SIZE;
  cvs.height = SIZE;
  const ctx = cvs.getContext("2d")!;

  // White base
  ctx.fillStyle = "#f4f4fa";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Specular highlight (top-left — matches moncy.dev)
  const hi = ctx.createRadialGradient(
    SIZE * 0.3, SIZE * 0.26, SIZE * 0.01,
    SIZE * 0.36, SIZE * 0.32, SIZE * 0.43
  );
  hi.addColorStop(0, "rgba(255,255,255,0.97)");
  hi.addColorStop(0.4, "rgba(255,255,255,0.24)");
  hi.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hi;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Rim shadow
  const rim = ctx.createRadialGradient(
    SIZE / 2, SIZE / 2, SIZE * 0.26,
    SIZE / 2, SIZE / 2, SIZE / 2
  );
  rim.addColorStop(0, "rgba(0,0,0,0)");
  rim.addColorStop(1, "rgba(0,0,0,0.30)");
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Split name into two lines if it has spaces and is long
  const words = name.split(" ");
  let lines = [name];
  if (name.length > 8 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    lines = [
      words.slice(0, mid).join(" "),
      words.slice(mid).join(" ")
    ];
  }

  // Slightly smaller font size to fit beautifully and look clean
  const fs = lines.length > 1 ? 32 : name.length > 8 ? 36 : 46;
  ctx.font = `900 ${fs}px Inter,ui-sans-serif,system-ui,sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 8;
  ctx.fillStyle = "rgba(12,10,26,0.84)";

  if (lines.length === 1) {
    ctx.fillText(lines[0], SIZE / 2, SIZE / 2, SIZE - 40);
  } else {
    const lineHeight = fs * 1.15;
    ctx.fillText(lines[0], SIZE / 2, SIZE / 2 - lineHeight / 2, SIZE - 40);
    ctx.fillText(lines[1], SIZE / 2, SIZE / 2 + lineHeight / 2, SIZE - 40);
  }
  ctx.shadowBlur = 0;

  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  return tex;
}

// ─── Pure-JS simulation state ─────────────────────────────────────────────────
interface BallState {
  pos: THREE.Vector3;   // world position
  vel: THREE.Vector3;   // world velocity
  angle: THREE.Euler;   // accumulated rotation (visual only)
  avel: THREE.Vector3;  // angular velocity
  homePos: THREE.Vector3; // anchor position
}

function createBalls(items: SkillItem[], radius: number): BallState[] {
  const count = items.length;
  const home = new THREE.Vector3(0, 0, 0);

  return Array.from({ length: count }, (_, i) => {
    // Spawn dispersed slightly around the center to allow physics forces to separate them naturally
    const angle = (i / count) * Math.PI * 2;
    const r = radius * 0.45;
    return {
      pos: new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        0
      ),
      vel: new THREE.Vector3(0, 0, 0),
      angle: new THREE.Euler(0, Math.PI * 1.5, 0), // Start facing front (270 deg on Y)
      avel: new THREE.Vector3(0, 0, 0),
      homePos: home,
    };
  });
}

// ─── Single Ball Mesh ─────────────────────────────────────────────────────────
interface BallProps {
  meshRef: (el: THREE.Mesh | null) => void;
  radius: number;
  texture: THREE.CanvasTexture | null;
}

const Ball = React.memo(function Ball({
  meshRef,
  radius,
  texture,
}: BallProps) {
  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[radius, 40, 40]} />
      <meshPhysicalMaterial
        color="#efeff6"
        map={texture ?? undefined}
        roughness={0.10}
        metalness={0.03}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
});

// ─── Scene — runs physics loop & holds all balls ──────────────────────────────
function Scene({
  items,
  simKey,
}: {
  items: SkillItem[];
  simKey: number;
}) {
  const { viewport, pointer } = useThree();

  // Radius tuned to viewport
  const radius = React.useMemo(() => {
    if (viewport.width < 8)  return 0.82;
    if (viewport.width < 12) return 1.00;
    return 1.14;
  }, [viewport.width]);

  // Physics state — reset when items, simKey, or radius changes
  const balls = React.useMemo(
    () => createBalls(items, radius),
    [items, simKey, radius]
  );

  // Canvas textures — one per skill
  const textures = React.useMemo(
    () => items.map((item) => makeTexture(item.name)),
    [items]
  );

  // Mouse speed, velocity vector, and position tracking in world space
  const mouseWorld = React.useRef(new THREE.Vector3(9999, 9999, 0));
  const lastMouse = React.useRef(new THREE.Vector3(0, 0, 0));
  const mouseVel = React.useRef(new THREE.Vector3(0, 0, 0));
  const mouseSpeed = React.useRef(0);
  const hasMoved = React.useRef(false);

  // Mesh reference array for direct access in useFrame
  const meshRefs = React.useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, rawDt) => {
    // Cap dt so a tab-switch doesn't explode velocities
    const dt = Math.min(rawDt, 0.033);

    // Update mouse world pos every frame
    mouseWorld.current.set(
      (pointer.x * viewport.width)  / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    const mouse = mouseWorld.current;

    // Track mouse speed/velocity vector
    let currentSpeed = 0;
    if (!hasMoved.current) {
      lastMouse.current.copy(mouse);
      hasMoved.current = true;
    } else {
      mouseVel.current.copy(mouse).sub(lastMouse.current).divideScalar(dt);
      currentSpeed = mouseVel.current.length();
      lastMouse.current.copy(mouse);
    }
    // Lerp velocity vector and speed to keep transitions smooth
    mouseSpeed.current = THREE.MathUtils.lerp(mouseSpeed.current, currentSpeed, 0.12);
    if (mouseSpeed.current < 0.05) {
      mouseSpeed.current = 0;
      mouseVel.current.set(0, 0, 0);
    }

    const ATTRACT   = 1.8;   // tight magnet pull to origin (0, 0, 0)
    const DAMPING   = 0.94;  // low damping for fluid sliding motion
    const MOUSE_R   = radius * 2.2;
    const MOUSE_F   = 32.0;  // strong swipe/repulsion base force

    const tmp = new THREE.Vector3();
    const tmpHome = new THREE.Vector3();

    // Scale repulsion force based on mouse speed (0 if stationary)
    const speedFactor = Math.min(mouseSpeed.current * 0.15, 1.5);
    const activeMouseForce = MOUSE_F * speedFactor;

    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];

      // ── Central/Home attraction with dynamic idle bobbing ──
      const time = state.clock.getElapsedTime();
      const bobX = Math.sin(time * 1.2 + i * 0.7) * 0.04;
      const bobY = Math.cos(time * 1.5 + i * 0.9) * 0.04;

      tmpHome.copy(b.homePos);
      tmpHome.x += bobX;
      tmpHome.y += bobY;

      const toHome = tmp.copy(tmpHome).sub(b.pos);
      toHome.z = 0;
      
      // Soften attraction pull when close to home to prevent shivering/fighting in cluster
      const distToHome = toHome.length();
      let currentAttract = ATTRACT;
      if (distToHome < radius * 2.5) {
        currentAttract = ATTRACT * (distToHome / (radius * 2.5));
      }
      b.vel.addScaledVector(toHome, currentAttract * dt);

      // ── Mouse repulsion & swipe momentum transfer ──
      if (activeMouseForce > 0) {
        tmp.copy(b.pos).sub(mouse);
        tmp.z = 0;
        const md = tmp.length();
        if (md < MOUSE_R && md > 0.001) {
          // Radial push
          const radialStrength = (1 - md / MOUSE_R) * activeMouseForce;
          b.vel.addScaledVector(tmp.normalize(), radialStrength * dt);

          // Directional momentum transfer (swipe effect)
          const swipeStrength = (1 - md / MOUSE_R) * 0.35;
          b.vel.addScaledVector(mouseVel.current, swipeStrength * dt);

          // Inject spin from mouse swipe!
          const mouseSpin = mouseVel.current.length() * (1 - md / MOUSE_R) * 0.15;
          b.avel.x += mouseSpin * (Math.random() - 0.5);
          b.avel.y += mouseSpin * (Math.random() - 0.5);
        }
      }

      // ── Ball–ball elastic collisions ──
      for (let j = i + 1; j < balls.length; j++) {
        const bj = balls[j];
        tmp.copy(b.pos).sub(bj.pos);
        tmp.z = 0;
        const dist = tmp.length();
        const minD = radius * 2.0;

        if (dist < minD && dist > 0.001) {
          tmp.normalize();
          
          // Resolve a tiny fraction of overlap to prevent high-frequency jitter/shivering
          const overlap = minD - dist;
          b.pos.addScaledVector(tmp, overlap * 0.15);
          bj.pos.addScaledVector(tmp, -overlap * 0.15);

          // Relative velocity along collision normal
          const relVel = new THREE.Vector3().copy(b.vel).sub(bj.vel);
          const speedAlongNormal = relVel.dot(tmp);

          if (speedAlongNormal < 0) {
            // Elastic collision bounce impulse
            const restitution = 0.65;
            const impulse = -(1 + restitution) * speedAlongNormal;
            b.vel.addScaledVector(tmp, impulse * 0.5);
            bj.vel.addScaledVector(tmp, -impulse * 0.5);

            // Spin from impact
            const spin = impulse * 0.3;
            b.avel.x  += spin * (Math.random() - 0.5);
            b.avel.y  += spin * (Math.random() - 0.5);
            bj.avel.x += spin * (Math.random() - 0.5);
            bj.avel.y += spin * (Math.random() - 0.5);
          }
        }
      }

      // ── Container border collision bounce ──
      const pad = radius * 1.05;
      const borderX = (viewport.width / 2) - pad;
      const borderY = (viewport.height / 2) - pad;

      if (b.pos.x > borderX) {
        b.pos.x = borderX;
        b.vel.x *= -0.7;
      } else if (b.pos.x < -borderX) {
        b.pos.x = -borderX;
        b.vel.x *= -0.7;
      }

      if (b.pos.y > borderY) {
        b.pos.y = borderY;
        b.vel.y *= -0.7;
      } else if (b.pos.y < -borderY) {
        b.pos.y = -borderY;
        b.vel.y *= -0.7;
      }

      // ── Damp & integrate ──
      b.vel.multiplyScalar(DAMPING);
      b.pos.addScaledVector(b.vel, 1);

      // Keep Z flat for clean 2D layering
      b.pos.z *= 0.88;
      b.vel.z *= 0.5;

      // ── Rotate visual texture spin ──
      b.avel.multiplyScalar(0.92);
      b.angle.x += b.avel.x * dt;
      b.angle.y += b.avel.y * dt;

      // Restoring rotation: only when the ball is nearly stationary (settling)
      const speed = b.vel.length();

      // Roll based on linear velocity (rolling physics) - fade out when settling to let alignment win
      const rollScale = speed >= 0.25 ? 1.0 : speed / 0.25;
      if (rollScale > 0.01) {
        const ROLL_FACTOR = 0.75 * rollScale;
        b.angle.x -= b.vel.y * ROLL_FACTOR;
        b.angle.y += b.vel.x * ROLL_FACTOR;
      }

      if (speed < 0.25) {
        const alignFactor = (1 - speed / 0.25) * 0.12;
        
        // Shortest path interpolation using atan2
        const diffX = 0 - b.angle.x;
        const normDiffX = Math.atan2(Math.sin(diffX), Math.cos(diffX));
        b.angle.x += normDiffX * alignFactor;

        // Target rotation y = Math.PI * 1.5 so the name faces the front camera straight
        const diffY = (Math.PI * 1.5) - b.angle.y;
        const normDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
        b.angle.y += normDiffY * alignFactor;

        // Target rotation z = 0 to prevent tilting
        const diffZ = 0 - b.angle.z;
        const normDiffZ = Math.atan2(Math.sin(diffZ), Math.cos(diffZ));
        b.angle.z += normDiffZ * alignFactor;
        
        // Gently clear angular velocity
        b.avel.multiplyScalar(1 - alignFactor);
      }

      // ── Update 3D Mesh direct reference ──
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.copy(b.pos);
        mesh.rotation.copy(b.angle);
      }
    }
  });

  return (
    <>
      {balls.map((state, idx) => (
        <Ball
          key={`${items[idx]?.name ?? idx}-${simKey}`}
          meshRef={(el) => {
            meshRefs.current[idx] = el;
          }}
          radius={radius}
          texture={textures[idx] ?? null}
        />
      ))}
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function PhysicsSkillsCanvas({ items }: { items: SkillItem[] }) {
  const [simKey, setSimKey] = React.useState(0);

  React.useEffect(() => {
    setSimKey((k) => k + 1);
  }, [items]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] cursor-grab active:cursor-grabbing"
      style={{
        background:
          "radial-gradient(ellipse 68% 55% at 30% 28%, rgba(82,66,172,0.42) 0%, rgba(28,20,64,0.20) 44%, #07070e 70%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        className="h-full w-full"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // transparent — CSS gradient shows through
        }}
      >
        {/* Lighting tuned for glossy porcelain spheres */}
        <ambientLight intensity={0.55} color="#e6e8ff" />
        <pointLight position={[-4, 7, 5]}  intensity={8}   color="#ffffff" />
        <pointLight position={[ 5, 2, 4]}  intensity={2.0} color="#c8d4ff" />
        <pointLight position={[ 0,-5,-4]}  intensity={0.8} color="#4040bb" />

        <Scene key={simKey} items={items} simKey={simKey} />
      </Canvas>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[10px] font-mono tracking-[0.2em] uppercase text-white/25">
        Move cursor to push
      </p>
    </div>
  );
}
