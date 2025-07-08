'use client';
import React, { useEffect, useRef, useState } from 'react';
import Globe from './components/Globe'; // Import your Globe component

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

  const terminalRef = useRef<HTMLDivElement>(null);
  //const animationRef = useRef<number | undefined>(undefined);

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
      summary: 'Unverified claims of coordinated attacks. Truth score low due to conflicting technical details across sources.',
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

    addTerminalLine('█ TRUTHGUARD SYSTEM INITIALIZED');
    addTerminalLine(`├─ Connected to ${stats.activeRegions} regions`);
    addTerminalLine(`├─ Monitoring ${stats.totalSources} sources`);
    addTerminalLine(`├─ Global truth average: ${stats.avgTruthScore}%`);
    addTerminalLine(`└─ System ready`);
  }, []);

  useEffect(() => {

  }, []);

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
          addTerminalLine(`█ TRUTH SCORE: ${story.truthScore ?? 0}%`);
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

      <div className="max-w-[1500px] mx-auto">
        <div className="mb-6 border border-green-400 p-6 rounded-border border-glow-green">
          <div className="text-center mb-6">
            <pre className="text-green-400 inline-block text-xs">
{`╔═════════════════════════════════════════════════════════════════════════════════════════════╗
║   ████████╗██████╗ ██╗   ██╗████████╗██╗  ██╗ ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗      ║
║   ╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗     ║
║      ██║   ██████╔╝██║   ██║   ██║   ███████║██║  ███╗██║   ██║███████║██████╔╝██║  ██║     ║
║      ██║   ██╔══██╗██║   ██║   ██║   ██╔══██║██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║     ║
║      ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝     ║
║      ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝      ║
║                                                                                             ║
║                         GLOBAL NEWS DETECTION & BIAS NEUTRALIZATION                         ║
╚═════════════════════════════════════════════════════════════════════════════════════════════╝
║   █ TRUTHGUARD v0.0.1 - ASCII Edition            ║
║   └─ Monitoring global narratives in real-time   ║
╚══════════════════════════════════════════════════╝`}
            </pre>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="border border-green-400 p-4 h-[500px] relative rounded-border border-glow-green">
                <div className="absolute top-2 left-2 text-xs text-yellow-400 z-10">
                  ◉ GLOBAL TRUTH NETWORK
                </div>
                <div className="h-full w-full flex items-center justify-center cursor-move select-none">
                  <Globe stories={sampleStories} />
                </div>

                {(hoveredStory || selectedStory) && (
                  <div className="absolute top-12 left-2 bg-black border border-green-400 p-2 rounded-border text-xs max-w-xs">
                    <div className="text-yellow-400 font-bold mb-1">{(hoveredStory || selectedStory).location.name}</div>
                    <div className="text-green-400">Category: {(hoveredStory || selectedStory).category}</div>
                    <div className="text-green-400">Sources: {(hoveredStory || selectedStory).sources}</div>
                    <div className="text-green-400">Truth: {(hoveredStory || selectedStory).truthScore}%</div>
                  </div>
                )}
              </div>

              <div className={`border border-green-400 p-4 ${getTerminalHeight()} mt-4 overflow-y-auto rounded-border border-glow-green terminal-font`} ref={terminalRef}>
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
              <div className="border border-green-400 p-4 h-[250px] overflow-y-auto rounded-border border-glow-green">
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
                <div className="border border-green-400 p-4 rounded-border border-glow-green h-[670px] overflow-y-auto">
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
                          <div className="text-yellow-400 mb-1">TRUTH SCORE</div>
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

          <div className="mt-6 border border-green-400 p-3 rounded-border border-glow-green">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-4">
                <span className="text-green-400">█ SYSTEM: TRUTHGUARD v0.0.1</span>
                <span className="text-green-400">█ MODE: ACTIVE</span>
              </div>
              <div className="flex items-center gap-4 text-green-400">
                <span>█ UPTIME: 99.97%</span>
                <span>█ ALGORITHMS: <span className="text-green-400">OPTIMAL</span></span>
                <span>█ QUEUE: <span className="text-yellow-400">{stories.filter(s => s.bias > 30).length}</span> PRIORITY</span>
              </div>
              <div className="text-green-400 pulse">███</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4 text-xs">
            <div className="text-center p-3 border border-green-400 rounded-border">
              <div className="text-yellow-400">SOURCES</div>
              <div className="text-2xl font-bold text-green-400">{globalStats.totalSources}</div>
            </div>
            <div className="text-center p-3 border border-green-400 rounded-border">
              <div className="text-yellow-400">AVG TRUTH</div>
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
  );
}