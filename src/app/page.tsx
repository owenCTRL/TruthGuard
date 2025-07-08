'use client';
import React, { useEffect, useRef, useState } from 'react';

// Story type definition
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

// Enhanced Globe rendering class with better detail
class ASCIIGlobe {
  private canvas: string[][];
  private width: number;
  private height: number;
  private radius: number;
  private rotation: number = 0;
  private tilt: number = 0.3;
  private zoom: number = 1.0;
  private autoRotate: boolean = true;
  private characters = ' .·:+=#@█';

  setRotation(rotation: number) {
    this.rotation = rotation;
  }

  setAutoRotate(autoRotate: boolean) {
    this.autoRotate = autoRotate;
  }

  getAutoRotate(): boolean {
    return this.autoRotate;
  }

  setZoom(zoom: number) {
    this.zoom = Math.max(0.8, Math.min(2.0, zoom));
  }

  getZoom(): number {
    return this.zoom;
  }

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.radius = Math.min(width, height) * 0.4;
    this.canvas = Array(height).fill(null).map(() => Array(width).fill(' '));
  }

  private latLngTo3D(lat: number, lng: number, rotation: number): { x: number; y: number; z: number } {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + rotation) * Math.PI / 180;

    const x = this.radius * Math.sin(phi) * Math.cos(theta) * this.zoom;
    const y = this.radius * Math.cos(phi) * this.zoom;
    const z = this.radius * Math.sin(phi) * Math.sin(theta) * this.zoom;

    const tiltedY = y * Math.cos(this.tilt) - z * Math.sin(this.tilt);
    const tiltedZ = y * Math.sin(this.tilt) + z * Math.cos(this.tilt);

    return { x, y: tiltedY, z: tiltedZ };
  }

  private project3DTo2D(x: number, y: number, z: number): { x: number; y: number; visible: boolean } {
    const screenX = Math.round(x + this.width / 2);
    const screenY = Math.round(-y + this.height / 2);
    const visible = z > -this.radius * 0.8 * this.zoom;

    return { x: screenX, y: screenY, visible };
  }

  clear() {
    this.canvas = Array(this.height).fill(null).map(() => Array(this.width).fill(' '));
  }

  drawGlobe() {
    // Draw the globe sphere with higher resolution
    for (let lat = -90; lat <= 90; lat += 2) {
      for (let lng = -180; lng <= 180; lng += 2) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          const brightness = Math.max(0, Math.min(1, (z + this.radius * this.zoom) / (2 * this.radius * this.zoom)));
          
          const isLand = this.isDetailedLandmass(lat, lng);
          const isCoastline = this.isCoastline(lat, lng);
          const elevation = this.getElevation(lat, lng);
          
          if (isCoastline) {
            this.canvas[screenY][screenX] = brightness > 0.3 ? '≈' : '~';
          } else if (isLand) {
            if (elevation > 0.7) {
              this.canvas[screenY][screenX] = brightness > 0.3 ? '▲' : '^';
            } else if (elevation > 0.4) {
              this.canvas[screenY][screenX] = brightness > 0.3 ? '█' : '▓';
            } else {
              this.canvas[screenY][screenX] = brightness > 0.3 ? '▓' : '░';
            }
          } else {
            // Ocean with wave patterns
            const wavePattern = (Math.sin(lat * 0.1 + lng * 0.1) > 0);
            this.canvas[screenY][screenX] = brightness > 0.3 ? (wavePattern ? '~' : '≈') : '·';
          }
        }
      }
    }

    // Draw latitude lines (more detailed)
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lng = -180; lng <= 180; lng += 1) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          if (this.canvas[screenY][screenX] === ' ' || this.canvas[screenY][screenX] === '·') {
            this.canvas[screenY][screenX] = '·';
          }
        }
      }
    }

    // Draw longitude lines (more detailed)
    for (let lng = -180; lng <= 180; lng += 15) {
      for (let lat = -90; lat <= 90; lat += 1) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          if (this.canvas[screenY][screenX] === ' ' || this.canvas[screenY][screenX] === '·') {
            this.canvas[screenY][screenX] = '·';
          }
        }
      }
    }

    // Draw equator and prime meridian
    for (let i = -180; i <= 180; i += 1) {
      // Equator
      const { x, y, z } = this.latLngTo3D(0, i, this.rotation);
      const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);
      if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
        if (this.canvas[screenY][screenX] === ' ' || this.canvas[screenY][screenX] === '·') {
          this.canvas[screenY][screenX] = '=';
        }
      }

      // Prime meridian
      const pm = this.latLngTo3D(i / 2, 0, this.rotation);
      const pmScreen = this.project3DTo2D(pm.x, pm.y, pm.z);
      if (pmScreen.visible && pmScreen.x >= 0 && pmScreen.x < this.width && pmScreen.y >= 0 && pmScreen.y < this.height) {
        if (this.canvas[pmScreen.y][pmScreen.x] === ' ' || this.canvas[pmScreen.y][pmScreen.x] === '·') {
          this.canvas[pmScreen.y][pmScreen.x] = '|';
        }
      }
    }
  }

  // More detailed landmass detection with coastlines
  private isDetailedLandmass(lat: number, lng: number): boolean {
    // North America with more detail
    if (lat > 15 && lat < 75 && lng > -170 && lng < -50) {
      // Exclude Gulf of Mexico
      if (lat < 30 && lat > 18 && lng > -98 && lng < -80) return false;
      // Exclude Hudson Bay
      if (lat > 50 && lat < 65 && lng > -95 && lng < -75) return false;
      return true;
    }
    
    // South America with detail
    if (lat > -55 && lat < 15 && lng > -85 && lng < -35) {
      // Narrow at Panama
      if (lat > 5 && lat < 10 && lng < -80) return true;
      if (lat > -5 && lat < 5 && lng > -70) return true;
      return true;
    }
    
    // Europe with Mediterranean
    if (lat > 35 && lat < 72 && lng > -25 && lng < 60) {
      // Mediterranean Sea
      if (lat > 30 && lat < 45 && lng > -5 && lng < 35) {
        if (lat < 38) return false;
        if (lat < 42 && lng > 10 && lng < 30) return false;
      }
      return true;
    }
    
    // Africa with detail
    if (lat > -35 && lat < 38 && lng > -20 && lng < 55) {
      // Red Sea
      if (lat > 12 && lat < 30 && lng > 32 && lng < 44) return false;
      return true;
    }
    
    // Asia with detail
    if (lat > -10 && lat < 75 && lng > 25 && lng < 180) {
      // Exclude major water bodies
      if (lat > 30 && lat < 50 && lng > 45 && lng < 60) return false; // Caspian Sea
      return true;
    }
    
    // Australia
    if (lat > -45 && lat < -10 && lng > 110 && lng < 155) {
      return true;
    }
    
    // Indonesia
    if (lat > -10 && lat < 10 && lng > 95 && lng < 140) {
      if ((lng > 100 && lng < 110) || (lng > 115 && lng < 125) || (lng > 130 && lng < 135)) {
        return true;
      }
    }
    
    // New Zealand
    if (lat > -48 && lat < -34 && lng > 165 && lng < 179) {
      return true;
    }
    
    // Antarctica
    if (lat < -60) {
      return true;
    }

    return false;
  }

  private isCoastline(lat: number, lng: number): boolean {
    if (!this.isDetailedLandmass(lat, lng)) return false;
    
    // Check if any neighbor is water
    for (let dlat = -2; dlat <= 2; dlat += 2) {
      for (let dlng = -2; dlng <= 2; dlng += 2) {
        if (dlat === 0 && dlng === 0) continue;
        if (!this.isDetailedLandmass(lat + dlat, lng + dlng)) {
          return true;
        }
      }
    }
    return false;
  }

  private getElevation(lat: number, lng: number): number {
    // Himalayas
    if (lat > 25 && lat < 35 && lng > 75 && lng < 95) return 0.9;
    // Alps
    if (lat > 44 && lat < 48 && lng > 5 && lng < 15) return 0.8;
    // Rockies
    if (lat > 30 && lat < 50 && lng > -120 && lng < -100) return 0.7;
    // Andes
    if (lat > -55 && lat < 10 && lng > -75 && lng < -65) return 0.8;
    
    return 0.2;
  }

  drawMarker(lat: number, lng: number, symbol: string, highlight: boolean = false) {
    const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
    const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

    if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
      this.canvas[screenY][screenX] = symbol;

      if (highlight) {
        // Draw a cross pattern for highlight
        const positions = [
          [-1, 0], [1, 0], [0, -1], [0, 1]
        ];
        
        positions.forEach(([dx, dy]) => {
          const nx = screenX + dx;
          const ny = screenY + dy;
          if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
            if (this.canvas[ny][nx] === ' ' || this.canvas[ny][nx] === '·' || this.canvas[ny][nx] === '~') {
              this.canvas[ny][nx] = '+';
            }
          }
        });
      }
    }

    return { visible, screenX, screenY };
  }

  drawConnection(lat1: number, lng1: number, lat2: number, lng2: number) {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      
      // Great circle interpolation
      const lat = lat1 + (lat2 - lat1) * t;
      const lng = lng1 + (lng2 - lng1) * t;

      const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
      const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);

      if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
        const current = this.canvas[screenY][screenX];
        if (current === ' ' || current === '·' || current === '~' || current === '≈') {
          this.canvas[screenY][screenX] = i % 4 === 0 ? '◦' : '·';
        }
      }
    }
  }

  rotate(delta: number) {
    this.rotation = (this.rotation + delta) % 360;
  }

  setTilt(tilt: number) {
    this.tilt = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, tilt));
  }

  toString(): string {
    return this.canvas.map(row => row.join('')).join('\n');
  }
}

const ModernProgressBar = ({ value, max = 100, width = 20, showPercentage = true }: { value: number; max?: number; width?: number; showPercentage?: boolean }) => {
  const filled = Math.round((value / max) * width);
  const bar = `█`.repeat(filled) + `░`.repeat(width - filled);
  return showPercentage ? `[${bar}] ${value}%` : `[${bar}]`;
};

export default function TruthGuardASCII() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [globalStats, setGlobalStats] = useState({
    totalSources: 0,
    avgTruthScore: 0,
    criticalBias: 0,
    activeRegions: 0,
  });
  const [globeRotation, setGlobeRotation] = useState(0);
  const [globeTilt, setGlobeTilt] = useState(0.3);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOverGlobe, setIsMouseOverGlobe] = useState(false);
  const [globeZoom, setGlobeZoom] = useState(1.0);

  const terminalRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ASCIIGlobe | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const sampleStories: Story[] = [
    {
      id: '1',
      title: 'NATO Eastern European Military Movement Reports',
      category: 'DEFENSE',
      severity: 'CRITICAL',
      location: { lat: 52.23, lng: 21.01, name: 'Warsaw', country: 'Poland' },
      reliability: 74,
      bias: 32,
      impact: 89,
      sources: 147,
      timestamp: new Date(),
      summary: 'Multiple sources report military movements. Truth analysis indicates 68% factual content with significant bias from all sides.',
      keyPlayers: ['NATO', 'Pentagon', 'Polish MoD'],
      sentiment: 'NEGATIVE',
      connections: ['2', '3'],
      truthScore: 68,
      abstractedContent: 'Military alliance conducting routine exercises in member state territory. Scale and timing subject to interpretation bias.',
      biasedClaims: ['Unprecedented military buildup', 'Aggressive posturing', 'Defensive response only'],
      verifiedFacts: ['Military exercises scheduled', 'Standard NATO protocols followed', '3,000 personnel involved'],
    },
    {
      id: '2',
      title: 'Global Semiconductor Supply Chain Analysis',
      category: 'ECONOMICS',
      severity: 'HIGH',
      location: { lat: 25.03, lng: 121.56, name: 'Taipei', country: 'Taiwan' },
      reliability: 81,
      bias: 18,
      impact: 76,
      sources: 238,
      timestamp: new Date(),
      summary: 'Conflicting reports on chip shortage severity. Mean analysis suggests 15-25% capacity impact, not 40% as claimed.',
      keyPlayers: ['TSMC', 'Samsung', 'Intel'],
      sentiment: 'NEGATIVE',
      connections: ['1', '3'],
      truthScore: 81,
      abstractedContent: 'Semiconductor production experiencing moderate constraints. Market speculation amplifying actual impact metrics.',
      biasedClaims: ['Industry collapse imminent', 'No shortage exists', '40% production drop'],
      verifiedFacts: ['15-25% capacity reduction', 'Supply chain delays averaging 3 weeks', 'Automotive sector most affected'],
    },
    {
      id: '3',
      title: 'Financial Infrastructure Security Event',
      category: 'CYBER',
      severity: 'CRITICAL',
      location: { lat: 38.89, lng: -77.03, name: 'Washington DC', country: 'USA' },
      reliability: 58,
      bias: 45,
      impact: 92,
      sources: 89,
      timestamp: new Date(),
      summary: 'Unverified claims of coordinated attacks. Truth index low due to conflicting technical details across sources.',
      keyPlayers: ['FBI', 'CISA', 'Banks'],
      sentiment: 'NEGATIVE',
      connections: ['1', '2', '4'],
      truthScore: 58,
      abstractedContent: 'Security incident reported at financial institutions. Technical specifics unconfirmed. Standard protocols activated.',
      biasedClaims: ['State-sponsored attack', 'System completely compromised', 'Minor glitch only'],
      verifiedFacts: ['Security protocols activated', 'No confirmed data breach', 'Investigation ongoing'],
    },
    {
      id: '4',
      title: 'European Energy Infrastructure Investment',
      category: 'ENERGY',
      severity: 'MEDIUM',
      location: { lat: 51.50, lng: -0.12, name: 'London', country: 'UK' },
      reliability: 85,
      bias: 22,
      impact: 68,
      sources: 131,
      timestamp: new Date(),
      summary: 'Investment figures vary by €200B across sources. Averaged analysis indicates €350B most likely figure.',
      keyPlayers: ['EU Commission', 'UK Gov'],
      sentiment: 'POSITIVE',
      connections: ['3'],
      truthScore: 85,
      abstractedContent: 'Major renewable energy investment announced. Actual commitment level between €300-400B based on source reconciliation.',
      biasedClaims: ['€500B guaranteed', 'Mere political gesture', 'Immediate implementation'],
      verifiedFacts: ['€350B median commitment', '5-year rollout plan', '12 member states participating'],
    },
    {
      id: '5',
      title: 'Pacific Trade Route Disruption Claims',
      category: 'ECONOMICS',
      severity: 'HIGH',
      location: { lat: 35.67, lng: 139.65, name: 'Tokyo', country: 'Japan' },
      reliability: 72,
      bias: 28,
      impact: 83,
      sources: 156,
      timestamp: new Date(),
      summary: 'Shipping delays reported with varying severity. Analysis shows 20% impact, not 60% as some sources claim.',
      keyPlayers: ['Shipping Corps', 'Port Authorities'],
      sentiment: 'NEGATIVE',
      connections: ['2'],
      truthScore: 72,
      abstractedContent: 'Moderate shipping delays affecting Pacific routes. Weather and port congestion primary factors.',
      biasedClaims: ['Complete route closure', '60% capacity loss', 'No significant impact'],
      verifiedFacts: ['20% delay increase', '2-3 day average delays', 'Alternative routes available'],
    },
  ];

  useEffect(() => {
    setStories(sampleStories);

    const stats = {
      totalSources: sampleStories.reduce((acc, s) => acc + s.sources, 0),
      avgTruthScore: Math.round(sampleStories.reduce((acc, s) => acc + (s.truthScore || 0), 0) / sampleStories.length),
      criticalBias: sampleStories.filter(s => s.bias > 30).length,
      activeRegions: new Set(sampleStories.map(s => s.location.country)).size,
    };
    setGlobalStats(stats);

    globeRef.current = new ASCIIGlobe(80, 40);

    addTerminalLine('█ TRUTHGUARD SYSTEM INITIALIZED');
    addTerminalLine(`├─ Connected to ${stats.activeRegions} regions`);
    addTerminalLine(`├─ Monitoring ${stats.totalSources} sources`);
    addTerminalLine(`├─ Global truth index average: ${stats.avgTruthScore}%`);
    addTerminalLine(`└─ System ready`);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isMouseOverGlobe && globeRef.current?.getAutoRotate()) {
        setGlobeRotation(prev => (prev + 0.5) % 360);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMouseOverGlobe]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setGlobeRotation(prev => (prev - deltaX * 0.5) % 360);
    setGlobeTilt(prev => Math.max(-1, Math.min(1, prev + deltaY * 0.01)));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    if (globeRef.current) {
      const newZoom = globeRef.current.getZoom() + 0.1;
      globeRef.current.setZoom(newZoom);
      setGlobeZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (globeRef.current) {
      const newZoom = globeRef.current.getZoom() - 0.1;
      globeRef.current.setZoom(newZoom);
      setGlobeZoom(newZoom);
    }
  };

  const addTerminalLine = (line: string) => {
    setTerminalOutput(prev => [...prev, line]);
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const clearTerminal = () => {
    setTerminalOutput([
      '█ TRUTHGUARD TERMINAL v0.0.1',
    ]);
  };

  const analyzeStory = (story: Story) => {
    clearTerminal();
    setIsProcessing(true);
    setScanProgress(0);
    setSelectedStory(story);

    addTerminalLine(`├─ ANALYZING: ${story.title}`);
    addTerminalLine(`├─ Location: ${story.location.name}, ${story.location.country}`);
    addTerminalLine(`├─ Aggregating ${story.sources} sources...`);
    addTerminalLine('│');

    const steps = [
      { p: 20, msg: '├─ Cross-referencing primary sources...' },
      { p: 40, msg: '├─ Detecting bias patterns...' },
      { p: 60, msg: '├─ Verifying factual claims...' },
      { p: 80, msg: '├─ Generating abstracted content...' },
      { p: 100, msg: '└─ Analysis complete.' },
    ];

    steps.forEach(({ p, msg }, index) => {
      setTimeout(() => {
        setScanProgress(p);
        addTerminalLine(msg);

        if (p === 100) {
          setIsProcessing(false);
          addTerminalLine('|');
          addTerminalLine(`█ TRUTH INDEX: ${story.truthScore ?? 0}%`);
          addTerminalLine(`█ BIAS LEVEL: ${story.bias}%`);
          addTerminalLine('');
          addTerminalLine('├─ ABSTRACTED CONTENT:');
          addTerminalLine(`│  ${story.abstractedContent ?? 'N/A'}`);
          addTerminalLine('│');
          addTerminalLine('└─ VERIFIED FACTS:');
          story.verifiedFacts?.forEach(fact => {
            addTerminalLine(`   ✓ ${fact}`);
          });
        }
      }, index * 400);
    });
  };

  const getMarkerSymbol = (category: string, severity: string) => {
    const symbols: { [key: string]: { [key: string]: string } } = {
      DEFENSE: { CRITICAL: '◉', HIGH: '●', MEDIUM: '○', LOW: '·' },
      ECONOMICS: { CRITICAL: '◉', HIGH: '●', MEDIUM: '○', LOW: '·' },
      CYBER: { CRITICAL: '▲', HIGH: '△', MEDIUM: '▽', LOW: '·' },
      ENERGY: { CRITICAL: '★', HIGH: '☆', MEDIUM: '✦', LOW: '·' },
      POLITICS: { CRITICAL: '◆', HIGH: '◇', MEDIUM: '◈', LOW: '·' },
    };
    return symbols[category]?.[severity] || '•';
  };

  const renderGlobe = () => {
    const globe = globeRef.current;
    if (!globe) return '';

    globe.clear();
    globe.setRotation(globeRotation);
    globe.setTilt(globeTilt);
    globe.drawGlobe();

    stories.forEach(story => {
      if (story.connections) {
        story.connections.forEach(targetId => {
          const target = stories.find(s => s.id === targetId);
          if (target) {
            globe.drawConnection(
              story.location.lat,
              story.location.lng,
              target.location.lat,
              target.location.lng
            );
          }
        });
      }
    });

    stories.forEach(story => {
      const symbol = getMarkerSymbol(story.category, story.severity);
      const isSelected = selectedStory?.id === story.id;
      const isHovered = hoveredStory?.id === story.id;
      globe.drawMarker(story.location.lat, story.location.lng, symbol, isSelected || isHovered || story.severity === 'CRITICAL');
    });

    return globe.toString();
  };

  // Calculate terminal height dynamically to align with story details
  const getTerminalHeight = () => {
    if (!selectedStory) return 'h-[250px]';
    // Match the height of the story details panel when displayed
    return 'h-[420px]';
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');

        body {
          font-family: 'Fira Code', monospace;
          background: #000;
          color: #00ff00;
          margin: 0;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #001100;
          border: 1px solid #003300;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 226, 119, 1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .blink {
          animation: blink 1s infinite;
        }

        .terminal-font {
          font-family: 'Fira Code', monospace;
          font-weight: 400;
        }

        .rounded-border {
          border-radius: 4px;
        }

        .border-glow-green {
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.1), inset 0 0 10px rgba(0, 255, 0, 0.02);
        }

        .border-glow-yellow {
          box-shadow: 0 0 10px rgba(255, 255, 0, 0.1), inset 0 0 10px rgba(255, 255, 0, 0.02);
        }

        .border-glow-red {
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.1), inset 0 0 10px rgba(255, 0, 0, 0.02);
        }

        .story-card-hover {
          background: rgba(0, 255, 0, 0.03);
          border-color: rgba(0, 255, 0, 0.8);
        }

        .story-card-selected {
          background: rgba(255, 255, 0, 0.05);
          border-color: rgba(255, 255, 0, 0.8);
        }

        .zoom-button {
          background: transparent;
          border: 1px solid rgba(0, 226, 119, 1);
          color: rgba(0, 226, 119, 1);
          padding: 4px 8px;
          cursor: pointer;
          font-family: 'Fira Code', monospace;
          font-size: 12px;
          transition: all 0.2s;
        }

        .zoom-button:hover {
          background: rgba(0, 255, 0, 0.1);
          box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
        }

        .zoom-button:active {
          background: rgba(0, 255, 0, 0.2);
        }
      `}</style>

      <div className="min-h-screen bg-black text-green-400 font-mono px-2 sm:px-4 md:px-6 lg:px-8 py-6 overflow-hidden">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-6 border border-green-400 p-4 sm:p-6 rounded-border border-glow-green">
            <div className="text-center mb-6 overflow-x-hidden max-w-screen">
              <pre className="text-green-400 block text-[8px] sm:text-[8px] md:text-xs leading-none whitespace-pre break-words">
  {`
████████╗██████╗ ██╗   ██╗████████╗██╗  ██╗ ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗ 
╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗
   ██║   ██████╔╝██║   ██║   ██║   ███████║██║  ███╗██║   ██║███████║██████╔╝██║  ██║
   ██║   ██╔══██╗██║   ██║   ██║   ██╔══██║██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║
   ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
                                                                                     `}
              </pre>
              <pre className='block text-[12px] sm:text-[16px] md:text-sm leading-none whitespace-pre break-words'>
                {`
GLOBAL NEWS DETECTION & BIAS NEUTRALIZATION
█ v0.0.1 - Development Build`}
              </pre>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="border border-green-400 p-4 h-[500px] sm:h-[500px] md:h-[550px] relative rounded-border border-glow-green"
                    onMouseEnter={() => setIsMouseOverGlobe(true)}
                    onMouseLeave={() => setIsMouseOverGlobe(false)}>
                  <div className="absolute top-2 left-2 text-xs text-yellow-400 z-10">
                    ◉ GLOBAL NETWORK
                  </div>

                  <div className="absolute top-2 right-2 text-xs text-green-400 z-10 flex items-center gap-2">
                    <span>DRAG TO ROTATE</span>
                    <div className="flex gap-1">
                      <button onClick={handleZoomOut} className="zoom-button rounded-border">−</button>
                      <button onClick={handleZoomIn} className="zoom-button rounded-border">+</button>
                    </div>
                  </div>

                  <div
                    className="h-full flex items-center justify-center cursor-move select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <pre className="text-green-400 text-[10px] leading-none">{renderGlobe()}</pre>
                  </div>

                  <div className="absolute bottom-2 left-2 text-xs space-y-1">
                    <div className="text-yellow-400">◉ LEGEND</div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-green-400">
                      <div>▓█ Land</div>
                      <div>~≈ Ocean</div>
                      <div>▲ Mountains</div>
                      <div>= Equator</div>
                      <div>| Prime Meridian</div>
                      <div>· Grid Lines</div>
                    </div>
                    <div className="text-yellow-400 mt-2">◉ ACTIVE REGIONS</div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-green-400">
                      <div>North America: {stories.filter(s => s.location.lng > -170 && s.location.lng < -50).length}</div>
                      <div>Europe: {stories.filter(s => s.location.lng > -25 && s.location.lng < 40).length}</div>
                      <div>Asia: {stories.filter(s => s.location.lng > 40 && s.location.lng < 180).length}</div>
                      <div>Critical: <span className="text-red-400">{stories.filter(s => s.severity === 'CRITICAL').length}</span></div>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 text-xs text-green-400">
                    <div>CONNECTIONS: {stories.reduce((acc, s) => acc + (s.connections?.length || 0), 0)}</div>
                    <div>ROTATION: {Math.round(globeRotation)}°</div>
                    <div>ZOOM: {Math.round(globeZoom * 100)}%</div>
                  </div>

                  {(hoveredStory || selectedStory) && (
                    <div className="absolute top-12 left-2 bg-black border border-green-400 p-2 rounded-border text-xs max-w-xs">
                      <div className="text-yellow-400 font-bold mb-1">
                        {(hoveredStory || selectedStory)?.location?.name ?? ''}
                      </div>
                      <div className="text-green-400">
                        Category: {(hoveredStory || selectedStory)?.category ?? ''}
                      </div>
                      <div className="text-green-400">
                        Sources: {(hoveredStory || selectedStory)?.sources ?? ''}
                      </div>
                      <div className="text-green-400">
                        Truth: {(hoveredStory || selectedStory)?.truthScore ?? ''}%
                      </div>
                    </div>
                  )}
                </div>

                <div className={`border border-green-400 p-4 ${getTerminalHeight()} mt-4 overflow-y-auto rounded-border border-glow-green terminal-font max-h-[400px] md:max-h-[500px]`} ref={terminalRef}>
                  <div className="text-xs space-y-1 text-green-400">
                    {terminalOutput.map((line, index) => (
                      <div key={index} className="font-light">{line}</div>
                    ))}
                    {isProcessing && (
                      <div className="mt-2">
                        <div>{ModernProgressBar({ value: scanProgress, width: 40 })}</div>
                      </div>
                    )}
                    <span className="blink">█</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-green-400 p-4 h-[250px] sm:h-[300px] md:h-[350px] overflow-y-auto rounded-border border-glow-green">
                  <div className="text-sm mb-3 text-yellow-400 flex items-center justify-between">
                    <span>◉ DETECTED NARRATIVES</span>
                    <span className="text-xs text-green-400 pulse">LIVE</span>
                  </div>
                  <div className="space-y-2">
                    {stories.map((story) => (
                      <div
                        key={story.id}
                        className={`border p-3 cursor-pointer transition-all rounded-border ${
                          selectedStory?.id === story.id 
                            ? 'story-card-selected border-yellow-400' 
                            : 'border-green-400 hover:story-card-hover'
                        }`}
                        onClick={() => analyzeStory(story)}
                        onMouseEnter={() => setHoveredStory(story)}
                        onMouseLeave={() => setHoveredStory(null)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg ${
                              story.category === 'DEFENSE' ? 'text-red-400' :
                              story.category === 'ECONOMICS' ? 'text-green-400' :
                              story.category === 'CYBER' ? 'text-purple-400' :
                              story.category === 'ENERGY' ? 'text-yellow-400' :
                              'text-white'
                            }`}>
                              {getMarkerSymbol(story.category, story.severity)}
                            </span>
                            <span className="text-xs font-bold text-green-400">{story.category}</span>
                          </div>
                          <span className={`text-xs ${
                            story.severity === 'CRITICAL' ? 'text-red-400 pulse' : 
                            story.severity === 'HIGH' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {story.severity}
                          </span>
                        </div>
                        <div className="text-xs mb-2 text-gray-300">{story.title}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-yellow-400">Reliability:</span>
                            <div className="text-green-400">
                              {ModernProgressBar({ value: story.truthScore || 0, width: 10, showPercentage: false })} {story.truthScore ?? 0}%
                            </div>
                          </div>
                          <div>
                            <span className="text-yellow-400">BIAS:</span>
                            <div className={story.bias > 30 ? 'text-red-400' : 'text-yellow-400'}>
                              {ModernProgressBar({ value: story.bias, width: 10, showPercentage: false })} {story.bias}%
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          {story.sources} sources • {story.location.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedStory && (
                  <div className="border border-green-400 p-4 rounded-border border-glow-green h-[670px] max-h-[80vh] overflow-y-auto">
                    <div className="text-sm mb-3 text-yellow-400">◉ STORY ANALYSIS</div>

                    {isProcessing ? (
                      <div className="text-center py-8">
                        <div className="text-xs mb-2 text-green-400">PROCESSING...</div>
                        <div className="text-green-400 text-xs">
                          <pre>
  {`    ░░░░░░░░
    ░████████░
  ░██████████░
  ░████████████░
  ░████████████░
  ░██████████░
    ░████████░
      ░░░░░░░░`}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-3 p-3 border border-green-400 rounded-border">
                          <div>
                            <div className="text-yellow-400 mb-1">Truth Index</div>
                            <div className={`text-2xl font-bold ${
                              (selectedStory.truthScore ?? 0) >= 70 ? 'text-green-400' :
                              (selectedStory.truthScore ?? 0) >= 50 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {selectedStory.truthScore ?? 0}%
                            </div>
                          </div>
                          <div>
                            <div className="text-yellow-400 mb-1">BIAS LEVEL</div>
                            <div className={`text-2xl font-bold ${
                              selectedStory.bias <= 20 ? 'text-green-400' :
                              selectedStory.bias <= 40 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {selectedStory.bias}%
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div>
                            <span className="text-yellow-400">LOCATION:</span> 
                            <span className="text-green-400">{selectedStory.location.name}, {selectedStory.location.country}</span>
                          </div>
                          <div>
                            <span className="text-yellow-400">SOURCES:</span> 
                            <span className="text-green-400">{selectedStory.sources} aggregated</span>
                          </div>
                          <div>
                            <span className="text-yellow-400">RELIABILITY:</span> 
                            <span className="text-green-400">{ModernProgressBar({ value: selectedStory.reliability, width: 15 })}</span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-green-400">
                          <div className="text-yellow-400 mb-2">◉ ABSTRACTED CONTENT:</div>
                          <div className="text-gray-300 bg-black p-3 border-l-4 border-pink-400 rounded-border">
                            {selectedStory.abstractedContent ?? 'N/A'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mt-3">
                          <div>
                            <div className="text-red-400 mb-1">◉ BIASED CLAIMS:</div>
                            <div className="space-y-1">
                              {selectedStory.biasedClaims?.map((claim, i) => (
                                <div key={i} className="text-red-300 pl-2">× {claim}</div>
                              )) ?? <div className="text-red-300 pl-2">None</div>}
                            </div>
                          </div>
                          <div>
                            <div className="text-green-400 mb-1">◉ VERIFIED FACTS:</div>
                            <div className="space-y-1">
                              {selectedStory.verifiedFacts?.map((fact, i) => (
                                <div key={i} className="text-green-300 pl-2">✓ {fact}</div>
                              )) ?? <div className="text-green-300 pl-2">None</div>}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="text-yellow-400 mb-1">◉ KEY ENTITIES:</div>
                          <div className="flex flex-wrap gap-1">
                            {selectedStory.keyPlayers.map(player => (
                              <span key={player} className="border border-green-400 px-2 py-1 text-green-400 rounded-border">
                                {player}
                              </span>
                            ))}
                          </div>
                        </div>

                        {selectedStory.connections && selectedStory.connections.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-green-400">
                            <div className="text-yellow-400 mb-1">◉ NARRATIVE CONNECTIONS:</div>
                            {selectedStory.connections.map(connId => {
                              const conn = stories.find(s => s.id === connId);
                              return conn ? (
                                <div key={connId} className="text-gray-300 pl-2">
                                  → {conn.title} <span className="text-green-400">({conn.truthScore ?? 0}% truth)</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 border border-green-400 p-3 rounded-border border-glow-green text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-1 text-green-400"><span className="inline-block w-2 h-2 bg-green-400"></span><span className='text-yellow-400'>SYSTEM:</span>  TRUTHGUARD v0.0.1</div>
                  <div className="flex items-center gap-1 text-green-400"><span className="inline-block w-2 h-2 bg-green-400"></span><span className='text-yellow-400'>MODE:</span>  ACTIVE</div>
                  <div className="flex items-center gap-1"><span className="inline-block w-2 h-2 bg-green-400"></span><span className='text-yellow-400'>UPTIME:</span> 99.97%</div>
                </div>
                <div className="text-green-400 pulse ml-auto">█</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="text-center p-3 border border-green-400 rounded-border">
                <div className="text-yellow-400">SOURCES</div>
                <div className="text-2xl font-bold text-green-400">{globalStats.totalSources}</div>
              </div>
              <div className="text-center p-3 border border-green-400 rounded-border">
                <div className="text-yellow-400">AVG TRUTH INDEX</div>
                <div className="text-2xl font-bold text-green-400">{globalStats.avgTruthScore}%</div>
              </div>
              <div className="text-center p-3 border border-green-400 rounded-border">
                <div className="text-yellow-400">CRITICAL BIAS</div>
                <div className="text-2xl font-bold text-red-400">{globalStats.criticalBias}</div>
              </div>
              <div className="text-center p-3 border border-green-400 rounded-border">
                <div className="text-yellow-400">REGIONS</div>
                <div className="text-2xl font-bold text-green-400">{globalStats.activeRegions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}