import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCcw, Zap, Eye, Settings, Info } from "lucide-react";

const ThreeDModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [nodeCount, setNodeCount] = useState(20);
  const [showParticles, setShowParticles] = useState(true);
  const [connectionOpacity, setConnectionOpacity] = useState(0.2);
  const [fps, setFps] = useState(60);
  const [isLoading, setIsLoading] = useState(true);

  // FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = Date.now();
    
    const updateFps = () => {
      frameCount++;
      const currentTime = Date.now();
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(updateFps);
    };
    updateFps();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced visuals
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Enhanced lighting setup
    scene.add(new THREE.AmbientLight(0x404040, 0.4));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 2, 40);
    pointLight1.position.set(-10, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0088, 1.8, 35);
    pointLight2.position.set(10, -5, -5);
    scene.add(pointLight2);

    const glowLight = new THREE.PointLight(0x00ffff, 3, 40);
    glowLight.position.set(0, 0, 0);
    scene.add(glowLight);

    // Neural network components
    interface NeuralNode extends THREE.Mesh {
      userData: {
      originalPosition: THREE.Vector3;
      phase: number;
      speed: number;
      amplitude: number;
      originalEmissive: number;
      pulsePhase: number;
      };
      material: THREE.MeshStandardMaterial;
    }

    interface Connection {
      line: THREE.Line;
      node1: NeuralNode;
      node2: NeuralNode;
      pulsePhase: number;
    }

    const neuralNodes: NeuralNode[] = [];
    const connections: Connection[] = [];

    // Create enhanced neural nodes
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.15, 32, 32);
      const color = new THREE.Color().setHSL(0.6 + Math.random() * 0.4, 1.0, 0.6);
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2.5,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.95,
      });

      const node = new THREE.Mesh(geometry, material);
      node.position.setFromSphericalCoords(
        3 + Math.random() * 5,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );

      node.userData = {
        originalPosition: node.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.03,
        amplitude: 0.3 + Math.random() * 0.7,
        originalEmissive: material.emissive.getHex(),
        pulsePhase: Math.random() * Math.PI * 2,
      };

      node.castShadow = true;
      node.receiveShadow = true;
      scene.add(node);
      neuralNodes.push(node as unknown as NeuralNode);
    }

    // Create connections with enhanced materials
    for (let i = 0; i < neuralNodes.length; i++) {
      for (let j = i + 1; j < neuralNodes.length; j++) {
        if (Math.random() < 0.4) {
          const points = [neuralNodes[i].position, neuralNodes[j].position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: connectionOpacity,
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          connections.push({ 
            line, 
            node1: neuralNodes[i], 
            node2: neuralNodes[j],
            pulsePhase: Math.random() * Math.PI * 2
          });
        }
      }
    }

    // Enhanced central brain
    const brain = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 3),
      new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8,
        wireframe: true,
        emissive: 0x003300,
        emissiveIntensity: 0.5,
      })
    );
    brain.castShadow = true;
    scene.add(brain);

    // Enhanced particle system
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const color = new THREE.Color().setHSL(
        0.6 + Math.random() * 0.4, 
        0.9, 
        0.5 + Math.random() * 0.3
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.1 + 0.02;
    }
    
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredNode: NeuralNode | null = null;

    interface MouseMoveEvent extends MouseEvent {
      // No additional fields needed, but allows for explicit typing
    }

    interface OnMouseMove {
      (event: MouseMoveEvent): void;
    }

    const onMouseMove: OnMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);

    // Enhanced animation loop
    const animate = () => {
      if (!isPlaying) return;
      
      animationIdRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001 * animationSpeed;

      // Enhanced brain animation
      const brainScale = 1 + Math.sin(time * 1.2) * 0.05;
      brain.scale.setScalar(brainScale);
      brain.rotation.x += 0.003 * animationSpeed;
      brain.rotation.y += 0.004 * animationSpeed;
      brain.rotation.z += 0.001 * animationSpeed;

      // Enhanced neural node animations
      neuralNodes.forEach((node, index) => {
        const { originalPosition, phase, speed, amplitude, pulsePhase } = node.userData;
        
        // Complex movement patterns
        node.position.x = originalPosition.x + 
          Math.sin(time * speed + phase) * amplitude +
          Math.cos(time * speed * 0.5 + phase) * amplitude * 0.3;
        node.position.y = originalPosition.y + 
          Math.cos(time * speed * 1.1 + phase) * amplitude * 0.6 +
          Math.sin(time * speed * 0.7 + phase) * amplitude * 0.2;
        node.position.z = originalPosition.z + 
          Math.sin(time * speed * 0.8 + phase) * amplitude * 0.4 +
          Math.cos(time * speed * 1.3 + phase) * amplitude * 0.2;

        // Enhanced pulsing effect
        const pulseScale = 1 + Math.sin(time * 3 + pulsePhase) * 0.3;
        node.scale.setScalar(pulseScale);
        
        // Dynamic emissive intensity
        node.material.emissiveIntensity = 2 + Math.sin(time * 2 + pulsePhase) * 1.5;
      });

      // Enhanced connection animations
      connections.forEach(({ line, node1, node2, pulsePhase }) => {
        line.geometry.setFromPoints([node1.position, node2.position]);
        (line.material as THREE.LineBasicMaterial).opacity = connectionOpacity * (0.5 + Math.sin(time * 3 + pulsePhase) * 0.5);
        
        // Color shifting
        const hue = (time * 0.1 + pulsePhase) % 1;
        (line.material as THREE.LineBasicMaterial).color.setHSL(0.5 + hue * 0.3, 1, 0.5);
      });

      // Enhanced particle system
      if (showParticles && particles) {
        const particlePositions = particles.geometry.attributes.position.array;
        const particleSizes = particles.geometry.attributes.size.array;
        
        for (let i = 0; i < particleCount; i++) {
          // Flowing motion
          particlePositions[i * 3] += Math.cos(time * 0.3 + i * 0.1) * 0.02;
          particlePositions[i * 3 + 1] += Math.sin(time * 0.4 + i * 0.2) * 0.015;
          particlePositions[i * 3 + 2] += Math.sin(time * 0.2 + i * 0.3) * 0.01;
          
          // Size variation
          particleSizes[i] = (0.02 + Math.random() * 0.08) * (1 + Math.sin(time * 2 + i) * 0.5);
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.size.needsUpdate = true;
        particles.rotation.y = time * 0.05;
        particles.rotation.x = time * 0.02;
      }

      // Enhanced hover interactions
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(neuralNodes);

      if (intersects.length > 0) {
        if (hoveredNode !== intersects[0].object) {
          if (hoveredNode) {
            hoveredNode.material.emissiveIntensity = 2;
            hoveredNode.scale.setScalar(1);
          }
          hoveredNode = intersects[0].object as NeuralNode;
        }
        hoveredNode.scale.setScalar(1.5 + Math.sin(time * 10) * 0.2);
        hoveredNode.material.emissiveIntensity = 6;
      } else {
        if (hoveredNode) {
          hoveredNode.material.emissiveIntensity = 2;
          hoveredNode.scale.setScalar(1);
          hoveredNode = null;
        }
      }

      renderer.render(scene, camera);
    };

    // Setup orbit controls (simplified for compatibility)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = () => { isDragging = true; };
    const onMouseUp = () => { isDragging = false; };
    interface MouseMoveControlEvent extends MouseEvent {
      offsetX: number;
      offsetY: number;
    }

    interface PreviousMousePosition {
      x: number;
      y: number;
    }

    const onMouseMoveControl = (event: MouseMoveControlEvent): void => {
      if (isDragging) {
      const deltaMove: PreviousMousePosition = {
        x: event.offsetX - previousMousePosition.x,
        y: event.offsetY - previousMousePosition.y
      };
      
      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
        THREE.MathUtils.degToRad(deltaMove.y * 0.5),
        THREE.MathUtils.degToRad(deltaMove.x * 0.5),
        0,
        'XYZ'
        ));
      
      camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);
      }
      
      previousMousePosition = { x: event.offsetX, y: event.offsetY };
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mousemove', onMouseMoveControl);

    animate();
    setIsLoading(false);

    const handleResize = () => {
      if (mountRef.current && renderer && camera) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousemove', onMouseMoveControl);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, animationSpeed, nodeCount, showParticles, connectionOpacity]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Resume animation
      const animate = () => {
        if (!isPlaying) return;
        animationIdRef.current = requestAnimationFrame(animate);
        // Animation logic would go here (simplified for this toggle)
      };
      animate();
    }
  };

  const resetCamera = () => {
    // Reset camera position (simplified implementation)
    setAnimationSpeed(1);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-purple-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <div className="text-cyan-400 font-medium">Initializing Neural Network...</div>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full"
        style={{ minHeight: "500px" }}
      />

     


      {/* Gradient Overlays for Visual Enhancement */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default ThreeDModel;