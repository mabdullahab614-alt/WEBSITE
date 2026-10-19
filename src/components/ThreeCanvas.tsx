import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  phoneColor?: number;
  rotationSpeed?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  phoneColor = 0x1b1b2f,
  rotationSpeed = 1
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const phoneBodyMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const colorPropRef = useRef(phoneColor);
  const speedPropRef = useRef(rotationSpeed);

  useEffect(() => {
    colorPropRef.current = phoneColor;
    if (phoneBodyMatRef.current) {
      phoneBodyMatRef.current.color.setHex(phoneColor);
    }
  }, [phoneColor]);

  useEffect(() => {
    speedPropRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect headless test runner
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isHeadless,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.id = 'bg';
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 9;

    // Lighting matching PDF specifications
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x00e5ff, 1.6, 50);
    light1.position.set(5, 5, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7c4dff, 1.4, 50);
    light2.position.set(-6, -3, 6);
    scene.add(light2);

    // Soft rim backlight
    const rimLight = new THREE.DirectionalLight(0xff4081, 0.6);
    rimLight.position.set(0, 10, -5);
    scene.add(rimLight);

    // Procedural screen canvas
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 1024;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 1024);
      grad.addColorStop(0, '#0d1124');
      grad.addColorStop(0.4, '#170b3b');
      grad.addColorStop(0.7, '#08253d');
      grad.addColorStop(1, '#001a24');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 1024);

      // Neon cyber glow circles
      const glowGrad1 = ctx.createRadialGradient(256, 320, 20, 256, 320, 220);
      glowGrad1.addColorStop(0, 'rgba(0, 229, 255, 0.45)');
      glowGrad1.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = glowGrad1;
      ctx.fillRect(0, 100, 512, 500);

      const glowGrad2 = ctx.createRadialGradient(380, 650, 10, 380, 650, 200);
      glowGrad2.addColorStop(0, 'rgba(124, 77, 255, 0.5)');
      glowGrad2.addColorStop(1, 'rgba(124, 77, 255, 0)');
      ctx.fillStyle = glowGrad2;
      ctx.fillRect(100, 450, 412, 400);

      // Status Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('09:41', 40, 55);

      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('5G', 400, 55);

      // Battery icon
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(440, 39, 36, 18);
      ctx.fillRect(444, 43, 26, 10);
      ctx.fillRect(477, 44, 3, 8);

      // Notch / Dynamic Island
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(186, 25, 140, 32, 16);
      ctx.fill();

      // Camera dot inside island
      ctx.fillStyle = '#09152b';
      ctx.beginPath();
      ctx.arc(300, 41, 6, 0, Math.PI * 2);
      ctx.fill();

      // Lockscreen widget
      ctx.fillStyle = '#00e5ff';
      ctx.font = '700 52px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GadgetHub', 256, 260);

      ctx.fillStyle = '#b0b8d0';
      ctx.font = '500 22px sans-serif';
      ctx.fillText('Flagship Pro 5G', 256, 300);

      // Hologram ring on screen
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(256, 520, 100, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(124, 77, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(256, 520, 115, 0.5, 4.5);
      ctx.stroke();

      // App dock icons at bottom
      const dockY = 880;
      const icons = ['#00e5ff', '#7c4dff', '#ff4081', '#ffc107'];
      icons.forEach((col, idx) => {
        const ix = 88 + idx * 95;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.roundRect(ix - 32, dockY - 32, 64, 64, 16);
        ctx.fill();

        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(ix, dockY, 14, 0, Math.PI * 2);
        ctx.fill();
      });

      // Home indicator bar
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(176, 990, 160, 6, 3);
      ctx.fill();
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;

    // Phone 3D Group
    const phone = new THREE.Group();

    // Phone Body
    const bodyGeometry = new THREE.BoxGeometry(2, 4, 0.25);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: colorPropRef.current,
      metalness: 0.9,
      roughness: 0.2
    });
    phoneBodyMatRef.current = bodyMaterial;
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);

    // Beveled frame trim accent
    const frameGeo = new THREE.BoxGeometry(2.02, 4.02, 0.23);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      metalness: 0.95,
      roughness: 0.1
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);

    // Front Screen
    const screenGeo = new THREE.PlaneGeometry(1.84, 3.84);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0x002233,
      emissiveIntensity: 0.4
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.13;

    // Camera island on back (top left of back)
    const cameraIslandGeo = new THREE.BoxGeometry(0.8, 1.2, 0.08);
    const cameraIslandMat = new THREE.MeshStandardMaterial({
      color: 0x050510,
      metalness: 0.95,
      roughness: 0.15
    });
    const cameraIsland = new THREE.Mesh(cameraIslandGeo, cameraIslandMat);
    cameraIsland.position.set(0.45, 1.2, -0.16);

    // 3 Camera lenses
    const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 32);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.9,
      roughness: 0.05
    });
    const lensRimMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.9,
      roughness: 0.2
    });

    const lensPositions = [
      [0.45, 1.5, -0.2],
      [0.45, 1.15, -0.2],
      [0.45, 0.8, -0.2]
    ];

    lensPositions.forEach(([lx, ly, lz]) => {
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(lx, ly, lz);
      phone.add(lens);

      const rim = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.15, 32),
        lensRimMat
      );
      rim.position.set(lx, ly, lz - 0.041);
      rim.rotation.y = Math.PI;
      phone.add(rim);
    });

    // Flash LED
    const flash = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff0c0 })
    );
    flash.rotateX(Math.PI / 2);
    flash.position.set(0.7, 1.35, -0.19);
    phone.add(flash);

    phone.add(bodyMesh, frameMesh, screenMesh, cameraIsland);
    phone.position.set(3, 0, 0);
    scene.add(phone);

    // Floating accessories
    const palette = [0x00e5ff, 0x7c4dff, 0xff4081, 0xffc107];
    const floaterMats = palette.map(
      (c) =>
        new THREE.MeshStandardMaterial({
          color: c,
          metalness: 0.7,
          roughness: 0.25
        })
    );

    interface FloaterItem {
      mesh: THREE.Object3D;
      speed: number;
      offset: number;
      initialY: number;
    }
    const floaters: FloaterItem[] = [];

    const addFloater = (geo: THREE.BufferGeometry, x: number, y: number, z: number) => {
      const mat = floaterMats[Math.floor(Math.random() * floaterMats.length)];
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      floaters.push({
        mesh,
        speed: Math.random() * 0.012 + 0.006,
        offset: Math.random() * 6.28,
        initialY: y
      });
    };

    // 14 floaters matching PDF (cable rings, earbuds, chargers)
    for (let i = 0; i < 14; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 9 - 2;
      const t = i % 3;

      if (t === 0) {
        // Cable ring (Torus)
        addFloater(new THREE.TorusGeometry(0.35, 0.12, 16, 40), x, y, z);
      } else if (t === 1) {
        // Earbud (Sphere with stem)
        const earbudGroup = new THREE.Group();
        const earbudHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.24, 24, 24),
          floaterMats[i % floaterMats.length]
        );
        const earbudStem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16),
          floaterMats[(i + 1) % floaterMats.length]
        );
        earbudStem.position.set(0, -0.25, 0);
        earbudStem.rotation.z = 0.2;
        earbudGroup.add(earbudHead, earbudStem);
        earbudGroup.position.set(x, y, z);
        scene.add(earbudGroup);
        floaters.push({
          mesh: earbudGroup,
          speed: Math.random() * 0.012 + 0.006,
          offset: Math.random() * 6.28,
          initialY: y
        });
      } else {
        // Fast Charger brick
        addFloater(new THREE.BoxGeometry(0.48, 0.48, 0.48), x, y, z);
      }
    }

    // Particle Stars
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 42;
      particleCoords[i + 1] = (Math.random() - 0.5) * 32;
      particleCoords[i + 2] = (Math.random() - 0.5) * 22;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0xffffff,
      transparent: true,
      opacity: 0.75
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Mouse & Scroll coordinates
    let mx = 0;
    let my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Responsive phone layout matching PDF
      if (w < 840) {
        phone.position.set(0.2, 0.2, -0.5);
        phone.scale.setScalar(0.65);
      } else {
        phone.position.set(3.2, 0, 0);
        phone.scale.setScalar(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Render loop using high-precision performance.now
    let animId: number;
    const startTime = performance.now();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      const t = (performance.now() - startTime) * 0.001;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const sc = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      const spd = speedPropRef.current;

      // Phone rotation & animation matching PDF math
      phone.rotation.y = t * 0.6 * spd + mx * 1.5 + sc * Math.PI * 4;
      phone.rotation.x = my * 0.6;
      phone.position.y = (window.innerWidth < 840 ? 0.2 : 0) + Math.sin(t * 1.2) * 0.3 - sc * 3.2;

      // Animate accessories
      floaters.forEach((f) => {
        f.mesh.rotation.x += f.speed * spd;
        f.mesh.rotation.y += f.speed * 1.4 * spd;
        f.mesh.position.y = f.initialY + Math.sin(t + f.offset) * 0.4;
      });

      // Gentle camera mouse parralax
      camera.position.x += (mx * 2 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);

      // Disposal
      renderer.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      floaterMats.forEach((m) => m.dispose());
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />;
};
