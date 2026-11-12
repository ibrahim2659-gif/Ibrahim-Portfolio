import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../utils/audio';

// Reusable math helpers at module scope to eliminate per-frame garbage collection
const _targetEuler = new THREE.Euler();
const _targetQuat = new THREE.Quaternion();
const _mouseTarget = new THREE.Vector2(0, 0);
const _mouseCurrent = new THREE.Vector2(0, 0);

interface HeroScene3DProps {
  reducedMotion?: boolean;
}

export type SceneMode = 'quantum' | 'neural' | 'polyhedron';

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ reducedMotion = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<SceneMode>('quantum');
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Store mutable refs so animation loop can access latest states without rebuilding the scene
  const modeRef = useRef<SceneMode>('quantum');
  const wireframeRef = useRef<boolean>(false);
  const speedRef = useRef<number>(1);
  const reducedMotionRef = useRef<boolean>(reducedMotion);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    wireframeRef.current = wireframeOnly;
  }, [wireframeOnly]);

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as mandated by Three.js architectural guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear background for seamless CSS dark luxury integration
    renderer.setClearColor(0x000000, 0);
    container.replaceChildren(renderer.domElement);

    // Procedural ring markings texture
    const makeRingTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 512, 64);
        ctx.fillStyle = '#00D9FF';
        for (let i = 0; i < 512; i += 16) {
          const h = i % 64 === 0 ? 32 : 14;
          ctx.fillRect(i, 32 - h / 2, 3, h);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 1);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };
    const ringTexture = makeRingTexture();

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x080D1B, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00D9FF, 4.0);
    keyLight.position.set(5, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8B5CF6, 3.5);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    const topRimLight = new THREE.PointLight(0x176BFF, 5.0, 15);
    topRimLight.position.set(0, 4, -2);
    scene.add(topRimLight);

    // Group for all core entities
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central AI Core Group
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // Inner glowing energy sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00D9FF,
      emissive: 0x0088cc,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Faceted Holographic Icosahedron Shell
    const icoGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x176BFF,
      emissive: 0x080D1B,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
      transparent: true,
      opacity: 0.75,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Wireframe overlay for cyber lattice depth
    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const icoWireMesh = new THREE.Mesh(icoGeo, icoWireMat);
    coreGroup.add(icoWireMesh);

    // 2. Gimbal Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(2.0, 0.035, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x176BFF,
      emissive: 0x176BFF,
      emissiveIntensity: 0.9,
      roughness: 0.3,
      metalness: 0.9,
      map: ringTexture,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8B5CF6,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.95,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    rootGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(2.65, 0.015, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      transparent: true,
      opacity: 0.5,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    rootGroup.add(ring3);

    // 3. Floating Orbiting Data Nodes (Satellites)
    const nodeCount = 6;
    const nodeGeo = new THREE.OctahedronGeometry(0.12, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x00D9FF,
      emissive: 0x00D9FF,
      emissiveIntensity: 2.0,
      metalness: 0.9,
      roughness: 0.1,
    });
    const nodeGroup = new THREE.Group();
    rootGroup.add(nodeGroup);

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 2.35, Math.sin(angle * 2) * 0.4, Math.sin(angle) * 2.35);
      nodeGroup.add(mesh);
      nodes.push(mesh);
    }

    // 4. Background Nebula Particles
    const particleCount = isSoftwareGl ? 300 : 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x176BFF);
    const c2 = new THREE.Color(0x8B5CF6);
    const c3 = new THREE.Color(0x00D9FF);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorPick = Math.random();
      const col = colorPick < 0.4 ? c1 : colorPick < 0.75 ? c2 : c3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _mouseTarget.set(x, y);
    };

    const handlePointerLeave = () => {
      _mouseTarget.set(0, 0);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Continuous Animation Loop with Software WebGL pacing
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const currentSpeed = reducedMotionRef.current ? 0.2 : speedRef.current;

      // Mouse Parallax interpolation
      _mouseCurrent.x = THREE.MathUtils.damp(_mouseCurrent.x, _mouseTarget.x, 3.5, delta);
      _mouseCurrent.y = THREE.MathUtils.damp(_mouseCurrent.y, _mouseTarget.y, 3.5, delta);

      rootGroup.rotation.y = _mouseCurrent.x * 0.45;
      rootGroup.rotation.x = -_mouseCurrent.y * 0.35;

      // Core rotation
      const spinSpeed = 0.5 * currentSpeed;
      coreGroup.rotation.y += spinSpeed * delta;
      coreGroup.rotation.x = Math.sin(time * 0.4) * 0.15;

      // Mode-specific behavior
      const mode = modeRef.current;
      if (mode === 'neural') {
        icoMat.color.setHex(0x8B5CF6);
        innerMat.color.setHex(0x8B5CF6);
        icoWireMat.color.setHex(0xC084FC);
        icoMesh.scale.setScalar(1 + Math.sin(time * 2.5) * 0.08);
      } else if (mode === 'polyhedron') {
        icoMat.color.setHex(0x00D9FF);
        innerMat.color.setHex(0x176BFF);
        icoWireMat.color.setHex(0x38BDF8);
        icoMesh.scale.setScalar(1.15 + Math.cos(time * 1.8) * 0.05);
      } else {
        // Quantum
        icoMat.color.setHex(0x176BFF);
        innerMat.color.setHex(0x00D9FF);
        icoWireMat.color.setHex(0x00D9FF);
        icoMesh.scale.setScalar(1 + Math.sin(time * 1.5) * 0.04);
      }

      // Wireframe toggle
      const isWire = wireframeRef.current;
      icoMat.wireframe = isWire;
      innerMesh.visible = !isWire;

      // Gimbal ring rotations
      ring1.rotation.z += 0.4 * currentSpeed * delta;
      ring1.rotation.y += 0.25 * currentSpeed * delta;

      ring2.rotation.z -= 0.35 * currentSpeed * delta;
      ring2.rotation.x += 0.2 * currentSpeed * delta;

      ring3.rotation.y += 0.5 * currentSpeed * delta;

      // Orbiting satellites animation
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const angle = (i / nodeCount) * Math.PI * 2 + time * 0.6 * currentSpeed;
        const r = 2.45 + Math.sin(time * 1.5 + i) * 0.12;
        node.position.x = Math.cos(angle) * r;
        node.position.z = Math.sin(angle) * r;
        node.position.y = Math.sin(time * 2 + i * 1.2) * 0.5;
        node.rotation.x += 1.5 * delta;
        node.rotation.y += 2.0 * delta;
      }

      // Gentle nebula drift
      particleSystem.rotation.y = time * 0.03 * currentSpeed;
      particleSystem.rotation.x = Math.sin(time * 0.02) * 0.05;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      ringTexture.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      icoWireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing z-0" />

      {/* Futuristic Floating Badges & Reticle Accents */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]"></span>
          <span className="text-[11px] font-mono-tech tracking-widest text-[#00D9FF]/90 uppercase">
            3D Holo-Core Active
          </span>
        </div>
        <div className="text-[10px] font-mono-tech text-slate-400">
          SYS: IB-2030 // REAL-TIME SHADER
        </div>
      </div>

      <div className="absolute top-6 right-6 pointer-events-none z-10 hidden sm:flex flex-col items-end gap-1">
        <div className="text-[11px] font-mono-tech text-slate-400">
          ROTATION: <span className="text-white">{rotationSpeed}x</span>
        </div>
        <div className="text-[10px] font-mono-tech text-violet-400">
          MODE: {activeMode.toUpperCase()}
        </div>
      </div>

      {/* Radial glow background floor */}
      <div
        className="absolute bottom-4 w-3/4 h-24 rounded-full pointer-events-none opacity-40 blur-3xl z-0"
        style={{
          background: 'radial-gradient(ellipse at center, #176BFF 0%, #8B5CF6 45%, transparent 75%)',
        }}
      />

      {/* Ergonomic Collapsible Bottom Dock for 3D Viewport Control (Zero viewport occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[540px]">
        <div className="glass-panel-glow rounded-xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 border border-[#176BFF]/30 shadow-2xl">
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase mr-1 hidden sm:inline">
              Core:
            </span>
            {(['quantum', 'neural', 'polyhedron'] as SceneMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sound.playModeSwitch();
                  setActiveMode(mode);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-mono-tech transition-all cursor-pointer ${
                  activeMode === mode
                    ? 'bg-[#176BFF] text-white shadow-[0_0_12px_rgba(23,107,255,0.6)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {mode === 'quantum' ? 'Quantum' : mode === 'neural' ? 'Neural' : 'Poly'}
              </button>
            ))}
          </div>

          {/* Quick 3D Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setWireframeOnly((prev) => !prev);
              }}
              title="Toggle Wireframe Shader"
              className={`px-2 py-1 rounded text-[11px] font-mono-tech transition-all cursor-pointer ${
                wireframeOnly
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.6)]'
                  : 'text-slate-400 hover:text-white bg-slate-900/50'
              }`}
            >
              {wireframeOnly ? 'Wire: ON' : 'Wireframe'}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setRotationSpeed((prev) => (prev === 1 ? 1.8 : prev === 1.8 ? 0.4 : 1));
              }}
              title="Toggle Rotation Speed"
              className="px-2 py-1 rounded text-[11px] font-mono-tech text-slate-300 hover:text-[#00D9FF] bg-slate-900/50 hover:bg-slate-800 transition cursor-pointer"
            >
              {rotationSpeed === 1 ? '1x' : rotationSpeed === 1.8 ? '2x' : '0.5x'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
