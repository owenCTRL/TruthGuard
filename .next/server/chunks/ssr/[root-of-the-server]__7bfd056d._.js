module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TruthGuardASCII)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// Enhanced Globe rendering class with better detail
class ASCIIGlobe {
    canvas;
    width;
    height;
    radius;
    rotation = 0;
    tilt = 0.3;
    zoom = 1.0;
    autoRotate = true;
    characters = ' .·:+=#@█';
    setRotation(rotation) {
        this.rotation = rotation;
    }
    setAutoRotate(autoRotate) {
        this.autoRotate = autoRotate;
    }
    getAutoRotate() {
        return this.autoRotate;
    }
    setZoom(zoom) {
        this.zoom = Math.max(0.8, Math.min(2.0, zoom));
    }
    getZoom() {
        return this.zoom;
    }
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.radius = Math.min(width, height) * 0.4;
        this.canvas = Array(height).fill(null).map(()=>Array(width).fill(' '));
    }
    latLngTo3D(lat, lng, rotation) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + rotation) * Math.PI / 180;
        const x = this.radius * Math.sin(phi) * Math.cos(theta) * this.zoom;
        const y = this.radius * Math.cos(phi) * this.zoom;
        const z = this.radius * Math.sin(phi) * Math.sin(theta) * this.zoom;
        const tiltedY = y * Math.cos(this.tilt) - z * Math.sin(this.tilt);
        const tiltedZ = y * Math.sin(this.tilt) + z * Math.cos(this.tilt);
        return {
            x,
            y: tiltedY,
            z: tiltedZ
        };
    }
    project3DTo2D(x, y, z) {
        const screenX = Math.round(x + this.width / 2);
        const screenY = Math.round(-y + this.height / 2);
        const visible = z > -this.radius * 0.8 * this.zoom;
        return {
            x: screenX,
            y: screenY,
            visible
        };
    }
    clear() {
        this.canvas = Array(this.height).fill(null).map(()=>Array(this.width).fill(' '));
    }
    drawGlobe() {
        // Draw the globe sphere with higher resolution
        for(let lat = -90; lat <= 90; lat += 2){
            for(let lng = -180; lng <= 180; lng += 2){
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
                        const wavePattern = Math.sin(lat * 0.1 + lng * 0.1) > 0;
                        this.canvas[screenY][screenX] = brightness > 0.3 ? wavePattern ? '~' : '≈' : '·';
                    }
                }
            }
        }
        // Draw latitude lines (more detailed)
        for(let lat = -75; lat <= 75; lat += 15){
            for(let lng = -180; lng <= 180; lng += 1){
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
        for(let lng = -180; lng <= 180; lng += 15){
            for(let lat = -90; lat <= 90; lat += 1){
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
        for(let i = -180; i <= 180; i += 1){
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
    isDetailedLandmass(lat, lng) {
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
            if (lng > 100 && lng < 110 || lng > 115 && lng < 125 || lng > 130 && lng < 135) {
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
    isCoastline(lat, lng) {
        if (!this.isDetailedLandmass(lat, lng)) return false;
        // Check if any neighbor is water
        for(let dlat = -2; dlat <= 2; dlat += 2){
            for(let dlng = -2; dlng <= 2; dlng += 2){
                if (dlat === 0 && dlng === 0) continue;
                if (!this.isDetailedLandmass(lat + dlat, lng + dlng)) {
                    return true;
                }
            }
        }
        return false;
    }
    getElevation(lat, lng) {
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
    drawMarker(lat, lng, symbol, highlight = false) {
        const { x, y, z } = this.latLngTo3D(lat, lng, this.rotation);
        const { x: screenX, y: screenY, visible } = this.project3DTo2D(x, y, z);
        if (visible && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
            this.canvas[screenY][screenX] = symbol;
            if (highlight) {
                // Draw a cross pattern for highlight
                const positions = [
                    [
                        -1,
                        0
                    ],
                    [
                        1,
                        0
                    ],
                    [
                        0,
                        -1
                    ],
                    [
                        0,
                        1
                    ]
                ];
                positions.forEach(([dx, dy])=>{
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
        return {
            visible,
            screenX,
            screenY
        };
    }
    drawConnection(lat1, lng1, lat2, lng2) {
        const steps = 30;
        for(let i = 0; i <= steps; i++){
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
    rotate(delta) {
        this.rotation = (this.rotation + delta) % 360;
    }
    setTilt(tilt) {
        this.tilt = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, tilt));
    }
    toString() {
        return this.canvas.map((row)=>row.join('')).join('\n');
    }
}
const ModernProgressBar = ({ value, max = 100, width = 20, showPercentage = true })=>{
    const filled = Math.round(value / max * width);
    const bar = `█`.repeat(filled) + `░`.repeat(width - filled);
    return showPercentage ? `[${bar}] ${value}%` : `[${bar}]`;
};
function TruthGuardASCII() {
    const [stories, setStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedStory, setSelectedStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredStory, setHoveredStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [terminalOutput, setTerminalOutput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scanProgress, setScanProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [globalStats, setGlobalStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        totalSources: 0,
        avgTruthScore: 0,
        criticalBias: 0,
        activeRegions: 0
    });
    const [globeRotation, setGlobeRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [globeTilt, setGlobeTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0.3);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastMousePos, setLastMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [isMouseOverGlobe, setIsMouseOverGlobe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [globeZoom, setGlobeZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1.0);
    const terminalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const globeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const sampleStories = [
        {
            id: '1',
            title: 'NATO Eastern European Military Movement Reports',
            category: 'DEFENSE',
            severity: 'CRITICAL',
            location: {
                lat: 52.23,
                lng: 21.01,
                name: 'Warsaw',
                country: 'Poland'
            },
            reliability: 74,
            bias: 32,
            impact: 89,
            sources: 147,
            timestamp: new Date(),
            summary: 'Multiple sources report military movements. Truth analysis indicates 68% factual content with significant bias from all sides.',
            keyPlayers: [
                'NATO',
                'Pentagon',
                'Polish MoD'
            ],
            sentiment: 'NEGATIVE',
            connections: [
                '2',
                '3'
            ],
            truthScore: 68,
            abstractedContent: 'Military alliance conducting routine exercises in member state territory. Scale and timing subject to interpretation bias.',
            biasedClaims: [
                'Unprecedented military buildup',
                'Aggressive posturing',
                'Defensive response only'
            ],
            verifiedFacts: [
                'Military exercises scheduled',
                'Standard NATO protocols followed',
                '3,000 personnel involved'
            ]
        },
        {
            id: '2',
            title: 'Global Semiconductor Supply Chain Analysis',
            category: 'ECONOMICS',
            severity: 'HIGH',
            location: {
                lat: 25.03,
                lng: 121.56,
                name: 'Taipei',
                country: 'Taiwan'
            },
            reliability: 81,
            bias: 18,
            impact: 76,
            sources: 238,
            timestamp: new Date(),
            summary: 'Conflicting reports on chip shortage severity. Mean analysis suggests 15-25% capacity impact, not 40% as claimed.',
            keyPlayers: [
                'TSMC',
                'Samsung',
                'Intel'
            ],
            sentiment: 'NEGATIVE',
            connections: [
                '1',
                '3'
            ],
            truthScore: 81,
            abstractedContent: 'Semiconductor production experiencing moderate constraints. Market speculation amplifying actual impact metrics.',
            biasedClaims: [
                'Industry collapse imminent',
                'No shortage exists',
                '40% production drop'
            ],
            verifiedFacts: [
                '15-25% capacity reduction',
                'Supply chain delays averaging 3 weeks',
                'Automotive sector most affected'
            ]
        },
        {
            id: '3',
            title: 'Financial Infrastructure Security Event',
            category: 'CYBER',
            severity: 'CRITICAL',
            location: {
                lat: 38.89,
                lng: -77.03,
                name: 'Washington DC',
                country: 'USA'
            },
            reliability: 58,
            bias: 45,
            impact: 92,
            sources: 89,
            timestamp: new Date(),
            summary: 'Unverified claims of coordinated attacks. Truth score low due to conflicting technical details across sources.',
            keyPlayers: [
                'FBI',
                'CISA',
                'Banks'
            ],
            sentiment: 'NEGATIVE',
            connections: [
                '1',
                '2',
                '4'
            ],
            truthScore: 58,
            abstractedContent: 'Security incident reported at financial institutions. Technical specifics unconfirmed. Standard protocols activated.',
            biasedClaims: [
                'State-sponsored attack',
                'System completely compromised',
                'Minor glitch only'
            ],
            verifiedFacts: [
                'Security protocols activated',
                'No confirmed data breach',
                'Investigation ongoing'
            ]
        },
        {
            id: '4',
            title: 'European Energy Infrastructure Investment',
            category: 'ENERGY',
            severity: 'MEDIUM',
            location: {
                lat: 51.50,
                lng: -0.12,
                name: 'London',
                country: 'UK'
            },
            reliability: 85,
            bias: 22,
            impact: 68,
            sources: 131,
            timestamp: new Date(),
            summary: 'Investment figures vary by €200B across sources. Averaged analysis indicates €350B most likely figure.',
            keyPlayers: [
                'EU Commission',
                'UK Gov'
            ],
            sentiment: 'POSITIVE',
            connections: [
                '3'
            ],
            truthScore: 85,
            abstractedContent: 'Major renewable energy investment announced. Actual commitment level between €300-400B based on source reconciliation.',
            biasedClaims: [
                '€500B guaranteed',
                'Mere political gesture',
                'Immediate implementation'
            ],
            verifiedFacts: [
                '€350B median commitment',
                '5-year rollout plan',
                '12 member states participating'
            ]
        },
        {
            id: '5',
            title: 'Pacific Trade Route Disruption Claims',
            category: 'ECONOMICS',
            severity: 'HIGH',
            location: {
                lat: 35.67,
                lng: 139.65,
                name: 'Tokyo',
                country: 'Japan'
            },
            reliability: 72,
            bias: 28,
            impact: 83,
            sources: 156,
            timestamp: new Date(),
            summary: 'Shipping delays reported with varying severity. Analysis shows 20% impact, not 60% as some sources claim.',
            keyPlayers: [
                'Shipping Corps',
                'Port Authorities'
            ],
            sentiment: 'NEGATIVE',
            connections: [
                '2'
            ],
            truthScore: 72,
            abstractedContent: 'Moderate shipping delays affecting Pacific routes. Weather and port congestion primary factors.',
            biasedClaims: [
                'Complete route closure',
                '60% capacity loss',
                'No significant impact'
            ],
            verifiedFacts: [
                '20% delay increase',
                '2-3 day average delays',
                'Alternative routes available'
            ]
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setStories(sampleStories);
        const stats = {
            totalSources: sampleStories.reduce((acc, s)=>acc + s.sources, 0),
            avgTruthScore: Math.round(sampleStories.reduce((acc, s)=>acc + (s.truthScore || 0), 0) / sampleStories.length),
            criticalBias: sampleStories.filter((s)=>s.bias > 30).length,
            activeRegions: new Set(sampleStories.map((s)=>s.location.country)).size
        };
        setGlobalStats(stats);
        globeRef.current = new ASCIIGlobe(80, 40);
        addTerminalLine('█ TRUTHGUARD SYSTEM INITIALIZED');
        addTerminalLine(`├─ Connected to ${stats.activeRegions} regions`);
        addTerminalLine(`├─ Monitoring ${stats.totalSources} sources`);
        addTerminalLine(`├─ Global truth average: ${stats.avgTruthScore}%`);
        addTerminalLine(`└─ System ready`);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const animate = ()=>{
            if (!isMouseOverGlobe && globeRef.current?.getAutoRotate()) {
                setGlobeRotation((prev)=>(prev + 0.5) % 360);
            }
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
        return ()=>{
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        isMouseOverGlobe
    ]);
    const handleMouseDown = (e)=>{
        setIsDragging(true);
        setLastMousePos({
            x: e.clientX,
            y: e.clientY
        });
    };
    const handleMouseMove = (e)=>{
        if (!isDragging) return;
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;
        setGlobeRotation((prev)=>(prev - deltaX * 0.5) % 360);
        setGlobeTilt((prev)=>Math.max(-1, Math.min(1, prev + deltaY * 0.01)));
        setLastMousePos({
            x: e.clientX,
            y: e.clientY
        });
    };
    const handleMouseUp = ()=>{
        setIsDragging(false);
    };
    const handleZoomIn = ()=>{
        if (globeRef.current) {
            const newZoom = globeRef.current.getZoom() + 0.1;
            globeRef.current.setZoom(newZoom);
            setGlobeZoom(newZoom);
        }
    };
    const handleZoomOut = ()=>{
        if (globeRef.current) {
            const newZoom = globeRef.current.getZoom() - 0.1;
            globeRef.current.setZoom(newZoom);
            setGlobeZoom(newZoom);
        }
    };
    const addTerminalLine = (line)=>{
        setTerminalOutput((prev)=>[
                ...prev,
                line
            ]);
        setTimeout(()=>{
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, 0);
    };
    const clearTerminal = ()=>{
        setTerminalOutput([
            '█ TRUTHGUARD TERMINAL v0.0.1'
        ]);
    };
    const analyzeStory = (story)=>{
        clearTerminal();
        setIsProcessing(true);
        setScanProgress(0);
        setSelectedStory(story);
        addTerminalLine(`├─ ANALYZING: ${story.title}`);
        addTerminalLine(`├─ Location: ${story.location.name}, ${story.location.country}`);
        addTerminalLine(`├─ Aggregating ${story.sources} sources...`);
        addTerminalLine('│');
        const steps = [
            {
                p: 20,
                msg: '├─ Cross-referencing primary sources...'
            },
            {
                p: 40,
                msg: '├─ Detecting bias patterns...'
            },
            {
                p: 60,
                msg: '├─ Verifying factual claims...'
            },
            {
                p: 80,
                msg: '├─ Generating abstracted content...'
            },
            {
                p: 100,
                msg: '└─ Analysis complete.'
            }
        ];
        steps.forEach(({ p, msg }, index)=>{
            setTimeout(()=>{
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
                    story.verifiedFacts?.forEach((fact)=>{
                        addTerminalLine(`   ✓ ${fact}`);
                    });
                }
            }, index * 400);
        });
    };
    const getMarkerSymbol = (category, severity)=>{
        const symbols = {
            DEFENSE: {
                CRITICAL: '◉',
                HIGH: '●',
                MEDIUM: '○',
                LOW: '·'
            },
            ECONOMICS: {
                CRITICAL: '◉',
                HIGH: '●',
                MEDIUM: '○',
                LOW: '·'
            },
            CYBER: {
                CRITICAL: '▲',
                HIGH: '△',
                MEDIUM: '▽',
                LOW: '·'
            },
            ENERGY: {
                CRITICAL: '★',
                HIGH: '☆',
                MEDIUM: '✦',
                LOW: '·'
            },
            POLITICS: {
                CRITICAL: '◆',
                HIGH: '◇',
                MEDIUM: '◈',
                LOW: '·'
            }
        };
        return symbols[category]?.[severity] || '•';
    };
    const renderGlobe = ()=>{
        const globe = globeRef.current;
        if (!globe) return '';
        globe.clear();
        globe.setRotation(globeRotation);
        globe.setTilt(globeTilt);
        globe.drawGlobe();
        stories.forEach((story)=>{
            if (story.connections) {
                story.connections.forEach((targetId)=>{
                    const target = stories.find((s)=>s.id === targetId);
                    if (target) {
                        globe.drawConnection(story.location.lat, story.location.lng, target.location.lat, target.location.lng);
                    }
                });
            }
        });
        stories.forEach((story)=>{
            const symbol = getMarkerSymbol(story.category, story.severity);
            const isSelected = selectedStory?.id === story.id;
            const isHovered = hoveredStory?.id === story.id;
            globe.drawMarker(story.location.lat, story.location.lng, symbol, isSelected || isHovered || story.severity === 'CRITICAL');
        });
        return globe.toString();
    };
    // Calculate terminal height dynamically to align with story details
    const getTerminalHeight = ()=>{
        if (!selectedStory) return 'h-[250px]';
        // Match the height of the story details panel when displayed
        return 'h-[420px]';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-bd75cf6573414fae" + " " + "min-h-screen bg-black text-green-400 font-mono p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "bd75cf6573414fae",
                children: '@import "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap";body{color:#0f0;background:#000;margin:0;font-family:Fira Code,monospace;overflow-x:hidden}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:#010;border:1px solid #030}::-webkit-scrollbar-thumb{background:#00e277}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.pulse{animation:2s infinite pulse}@keyframes blink{0%,50%{opacity:1}51%,to{opacity:0}}.blink{animation:1s infinite blink}.terminal-font{font-family:Fira Code,monospace;font-weight:400}.rounded-border{border-radius:4px}.border-glow-green{box-shadow:0 0 10px #00ff001a,inset 0 0 10px #00ff0005}.border-glow-yellow{box-shadow:0 0 10px #ffff001a,inset 0 0 10px #ffff0005}.border-glow-red{box-shadow:0 0 10px #ff00001a,inset 0 0 10px #ff000005}.story-card-hover{background:#00ff0008;border-color:#0f0c}.story-card-selected{background:#ffff000d;border-color:#ff0c}.zoom-button{color:#00e277;cursor:pointer;background:0 0;border:1px solid #00e277;padding:4px 8px;font-family:Fira Code,monospace;font-size:12px;transition:all .2s}.zoom-button:hover{background:#00ff001a;box-shadow:0 0 5px #00ff004d}.zoom-button:active{background:#0f03}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-bd75cf6573414fae" + " " + "max-w-[1500px] mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bd75cf6573414fae" + " " + "mb-6 border border-green-400 p-6 rounded-border border-glow-green",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bd75cf6573414fae" + " " + "text-center mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "jsx-bd75cf6573414fae" + " " + "text-green-400 inline-block text-xs",
                                children: `╔═════════════════════════════════════════════════════════════════════════════════════════════╗
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
╚══════════════════════════════════════════════════╝`
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 748,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 747,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bd75cf6573414fae" + " " + "grid grid-cols-1 lg:grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bd75cf6573414fae" + " " + "lg:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onMouseEnter: ()=>setIsMouseOverGlobe(true),
                                            onMouseLeave: ()=>setIsMouseOverGlobe(false),
                                            className: "jsx-bd75cf6573414fae" + " " + "border border-green-400 p-4 h-[500px] relative rounded-border border-glow-green",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "absolute top-2 left-2 text-xs text-yellow-400 z-10",
                                                    children: "◉ GLOBAL TRUTH NETWORK"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "absolute top-2 right-2 text-xs text-green-400 z-10 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-bd75cf6573414fae",
                                                            children: "DRAG TO ROTATE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 775,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "flex gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleZoomOut,
                                                                    className: "jsx-bd75cf6573414fae" + " " + "zoom-button rounded-border",
                                                                    children: "−"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 777,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleZoomIn,
                                                                    className: "jsx-bd75cf6573414fae" + " " + "zoom-button rounded-border",
                                                                    children: "+"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 778,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 776,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 774,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onMouseDown: handleMouseDown,
                                                    onMouseMove: handleMouseMove,
                                                    onMouseUp: handleMouseUp,
                                                    onMouseLeave: handleMouseUp,
                                                    className: "jsx-bd75cf6573414fae" + " " + "h-full flex items-center justify-center cursor-move select-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "jsx-bd75cf6573414fae" + " " + "text-green-400 text-[10px] leading-none",
                                                        children: renderGlobe()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 789,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "absolute bottom-2 left-2 text-xs space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                            children: "◉ LEGEND"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 793,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "grid grid-cols-3 gap-2 text-[10px] text-green-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: "▓█ Land"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 795,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: "~≈ Ocean"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 796,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: "▲ Mountains"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 797,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: "= Equator"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 798,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: "| Prime Meridian"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 799,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: "· Grid Lines"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 800,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 794,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 mt-2",
                                                            children: "◉ ACTIVE REGIONS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 802,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "grid grid-cols-2 gap-2 text-[10px] text-green-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        "North America: ",
                                                                        stories.filter((s)=>s.location.lng > -170 && s.location.lng < -50).length
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 804,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        "Europe: ",
                                                                        stories.filter((s)=>s.location.lng > -25 && s.location.lng < 40).length
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 805,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        "Asia: ",
                                                                        stories.filter((s)=>s.location.lng > 40 && s.location.lng < 180).length
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 806,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        "Critical: ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-red-400",
                                                                            children: stories.filter((s)=>s.severity === 'CRITICAL').length
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 807,
                                                                            columnNumber: 36
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 807,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 803,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "absolute bottom-2 right-2 text-xs text-green-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae",
                                                            children: [
                                                                "CONNECTIONS: ",
                                                                stories.reduce((acc, s)=>acc + (s.connections?.length || 0), 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 812,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae",
                                                            children: [
                                                                "ROTATION: ",
                                                                Math.round(globeRotation),
                                                                "°"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 813,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae",
                                                            children: [
                                                                "ZOOM: ",
                                                                Math.round(globeZoom * 100),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 814,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 811,
                                                    columnNumber: 17
                                                }, this),
                                                (hoveredStory || selectedStory) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "absolute top-12 left-2 bg-black border border-green-400 p-2 rounded-border text-xs max-w-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 font-bold mb-1",
                                                            children: (hoveredStory || selectedStory)?.location?.name ?? ''
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 819,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                            children: [
                                                                "Category: ",
                                                                (hoveredStory || selectedStory)?.category ?? ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 822,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                            children: [
                                                                "Sources: ",
                                                                (hoveredStory || selectedStory)?.sources ?? ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 825,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                            children: [
                                                                "Truth: ",
                                                                (hoveredStory || selectedStory)?.truthScore ?? '',
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 828,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 818,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 767,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: terminalRef,
                                            className: "jsx-bd75cf6573414fae" + " " + `border border-green-400 p-4 ${getTerminalHeight()} mt-4 overflow-y-auto rounded-border border-glow-green terminal-font`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bd75cf6573414fae" + " " + "text-xs space-y-1 text-green-400",
                                                children: [
                                                    terminalOutput.map((line, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "font-light",
                                                            children: line
                                                        }, index, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 838,
                                                            columnNumber: 21
                                                        }, this)),
                                                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bd75cf6573414fae" + " " + "mt-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae",
                                                            children: ModernProgressBar({
                                                                value: scanProgress,
                                                                width: 40
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 842,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-bd75cf6573414fae" + " " + "blink",
                                                        children: "█"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 845,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 836,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 835,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 766,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bd75cf6573414fae" + " " + "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "border border-green-400 p-4 h-[250px] overflow-y-auto rounded-border border-glow-green",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "text-sm mb-3 text-yellow-400 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-bd75cf6573414fae",
                                                            children: "◉ DETECTED NARRATIVES"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 853,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-xs text-green-400 pulse",
                                                            children: "LIVE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 854,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 852,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "space-y-2",
                                                    children: stories.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>analyzeStory(story),
                                                            onMouseEnter: ()=>setHoveredStory(story),
                                                            onMouseLeave: ()=>setHoveredStory(null),
                                                            className: "jsx-bd75cf6573414fae" + " " + `border p-3 cursor-pointer transition-all rounded-border ${selectedStory?.id === story.id ? 'story-card-selected border-yellow-400' : 'border-green-400 hover:story-card-hover'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "flex justify-between items-start mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + `text-lg ${story.category === 'DEFENSE' ? 'text-red-400' : story.category === 'ECONOMICS' ? 'text-green-400' : story.category === 'CYBER' ? 'text-purple-400' : story.category === 'ENERGY' ? 'text-yellow-400' : 'text-white'}`,
                                                                                    children: getMarkerSymbol(story.category, story.severity)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 871,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-xs font-bold text-green-400",
                                                                                    children: story.category
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 880,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 870,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + `text-xs ${story.severity === 'CRITICAL' ? 'text-red-400 pulse' : story.severity === 'HIGH' ? 'text-yellow-400' : 'text-green-400'}`,
                                                                            children: story.severity
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 882,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 869,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-xs mb-2 text-gray-300",
                                                                    children: story.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 890,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "grid grid-cols-2 gap-2 text-xs",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                                                    children: "Reliability:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 893,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                                                    children: [
                                                                                        ModernProgressBar({
                                                                                            value: story.truthScore || 0,
                                                                                            width: 10,
                                                                                            showPercentage: false
                                                                                        }),
                                                                                        " ",
                                                                                        story.truthScore ?? 0,
                                                                                        "%"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 894,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 892,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                                                    children: "BIAS:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 899,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + ((story.bias > 30 ? 'text-red-400' : 'text-yellow-400') || ""),
                                                                                    children: [
                                                                                        ModernProgressBar({
                                                                                            value: story.bias,
                                                                                            width: 10,
                                                                                            showPercentage: false
                                                                                        }),
                                                                                        " ",
                                                                                        story.bias,
                                                                                        "%"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 900,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 898,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 891,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "mt-2 text-xs text-gray-400",
                                                                    children: [
                                                                        story.sources,
                                                                        " sources • ",
                                                                        story.location.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 905,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, story.id, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 858,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 856,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 851,
                                            columnNumber: 15
                                        }, this),
                                        selectedStory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "border border-green-400 p-4 rounded-border border-glow-green h-[670px] overflow-y-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "text-sm mb-3 text-yellow-400",
                                                    children: "◉ STORY ANALYSIS"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 915,
                                                    columnNumber: 19
                                                }, this),
                                                isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "text-center py-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-xs mb-2 text-green-400",
                                                            children: "PROCESSING..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 919,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400 text-xs",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                className: "jsx-bd75cf6573414fae",
                                                                children: `    ░░░░░░░░
  ░████████░
 ░██████████░
░████████████░
░████████████░
 ░██████████░
  ░████████░
    ░░░░░░░░`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/page.tsx",
                                                                lineNumber: 921,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 920,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 918,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bd75cf6573414fae" + " " + "space-y-3 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "grid grid-cols-2 gap-3 p-3 border border-green-400 rounded-border",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 mb-1",
                                                                            children: "TRUTH SCORE"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 937,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + `text-2xl font-bold ${(selectedStory.truthScore ?? 0) >= 70 ? 'text-green-400' : (selectedStory.truthScore ?? 0) >= 50 ? 'text-yellow-400' : 'text-red-400'}`,
                                                                            children: [
                                                                                selectedStory.truthScore ?? 0,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 938,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 936,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 mb-1",
                                                                            children: "BIAS LEVEL"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 947,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + `text-2xl font-bold ${selectedStory.bias <= 20 ? 'text-green-400' : selectedStory.bias <= 40 ? 'text-yellow-400' : 'text-red-400'}`,
                                                                            children: [
                                                                                selectedStory.bias,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 948,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 946,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 935,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                                            children: "LOCATION:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 960,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                                            children: [
                                                                                selectedStory.location.name,
                                                                                ", ",
                                                                                selectedStory.location.country
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 961,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 959,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                                            children: "SOURCES:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 964,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                                            children: [
                                                                                selectedStory.sources,
                                                                                " aggregated"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 965,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 963,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                                            children: "RELIABILITY:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 968,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                                            children: ModernProgressBar({
                                                                                value: selectedStory.reliability,
                                                                                width: 15
                                                                            })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 969,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 967,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 958,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "mt-3 pt-3 border-t border-green-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 mb-2",
                                                                    children: "◉ ABSTRACTED CONTENT:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 974,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-gray-300 bg-black p-3 border-l-4 border-pink-400 rounded-border",
                                                                    children: selectedStory.abstractedContent ?? 'N/A'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 975,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 973,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "grid grid-cols-1 gap-3 mt-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-red-400 mb-1",
                                                                            children: "◉ BIASED CLAIMS:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 982,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "space-y-1",
                                                                            children: selectedStory.biasedClaims?.map((claim, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-red-300 pl-2",
                                                                                    children: [
                                                                                        "× ",
                                                                                        claim
                                                                                    ]
                                                                                }, i, true, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 985,
                                                                                    columnNumber: 31
                                                                                }, this)) ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-bd75cf6573414fae" + " " + "text-red-300 pl-2",
                                                                                children: "None"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/page.tsx",
                                                                                lineNumber: 986,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 983,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 981,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "text-green-400 mb-1",
                                                                            children: "◉ VERIFIED FACTS:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 990,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "space-y-1",
                                                                            children: selectedStory.verifiedFacts?.map((fact, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-green-300 pl-2",
                                                                                    children: [
                                                                                        "✓ ",
                                                                                        fact
                                                                                    ]
                                                                                }, i, true, {
                                                                                    fileName: "[project]/src/app/page.tsx",
                                                                                    lineNumber: 993,
                                                                                    columnNumber: 31
                                                                                }, this)) ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-bd75cf6573414fae" + " " + "text-green-300 pl-2",
                                                                                children: "None"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/page.tsx",
                                                                                lineNumber: 994,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 991,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 989,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 980,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "mt-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 mb-1",
                                                                    children: "◉ KEY ENTITIES:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1000,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "flex flex-wrap gap-1",
                                                                    children: selectedStory.keyPlayers.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bd75cf6573414fae" + " " + "border border-green-400 px-2 py-1 text-green-400 rounded-border",
                                                                            children: player
                                                                        }, player, false, {
                                                                            fileName: "[project]/src/app/page.tsx",
                                                                            lineNumber: 1003,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1001,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 999,
                                                            columnNumber: 23
                                                        }, this),
                                                        selectedStory.connections && selectedStory.connections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bd75cf6573414fae" + " " + "mt-3 pt-3 border-t border-green-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400 mb-1",
                                                                    children: "◉ NARRATIVE CONNECTIONS:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/page.tsx",
                                                                    lineNumber: 1012,
                                                                    columnNumber: 27
                                                                }, this),
                                                                selectedStory.connections.map((connId)=>{
                                                                    const conn = stories.find((s)=>s.id === connId);
                                                                    return conn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-bd75cf6573414fae" + " " + "text-gray-300 pl-2",
                                                                        children: [
                                                                            "→ ",
                                                                            conn.title,
                                                                            " ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                                                children: [
                                                                                    "(",
                                                                                    conn.truthScore ?? 0,
                                                                                    "% truth)"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/page.tsx",
                                                                                lineNumber: 1017,
                                                                                columnNumber: 48
                                                                            }, this)
                                                                        ]
                                                                    }, connId, true, {
                                                                        fileName: "[project]/src/app/page.tsx",
                                                                        lineNumber: 1016,
                                                                        columnNumber: 31
                                                                    }, this) : null;
                                                                })
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 1011,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 934,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 914,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 850,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 765,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bd75cf6573414fae" + " " + "mt-6 border border-green-400 p-3 rounded-border border-glow-green",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-bd75cf6573414fae" + " " + "flex justify-between items-center text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bd75cf6573414fae" + " " + "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                children: "█ SYSTEM: TRUTHGUARD v0.0.1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1033,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                children: "█ MODE: ACTIVE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1034,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1032,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bd75cf6573414fae" + " " + "flex items-center gap-4 text-green-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-bd75cf6573414fae",
                                                children: "█ UPTIME: 99.97%"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-bd75cf6573414fae",
                                                children: [
                                                    "█ ALGORITHMS: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-bd75cf6573414fae" + " " + "text-green-400",
                                                        children: "OPTIMAL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1038,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1038,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-bd75cf6573414fae",
                                                children: [
                                                    "█ QUEUE: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                                        children: stories.filter((s)=>s.bias > 30).length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 32
                                                    }, this),
                                                    " PRIORITY"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 1039,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bd75cf6573414fae" + " " + "text-green-400 pulse",
                                        children: "███"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 1041,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 1031,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1030,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bd75cf6573414fae" + " " + "mt-4 grid grid-cols-4 gap-4 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bd75cf6573414fae" + " " + "text-center p-3 border border-green-400 rounded-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                            children: "SOURCES"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-2xl font-bold text-green-400",
                                            children: globalStats.totalSources
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1048,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bd75cf6573414fae" + " " + "text-center p-3 border border-green-400 rounded-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                            children: "AVG TRUTH"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1051,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-2xl font-bold text-green-400",
                                            children: [
                                                globalStats.avgTruthScore,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1052,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1050,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bd75cf6573414fae" + " " + "text-center p-3 border border-green-400 rounded-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                            children: "CRITICAL BIAS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1055,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-2xl font-bold text-red-400",
                                            children: globalStats.criticalBias
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1056,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1054,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bd75cf6573414fae" + " " + "text-center p-3 border border-green-400 rounded-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-yellow-400",
                                            children: "REGIONS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1059,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bd75cf6573414fae" + " " + "text-2xl font-bold text-green-400",
                                            children: globalStats.activeRegions
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 1060,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 1058,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 1045,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 746,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 745,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 649,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7bfd056d._.js.map