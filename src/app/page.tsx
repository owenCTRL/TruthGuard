'use client';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Analytics } from "@vercel/analytics/next";
import { ASCIIGlobe } from './components/asciiGlobe'; // Adjust the path based on your file structure
import { sampleStories } from '../../test/sampleStories';
import { Story } from './components/Stories';
import './globals.css';

// Story type definition

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

  const addTerminalLine = useCallback((line: string) => {
    setTerminalOutput(prev => [...prev, line]);
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  }, []);

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
  }, [addTerminalLine]);

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

  const getTerminalHeight = () => {
    if (!selectedStory) return 'h-[calc(283px)]';
    return 'h-[283px]';
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="min-h-screen bg-black text-green-400 font-mono px-2 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-screen">
          <div className="text-center mb-6 min-h-auto overflow-y-hidden overflow-x-hidden max-w-screen">
            <pre className="text-green-400 block text-[4px] sm:text-[8px] md:text-xs leading-none whitespace-pre break-words">
{`
████████╗██████╗ ██╗   ██╗████████╗██╗  ██╗ ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗ 
╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗
  ██║   ██████╔╝██║   ██║   ██║   ███████║██║  ███╗██║   ██║███████║██████╔╝██║  ██║
  ██║   ██╔══██╗██║   ██║   ██║   ██╔══██║██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║
  ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
  ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
                                                                                    `}
            </pre>
            <pre className='block text-[10px] sm:text-sm md:text-[16px] leading-none whitespace-pre break-words'>
              {`
GLOBAL NEWS DETECTION & BIAS NEUTRALIZATION
█ v0.0.1 - Development Build`}
            </pre>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="border border-green-400 p-4 h-[550px] relative rounded-border border-glow-green"
                  onMouseEnter={() => setIsMouseOverGlobe(true)}
                  onMouseLeave={() => setIsMouseOverGlobe(false)}>
                <div className="absolute top-2 left-2 text-xs text-yellow-400 z-10">
                  ◉ GLOBAL NETWORK
                </div>

                <div className="absolute top-2 right-2 text-xs text-green-400 z-10 flex items-center gap-2">
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

                <div className="absolute bottom-2 left-2 text-xs space-y-1 invisible md:visible">
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

            <div className="flex flex-col h-full space-y-4">
              {!selectedStory ? (
                // Full height detected narratives when no story is selected
                <div className="border border-green-400 p-4 h-full overflow-y-auto rounded-border border-glow-green">
                  <div className="text-sm mb-3 text-yellow-400 flex items-center justify-between">
                    <span>◉ DETECTED NARRATIVES</span>
                    <span className="text-xs text-green-400 pulse">LIVE</span>
                  </div>
                  <div className="space-y-2">
                    {stories.map((story) => (
                      <div
                        key={story.id}
                        className="border p-4 cursor-pointer transition-all duration-500 overflow-y-auto border-green-500 rounded-border border-glow-green border-green-400 hover:story-card-hover"
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
              ) : (
                // Story detail view with navigation
                <div className="flex flex-col h-full">
                  {/* Story Navigation Header */}
                  <div className="border border-green-400 p-3 rounded-border border-glow-green mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
                            const prevIndex = currentIndex > 0 ? currentIndex - 1 : stories.length - 1;
                            analyzeStory(stories[prevIndex]);
                          }}
                          className="text-green-400 hover:text-yellow-400 transition-colors text-xl"
                        >
                          ↑
                        </button>
                        <div className="text-center">
                          <div className="text-xs text-yellow-400">
                            {stories.findIndex(s => s.id === selectedStory.id) + 1} of {stories.length}
                          </div>
                          <div className="text-xs text-gray-400">NARRATIVES</div>
                        </div>
                        <button
                          onClick={() => {
                            const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
                            const nextIndex = currentIndex < stories.length - 1 ? currentIndex + 1 : 0;
                            analyzeStory(stories[nextIndex]);
                          }}
                          className="text-green-400 hover:text-yellow-400 transition-colors text-xl"
                        >
                          ↓
                        </button>
                      </div>
                      
                      <div className="flex-1 mx-4">
                        <div className="text-center relative">
                          {(() => {
                            const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
                            const prevIndex = currentIndex > 0 ? currentIndex - 1 : stories.length - 1;
                            const prevStory = stories[prevIndex];
                            return (
                              <div className="absolute top-0 left-0 w-full opacity-30 blur-sm text-xs text-gray-500 truncate">
                                {prevStory.title}
                              </div>
                            );
                          })()}
                          
                          <div className="text-[0.8rem] sm:text-xs text-green-400 font-bold">
                            {selectedStory.title}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedStory(null);
                          setIsProcessing(false);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="border border-green-400 p-4 rounded-border border-glow-green flex-1 overflow-y-auto">
                    <div className="text-sm mb-3 text-yellow-400">◉ STORY ANALYSIS</div>

                    {isProcessing ? (
                      <div className="text-center py-8">
                        <div className="text-xs mb-2 text-green-400">PROCESSING...</div>
                        <div className="block text-green-400 text-[5px] w-full ">
                          <pre className='text-[5px]'>
{String.raw`
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNFVVII*****IIIIIIIVIIVVVIIIIVIIIIVFNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNFVIIV**I****II***I**::IIVVIVIIVVVV**********IIIVFNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNFF**::IIIIV*VV**IIIIIVVVVVIIV*II**VIIVV***IVIV*****IVII***IVNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNVVV*I::*FV*VI**I*IIIIIIII*IIIIVVIVVIIII***VVVVVIIIIVVII*:*I******IIIVNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNI**::**VIIVV*VIVV**V*IIIIIIVIIIIIIII*I**IIIIVVVI*IIIIIIIIIIIII***:******IIIIVNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFI***:IIIVIVVIII***I***I*I*VI*IIIIIIIIIIIIIIIIIIIVVVVIIIVII*I**I**II::::::*******I*VNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNF**::**III**IIIII*IIII**III::*:*IIIIIIII****I*IIVIVVIIIIVIIVVVIII******V*IIII*::::****IIIVNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFVII::*VIIIVVIIIIII*I*I*I*II*I*I**III***IIIIIIIIIIIIIIIIIV*IIVVFIII*IIVI**V*I*IVVIIF*:::****IIVVNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNVFI**:FIV*VIIIIII*III****IIIII**I*I*I:III:II*IIIVIIIIVF*V*I*IVI*IIVVVVVIIIII*V*****IVVIIV*IIIV**IIIVFNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNVIFF**:VVVVVVIIIIIIII**IIIIIIII*IIIIIIIIIIIVIIIVVIIIVIVVVVVVIVVVIVIVVVVVVIVVVIIVIIVIIIIII***I**IIII*IVVVIFNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNVVVIV:*FFNNNIIIIIIVIIII*I**II*IIIIIII***:**IIIIIIVIIVVVIIVVVVVVVVVVVVVVVVVVVVVIVVVVVVVIIIVI**:*******IV*IIFNVIFNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMNNVVV:I:*VVNFNNFI*IIIIIIV**I*IV***IIII*IIII.I**:.::..:II*IIVVVVVVVVVVVVVVVVFVFVVVFFVVVVVIVVVVVVVI***:*I****IIFFFNN*IVNMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMNNFVI*I:*IFNVVVNVVVI**II**III**I******II*III*.:III:II*IIIIIVVVVVVVVVVVVVVVVVVVVVVVFFFFVVVVVVVVVVIV****I**II***VI*FV**II*FNMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMNFVI*I**INVVVVVVNFII****I*IIIIII***I**I*II*III*FI*IIIIIIVIVVIVVVVVVVVVVFFVVFVVFVFFFVVVVIIVVVVVVVVVVIVI*VIVII*IIIIVVNNI*:***NNMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMNFVI:II*FVV*IIFVIIVNIIII*I*IIIVIVV****IIII:**IIIVVVFVVIIIIVIIVVVVVVVVVVVVVVVVVVFFFFFFFFVVVVVVVVVVVVVVVIIVVVVIFFIFFFFVFN*:*****INNMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMNNF*:II:II*INIINFVIIVII***IIIIIVIVV*****IIV****IV:*IIIIIIIIVVVVVVVVVVVVVVVVVFVFFNFFFFFFFVFVVVIVFVVVVIVIIIVVVVVFVFFFFFFFVFFFF::*IIIVVVNNMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMNFV:I**IVVNNI*IVNVFIVI**II***I*IIVIVVVI**IIII*I**VIVIIIIIIVVIVIVVVVVVVVVVVFFVVVIVVVIFF*VIVVVFIVFVVVVIVIIIVVVVVFVFFFFFFFVFFNVI::V*IFIIVVNMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNFI***VIVFFNNNFVNNNNFVVVV*I*I*I*****IVVIVVVF*IVIIIVIVIIIIIIIVVVIVVVVIVVVVVVVVVIIIIIIIVFFFFFVVIII**VII**IVVVIIVVVFFFFVFFFNFFNVI:::*VVVVVIVVNMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMNNV:I*FVVIFNNNNNIINNNNNNNVV*I*II*******III*IIIII*II**FIIIIIIIIIIIVVVV*VVVVVVVVVVVVVI**IV**IIIIIVIIIFIIVIIIIVVIIVVFFFFFFFFNNNNNI:::*VVVVVIVVNMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNF****V*INNNNNNIIFNNNNNNNNVV*********I************II*V:I*IIIIIIIIIIIVVVVVVVIVVFI**VVVVFVIFVFVIII*VI*V*VIIVVVVVFVVVVVVFVFFFFNNNFI**:::**IVVIFVVNNMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMNF**:FVFINNNNNNI*VNNNNNNNNNVIIIF:I***I*III*IIIII*I*****IIII*I*IIIIIIIVIVVIVVVIIVVVIVIIIVIVVFIIIIIVFIVIFVFFFFFFVVFFVVVVVFFFFFNNNVI:*:::***VIVVFIVNNMMMMMMMMMMMMMM
MMMMMMMMMMMMMNV**IVVVFFNNNNNNFFNNNNNNNNNNVV**NNNN**II*IIIIIIIIIII**I*IIIIFVI*IIIIVIIIVIVIIV**VVIIVVIFVVIVIIVVVIVV*FFFFFFFFFFVVFVVVVVVFFFFFNNNVI:*:::***VIVVFIVNNMMMMMMMMMMMMMM
MMMMMMMMMMMMNI*IIVFI*VNNNNNFFFNNNNFNNNNNVNVIFNNNN**IIIIIVVIVVV***I*I*I*IIIIIIIIIIII*V*I:*IIVFVVVVVVVIVVIIII*::I*V*VFFFFNNFNNNNFFFFVFFVFFFNFVIVII**::::*I*IVVVVVNNMMMMMMMMMMMMM
MMMMMMMMMMMNIIIV*I*IINFFFFFFVFVVFFFFFNNIINIVIINNNV***IIVVIVVVII*IV**IIIV*VIIIIIVI**IVV**IVIVVVVVVIVV*:VIIVV:*:*VVFFVFFVFNFNNNNNNFFFFFFVFFFFFIIV***::::::*I**FIVVNNMMMMMMMMMMMM
MMMMMMMMMMNVI*F***:IVFVFFFFFFVFFNFFVFFIIINNNVIINNI****IVVVVVFIV*IVIIIII*VIVIIIV*:VIIIV*VVVVVIVI**IIVFV**IIFFNNNNNFNNNNFNNNNNNFFNNNNNFFFVVFFVV*:I*:::::::::::VIIVFNMMMMMMMMMMMM
MMMMMMMMMNFIIF:I:**IVFFFNFFNNNNNNNNNV*I*F*NNIIIINNNVIIIVVVVVFV*III*IIIIVIIIII:**VIV*VVIVVVVVVV*VVFFFFVFFFNNNNNNNNNNNFNVFFVVFFNNNNNNFNFFVVVVVF:*:::::::::::::*I*IVVNMMMMMMMMMMM
MMMMMMMMNNNFI*:I:**IVVNFVFFNNNNNNNNFIVVIINI:I*VINNNFFIIIVVVIVII*II*II*III:*VI**VVVIIIIVVVVIIIVVFFFFFNNNNNINNNNNNNNNVFVVVIIFVFNNFFVFFNNFVVVVVFFI:::::::::::::**I*IVINMMMMMMMMMM
MMMMMMMMNNIV*::::**I**FVNNNNNNNNNFIVII*NFNNN*:*VINNNNFVIIVVVVVVVIIIII**IV*IIIIFVI*VII***VIVVVVVFNNFFFIFFIIVVFFNNNNNVVIVVVIVVIFNNNFFVIFNNNFVVVVFV:::::::::::::***IIIFVFNMMMMMMM
MMMMMMMNNVI:.:*****IVIVVIIIV*IIFNFVIFNNNNNNNNNF*IINNFFFFFIVVVFVVVVVIIIII**IIV*VIIIIII**IVVVIVVIFNFFFIFFVVVNFIII**IVVIIVVVVVFNNFVVFVVNNNNFVVVVI.:::*::***VII*IFVIF**FNMMMMMMMMM
MMMMMMMNV**:::::IIIIV*:VI*V:II*VFVIINNNVFFNNNNNN*IFFFFFFIIIIVFVVVFVVVVI*II*I*****IIIVIVIIVVVVVVIVVFIIFVFVVVNVVII*IVVFVIVVFFVVVFVFVIIIFNNNFVVVVI::*::*V**I****IVIVFI*VNMMMMMMMM
MMMMMMNN**::::.:::**IIIIVVII*I*IIII*INNNNNNNNNNN**IFFFFFFFIIIVVVVVIII*II*I**I*II*I**VFVVVVVVIVIFFFVIIVFFVV*:**I*IVIINFFFNFFFFVVIIVIIVNNNFIIVFI::II*:VF*FIV**FVIFV*IIFNMMMMMMMM
MMMMMNF***::::::II::I*IIIIIIIIIIIII*I**IVNNNNNFFFFI*IIFFFFFFVVIVVVVVVIIVVII*IIIIIII*VIFNVVFVFVFFVVVIIIIFVIVIVFV*VI*VVVFFFNFFFVVVFVVIIIVVNNNII*I:I*VI*IFI*VIVIVIVFII*IINMMMMMMM
MMMMMNII*:.*::::::.**:IIVIIIIIIIIII***IIIIFVFNFFFFFF*V*FVVFFVFFVVVFFFVVIIVVVIIIIIIIVVVFNNVVNFVFFIVFVVVFFVVINFFNVII*IVIVFV*VFIVIVIIV**VIVNNNNIIIII*:II*F*VVNIIVVFVI***NNNMMMMMM
MMMMNNV::I*:::...:::*VIIIIIIVI*VIVVVI***IIIVVFFFFFFFFIFFFFFFFFFFVIVVVIVFFVVIIVIIIIIVVINNNFFNFFFFF:VVN*VVVVFFFNNIII*IIIVIV*II*I*VNFFVIIIIIFVVVI*V**:*IVFFFVVNFVVVVI*IFNFNMMMMMM
MMMMNFI::::::..::::I*VIIIVVIVII*IIIFI*III*IIIIVIIFFFFFFFFVFFFFFFFVVIVVVFVVVVIIIIIVVVFFVFFFVVVVFFV:IFFNFVFVVVFNNNIIFVF*FVIIVVIIIFIF**V**FVFIIVVIIVI**IIVI*IFVFIVNIIIFVFFNMMMMMM
MMMMNV*:*:*:....:::*IIII*IIVIIIIIIIIIVI:*IIVIVVVFVFFFVVVVFFFFFFFVVVVVVVFFVVVII*IIIIVNFVFNFVII:V.I*IIFFVFFFFFNNNFNFNFFVIIVIVVIIVF*FF:**INVNVVFVII*VIIIIVIIVVIFI*****VFNVNMMMMMM
MMMMNI::***::*I:::**:*I*V**IVIVIIIVVFFVI:IIVVVVVFFVFFVVVVVFFFFFFFFFFVVFVFVVVVIIIIIIVFFNNNNVVI*VIV*.:*FFIVVFFFFNFFVFIVIIFVVFFV*II*V***II*VIII*V*VIIFVFFVVIFF*I::::I:FFNVNNMMMMM
MMMMNI::*:::::I**::*VIVVIIIIIIVII*VVFFFFV*IIIVVVVFFFFFFFFFFFFFFFFFFFVVVVVVFI*II*IVVIVFFFNNFVV*:VFI::*FVVVIIVFVFFVVFFFVVFFFFVIV*IV*VIVIVII**VVFVIIIIVVVFIIFFVFVII***NFFIFNMMMMM
MMMMNV:::*::*::I:::*VII**IVVVVIIVIVVFFFVFVIIIIIVFFFFFFFVVFFFFFFFFFFFFVVV*IIVIIVVIIIIVIIVVVVNIV*IVFFIIIVIFVVVFIVVVVVVVIFFNFVIIIV::F*F**IVVVIIIVIIIIIIVVIIFFVF**VN*IINFINFNMMMMM
MMMMNV:::*:*::.:II*IIIIVI**IVVVVIIVIIVFFFFFFVVVFFFFFFFFFFFFFFFFFFFFVIVIFIFVVVV*I*IV***IIII**III.IVI:**..VVVIFV**IVIIFFFVNFVII**IIVF*II*V:IV*IIIIIIIIFVVFVFFNFVVNVFFFVFFNMMMMMM
MMMMNF*::**.::****IIIIIVVV:IIVVVVIIVFFFFFFFFFVVVVIFFFFFFFFFFFFFFFFFFVIVVVVFIVVI*IV*:*IVII**I**II:VI*II:II*IIVFVIIIIVFFNVFNFFVVI:*FVNI:*V**V**VIVVII:VVFFFIFFNVFFFVFVFNNNNMMMMM
MMMMNFV::::******IIIFVVVIFVVVVVFFFFVFNFFFFFFVIVIFFFFFFFFFFFFFFFFFFFVVVVVVVFIVVI*IV*:*IVII**I**II:VI*II:II*IIVFVIIIIVFFNVFNFFVVI:*FVNI:*V**V**VIVVII:VVFFFIFFNVFFFVFVFNNNNMMMMM
MMMMNFV*:***II**I*IVII*I*II*IVFFFFIFFNNFFVVFVIFFFFFFFFFFFFFFFFFFFFIVVVVVVIV*FF:II*VVIIVIII*I*I*IIII*****IVVVFFFFNVVVVFVVVVVIFFI*:IF*V:F*:*V*VFFVI*:IVIIIVF:VIFFFFFNFNNNMMMMMMM
MMMMMNIVIV*III*I***:IF**IIIVIIVVFFFFNFFFV*IVVVFFFFFFFFFFFFFFFFVIIVFVVVVVVVIVVVI**VVFFVIIII*V****IIIIII*I*IIII*IFIFFVIF*VVF*VFFV**IIIIFFI*FVII*VIFIVVI*IIIV*FVIIINFFVFFFNMMMMMM
MMMMMNFVIVVI*I*I.:*:*IIIIII*IIIVFVFVFFII*IIIIIVVVVFFFFFFVFFFFFVIVFVVVVVIVVVVVVVI*II**IIIFVVVVV**I*IIIIIIVIV*::FNNVIVII**VVFI*VVIVFVVIVFFIFF*I:I*F**IIVVVV*FVFFVFFVFNFVFNMMMMMM
MMMMMNNI:VIIVVII**::**IIII*V**IIIIVFFFVVVIIIIIIIIIVVIFFFVVFFFFFFFFFFVVVVIIIVIIVVVVI**V*III*I*IVIF*IVFFFFVIFNFFNFFFNNIIVFI**:V*VFF:IV*I**III*::I:***I*:VI***IIVFNVVVIIFVNMMMMMM
MMMMMMNIVIIIII**::.:.**VVII*V**IIIIVFFFVVVIIIIIIIVVVVFFFFFFFFFFFFVVVVVVIIIIVIIVI:*V::**I::I*II**F*I*VNIVVFFVNNNFFFFI*I***V*.:.*::**:I:IF*VV::VIVI:VIVVVFVFIIFIFN*VIVIVNMMMMMMM
MMMMMMNFVVVVI*:I::.:::IIVV::::*II*IFFFFFVFVIIIIIIIVVVFFFFFFFFFFFFFFVIIIIVIIIIV*:I*IVIV::**V*III:VVFVNIFFFFFFFNFNNFFVFVV:I.*.::::*I*:IVIF:**V*I*V**IIIIVVVIFFVNNIIV*NVNMMMMMMMM
MMMMMMMNVVFFVI*:*....:::::.::*II*****IIIIVVVVIVIVIIFFFVFFFFFFFFFFV*IVVVVVVVIII**I:I***V*VFFVIVVFVVV*FFFFFFFFFFFNV*IIIFF**I::F*F*I*VIIFIFFV**I:::*I*IIVIVIVFNFNFVFVVVFNMMMMMMMM
MMMMMMMNNVVVVV*:*I:..:....:***FF*V*IFIVVFIVFFVVIVFVIVVFFFFFVFFIVVFFVVVVI*IIIII:*:.:IIVFFFFFFVIVFFNIVFFVFFFFFFFFFFFFIVFFFFVFFFFFVFFFFVIIVII*:.::**VIVV*VFVFFFIIIFFVVVNMMMMMMMMM
MMMMMMMMNFVV**:*VI*:.......*:::II*I*VVFFFVIVVVIIVVVFFFFFFFFFFFVIVVFFFFVFVVVIVI*:*I:*IIVFFIVFFFFFVVFFVII*FFFIVFFFFFNNFNFNNNNVFFFFVFFFFVV*I**:::IFV:IVVIVIVFVIIIVFVVVNNMMMMMMMMM
MMMMMMMMMNFI*IV*IV*............:IIVIFVIFI*FVFNVFNNFNFFFVVFFVVFFFVVVVVVI*I***:*:***IFFFIFFVFFFFFVIFFFFVVFFFFFFFFFFFFFFFNNNFNNNNNNNFFVFV*::.I:*VV:VIVFIVIFIIV***VVFNMMMMMMMMMMMM
MMMMMMMMMMNVI:IIFI**:...:..:.*.I*IFVFFFFII*VIFVVFVFFFFIVVVIFVIVVVVVVII*III*::*IIIIIFIFFVVFFFFFFFFFFFFFFFFFFFFFVFFFFFNNNN*VNNNNNNNNFFVFV*::.I:*VV:VIVFIVIFIIV***VVFNMMMMMMMMMMM
MMMMMMMMMMNNVIIV:VII*:....::.::*....::VVVFFFFIV*I*IFIV*:*IIIVIIFVVIV:**:.:.IVIIVVVVIVFFFFFFFFFFFFFFFFFFFFFFVFFFFFFFFFFFVVFVFFFFFFFFNV*I*V:::*::*F*VVI*I*I**IIIVVNMMMMMMMMMMMMM
MMMMMMMMMMMNNF:II*II.*:...........*VV:IFIVFFNNIFIFIIII*IIIVIV*II*:*:..::IIIIVIVFVVFFIFFFFFFFFFFFFFFFFFFFFFFVFFFFFFFFFFVVIIVIFVIIVVFFFNNNFVFFVI*:**:IFFF*IV**VVIIVVNMMMMMMMMMMM
MMMMMMMMMMMMNNIFFVFF***...........:*VII:*VVFFFVVIFVVVFFFFFVFV**I:*:**IIIVFVFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFVFIFFFFFFVIVIIIIVVFFFFFFFNNNFNFN:NIVFV:IVFVF*I**V*IVVNMMMMMMMMMMMMMMM
MMMMMMMMMMMMMNNIIIIIVF*::.*V::........*VIII*VFVFFFFFFFFVVFVV*:IIIVIVIVIFFVVFVVIIVFFFFFFFFFFFFFFFFFFFFFFVVFFFFFFFFFFVVIIVIFVIIVVFFFNNNFNFNFFIIFFNNIFIV**II**VVVNMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMNNIVVFVFNIV:I**..*..*:......*V*VF*:....:IVVV::*V:*IVVVVFFVIVFVV*IVVVVVFFFFFFFFFFFFFFF*VFFVIFFFFFFFVVI*IVIFFIFFVVFFFNNNVINNFFIIFFNNFFFFFVI**:*FVFNMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMNFIVVV**VVIVNVI*VVV*::*.II:**......*FF**IIV*:IVIFFVIVV**IVVVVVVVIIIIVFFFFFFFFFFFFFFIIFVFFFFFFFFFI*III*::IVFFFFFVNFV:..FIF*NFNNFFFFFVI****V*VFNMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMNFVIFVFNFFVVVVVIINNVV:.:*:.*.....::....I*::*IVIII:*FVVIIVVVVVII*VIVVIVFVVIVI*VIFVFFFFFIFFFFVFVI**:*::::VVV*FVFII:.::*NIVVNNFNFFVII****V*VFNMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNNFVF*IVI*FVFVFNNVV**I:.:VFVFIVFVF*F:..I:VIIVFVVV*....::*VVVIVVIIVIVIIVVI*:...*I:II:I.FFVVFFF*F**:.*:**:*:*..VIII*VFFFVNNNFVV*IIFF***IVNNMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMNFVFII*VVNIVFI::*:*FFIFV:..:..INIFF*I::I:***IIII**F:I:**::::::I*:IV:....*:*FVFFFFFFVIVIFFV*:::**::....IV*IVIIIIFIFFFNNFVVI*:*F*IIIVFNMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMNNFFFFVFNNIFFIFIIFFFFVIV*:*:*:IFNV*::VIVFI*VVVVFVI*VIVIFII***IIIVVFFVFFFFFFFV*FV:FIIFVVFVI**.::VVIIIVVIVI*I*IVFNFNNIVFVI::IF***FVNNMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMNFFFNNVFVVVFV**VI*VFFFIVI:*I**FFFV*VFV:*:IV:I.IIVVVVII::**::*:I**FFFFVFFIIIIVFVII**III:.:..*VIVVIIIVI*IIIF*VVNNFFVV*I:*IV**IVFNMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMNFFNN*NFVFNFFFIVV**IFI*NNV*I::::FIV*VIVV:*..::II*.I*:*II.IIII***IVI*:.*:..:IVII**V::*VI*.:VIVVVII:*II*INF**VVI*:.:*I***IFNMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMNNFFNFFII*VVFVV*VVIIFFVN*VIIIVI.:...:I*:*::..::*:..:.:.**:::*::I::II::::*:I*IV**II**I*.*FI*IV*::*II*IIF**IF:*I****VNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFFV*FV::*VV*VIFFFV**NN*V**III:*:**:::......:II*..I:***I:*:*..:**I:*I:.:*I**:*FV*I*II**V*IVVVV*IVI*IIF**IF:*I****FNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFIFFFFVVVVVVVFFNFV*NNNVFFNVVIVNVVF:I*IF::*:.:**IV*:::*I*V**:I**::IV::II:FI***I*V*V*III*FFIIV*IV**III***NNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNVI*FVVVVVVVFFFFNNNFVVFIIVVIIII**I**:*IV*:.:*VF*I*IIVVVIVFF*VIFIVVVIFIVFVIIFFVIVIFF*VVVV*NNFI*FIVVVNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFVVVVVVVVVFFI*FFNFV:VIVFNIFVFFVI*VIVVIIIFIVFVIVI******IFFVFFFVNNNFNFFFNV::**:VIF*VVFIIFV*IFFVNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFVVVVVVVIFFNFINNFVVFVNNNFFNFNFFFFFVFFFIFIVFFFVFFIIFNNFNNN*FIIVIVNFI*:III*V*IVIV*:*IFNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNFVVVVVV*FFNVFNFFFNFNNNNNFNNNNNFFVVVFVIVFIFVVFFVIIIIVNVFIINFNNNVFF*I*I*FVVVVF*:*IFNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNVVVVVVFFFFNFFFV*IVVFFFVVVVIIVIIIVFFFFFFVFFVIIFVFFFFNVI*VIIVVVIVIFVIVVIVVFNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNFVVFFFFFFFVFVFFVFIVVVFFFFFVIIFVIFFVFFVFFFFVVVVVVINVIVFV***I*II*IFNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNFFFFVNFFNNNNNFVFFFNNNFINFIIVVVFFFVFFFFNVNFFFVVVFFFFIFIFNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNFVVIVFFVV*VVVIVIIIFNNINNFFFVFFNNNNFNVFFFNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNFFFVVIVVIVVVVFFFFFFNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
`}
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
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 p-3 text-xs sm:text-sm gap-6">
            <div className="flex flex-col gap-2 text-green-400">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 pulse"></span>
                <span className="text-yellow-400">SYSTEM:</span> TRUTHGUARD v0.0.1
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 pulse"></span>
                <span className="text-yellow-400">MODE:</span> ACTIVE
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 pulse"></span>
                <span className="text-yellow-400">UPTIME:</span> 99.97%
              </div>
            </div>

            <div className="flex justify-around flex-1 w-full text-sm sm:text-md">
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-green-400">{globalStats.totalSources}</div>
                <div className="text-yellow-400">SOURCES</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-green-400">{globalStats.avgTruthScore}%</div>
                <div className="text-yellow-400">AVG TRUTH INDEX</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-red-400">{globalStats.criticalBias}</div>
                <div className="text-yellow-400">CRITICAL BIAS</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-green-400">{globalStats.activeRegions}</div>
                <div className="text-yellow-400">REGIONS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </div>
  );
}