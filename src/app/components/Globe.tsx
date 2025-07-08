// components/Globe.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './Globe.module.css';

// Define the Story interface
interface Story {
  id: string;
  title: string;
  category: 'DEFENSE' | 'ECONOMICS' | 'CYBER' | 'ENERGY' | 'POLITICS';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  location: { lat: number; lng: number; name: string; country: string };
  reliability: number;
  bias: number;
  impact: number;
  sources: number;
  timestamp: Date;
  summary: string;
  keyPlayers: string[];
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  connections?: string[];
  truthScore?: number;
  abstractedContent?: string;
  biasedClaims?: string[];
  verifiedFacts?: string[];
}

// Interface for component props
interface GlobeProps {
  stories?: Story[];
}

// Utility function to convert lat/lon to 3D vector
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// Color mapping for categories
const categoryColors: Record<Story['category'], number> = {
  DEFENSE: 0xff0000, // Red
  ECONOMICS: 0x00ff00, // Green
  CYBER: 0x0000ff, // Blue
  ENERGY: 0xffff00, // Yellow
  POLITICS: 0xff00ff, // Magenta
};

// Size mapping for severity
const severitySizes: Record<Story['severity'], number> = {
  CRITICAL: 0.04,
  HIGH: 0.03,
  MEDIUM: 0.02,
  LOW: 0.01,
};

const Globe: React.FC<GlobeProps> = ({ stories = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !mountRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true, // Transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Set up OrbitControls for rotation, zoom, and pan
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.5;
    controls.minDistance = 2;
    controls.maxDistance = 5;

    // Create globe
    const globeRadius = 1;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const textureLoader = new THREE.TextureLoader();

    // Load and apply texture
    const earthTexture = textureLoader.load(
      '/assets/8k_earth_daymap.jpg',
      () => console.log('Texture loaded successfully')
    );
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Ensures proper texture rendering
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 10,
    });
    const globe = new THREE.Mesh(globeGeometry, earthMaterial);
    scene.add(globe);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Add hotspot markers
    const markers: THREE.Mesh[] = [];
    const markerMap = new Map<string, THREE.Mesh>();

    stories.forEach((story) => {
      const position = latLonToVector3(story.location.lat, story.location.lng, globeRadius * 1.02);
      const markerGeometry = new THREE.SphereGeometry(severitySizes[story.severity], 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: categoryColors[story.category] });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      marker.userData = { story };
      markers.push(marker);
      markerMap.set(story.id, marker);
      scene.add(marker);
    });

    // Add arc lines between connected stories
    const arcMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    stories.forEach((story) => {
      if (story.connections) {
        story.connections.forEach((connectedId) => {
          const relatedMarker = markerMap.get(connectedId);
          if (relatedMarker) {
            const start = markerMap.get(story.id)!.position;
            const end = relatedMarker.position;
            const curve = new THREE.QuadraticBezierCurve3(
              start,
              new THREE.Vector3().lerpVectors(start, end, 0.5).normalize().multiplyScalar(globeRadius * 1.5),
              end
            );
            const points = curve.getPoints(50);
            const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const arc = new THREE.Line(arcGeometry, arcMaterial);
            scene.add(arc);
          }
        });
      }
    });

    // Set initial camera position
    camera.position.z = 3;

    // Handle mouse clicks for story selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);
      if (intersects.length > 0) {
        const story = intersects[0].object.userData.story as Story;
        setSelectedStory(story);
      } else {
        setSelectedStory(null);
      }
    };
    window.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isHovered) {
        globe.rotation.y += 0.005; // Sweeping rotation when mouse is not hoveringsdf
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Mouse hover to stop rotation
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    mountRef.current.addEventListener('mouseenter', onMouseEnter);
    mountRef.current.addEventListener('mouseleave', onMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      mountRef.current.removeEventListener('mouseenter', onMouseEnter);
      mountRef.current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [stories, isHovered]);

  return (
    <div className={styles.container} ref={mountRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {selectedStory && (
        <div className={styles.tooltip}>
          <h3>{selectedStory.title}</h3>
          <p><strong>Location:</strong> {selectedStory.location.name}, {selectedStory.location.country}</p>
          <p><strong>Category:</strong> {selectedStory.category}</p>
          <p><strong>Severity:</strong> {selectedStory.severity}</p>
          <p><strong>Summary:</strong> {selectedStory.summary}</p>
          <p><strong>Key Players:</strong> {selectedStory.keyPlayers.join(', ')}</p>
          <p><strong>Sentiment:</strong> {selectedStory.sentiment}</p>
          <p><strong>Reliability:</strong> {selectedStory.reliability}</p>
          <p><strong>Bias:</strong> {selectedStory.bias}</p>
          <p><strong>Impact:</strong> {selectedStory.impact}</p>
          <p><strong>Sources:</strong> {selectedStory.sources}</p>
          <p><strong>Timestamp:</strong> {selectedStory.timestamp.toLocaleString()}</p>
          {selectedStory.truthScore && <p><strong>Truth Score:</strong> {selectedStory.truthScore}</p>}
          {selectedStory.abstractedContent && <p><strong>Abstract:</strong> {selectedStory.abstractedContent}</p>}
          {selectedStory.biasedClaims && selectedStory.biasedClaims.length > 0 && (
            <p><strong>Biased Claims:</strong> {selectedStory.biasedClaims.join(', ')}</p>
          )}
          {selectedStory.verifiedFacts && selectedStory.verifiedFacts.length > 0 && (
            <p><strong>Verified Facts:</strong> {selectedStory.verifiedFacts.join(', ')}</p>
          )}
          <button onClick={() => setSelectedStory(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Globe;