(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/components/Globe.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "canvas": "Globe-module__KRF5xW__canvas",
  "container": "Globe-module__KRF5xW__container",
  "tooltip": "Globe-module__KRF5xW__tooltip",
});
}}),
"[project]/src/app/components/Globe.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/Globe.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Globe$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/components/Globe.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Utility function to convert lat/lon to 3D vector
const latLonToVector3 = (lat, lon, radius)=>{
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](x, y, z);
};
// Color mapping for categories
const categoryColors = {
    DEFENSE: 0xff0000,
    ECONOMICS: 0x00ff00,
    CYBER: 0x0000ff,
    ENERGY: 0xffff00,
    POLITICS: 0xff00ff
};
// Size mapping for severity
const severitySizes = {
    CRITICAL: 0.04,
    HIGH: 0.03,
    MEDIUM: 0.02,
    LOW: 0.01
};
const Globe = ({ stories = [] })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedStory, setSelectedStory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe.useEffect": ()=>{
            if (!canvasRef.current || !mountRef.current) return;
            // Initialize Three.js scene
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                canvas: canvasRef.current,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            // Set up OrbitControls for rotation, zoom, and pan
            const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
            controls.enableDamping = false;
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 0.5;
            controls.zoomSpeed = 1.0;
            controls.panSpeed = 0.5;
            controls.minDistance = 2;
            controls.maxDistance = 5;
            // Create globe
            const globeRadius = 1;
            const globeGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](globeRadius, 64, 64);
            const textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"]();
            // Load and apply texture
            const earthTexture = textureLoader.load('/assets/8k_earth_daymap.jpg', {
                "Globe.useEffect.earthTexture": ()=>console.log('Texture loaded successfully')
            }["Globe.useEffect.earthTexture"]);
            earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Ensures proper texture rendering
            const earthMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                map: earthTexture,
                shininess: 10
            });
            const globe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](globeGeometry, earthMaterial);
            scene.add(globe);
            // Add lighting
            const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0x404040, 0.5);
            scene.add(ambientLight);
            const directionalLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 0.8);
            directionalLight.position.set(5, 3, 5);
            scene.add(directionalLight);
            // Add hotspot markers
            const markers = [];
            const markerMap = new Map();
            stories.forEach({
                "Globe.useEffect": (story)=>{
                    const position = latLonToVector3(story.location.lat, story.location.lng, globeRadius * 1.02);
                    const markerGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](severitySizes[story.severity], 16, 16);
                    const markerMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: categoryColors[story.category]
                    });
                    const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](markerGeometry, markerMaterial);
                    marker.position.copy(position);
                    marker.userData = {
                        story
                    };
                    markers.push(marker);
                    markerMap.set(story.id, marker);
                    scene.add(marker);
                }
            }["Globe.useEffect"]);
            // Add arc lines between connected stories
            const arcMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 0xffffff,
                linewidth: 2
            });
            stories.forEach({
                "Globe.useEffect": (story)=>{
                    if (story.connections) {
                        story.connections.forEach({
                            "Globe.useEffect": (connectedId)=>{
                                const relatedMarker = markerMap.get(connectedId);
                                if (relatedMarker) {
                                    const start = markerMap.get(story.id).position;
                                    const end = relatedMarker.position;
                                    const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuadraticBezierCurve3"](start, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().lerpVectors(start, end, 0.5).normalize().multiplyScalar(globeRadius * 1.5), end);
                                    const points = curve.getPoints(50);
                                    const arcGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
                                    const arc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](arcGeometry, arcMaterial);
                                    scene.add(arc);
                                }
                            }
                        }["Globe.useEffect"]);
                    }
                }
            }["Globe.useEffect"]);
            // Set initial camera position
            camera.position.z = 3;
            // Handle mouse clicks for story selection
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const onClick = {
                "Globe.useEffect.onClick": (event)=>{
                    mouse.x = event.clientX / window.innerWidth * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(markers);
                    if (intersects.length > 0) {
                        const story = intersects[0].object.userData.story;
                        setSelectedStory(story);
                    } else {
                        setSelectedStory(null);
                    }
                }
            }["Globe.useEffect.onClick"];
            window.addEventListener('click', onClick);
            // Animation loop
            const animate = {
                "Globe.useEffect.animate": ()=>{
                    requestAnimationFrame(animate);
                    if (!isHovered) {
                        globe.rotation.y += 0.005; // Sweeping rotation when mouse is not hoveringsdf
                    }
                    controls.update();
                    renderer.render(scene, camera);
                }
            }["Globe.useEffect.animate"];
            animate();
            // Handle window resize
            const onResize = {
                "Globe.useEffect.onResize": ()=>{
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    renderer.setSize(width, height);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                }
            }["Globe.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            // Mouse hover to stop rotation
            const onMouseEnter = {
                "Globe.useEffect.onMouseEnter": ()=>setIsHovered(true)
            }["Globe.useEffect.onMouseEnter"];
            const onMouseLeave = {
                "Globe.useEffect.onMouseLeave": ()=>setIsHovered(false)
            }["Globe.useEffect.onMouseLeave"];
            mountRef.current.addEventListener('mouseenter', onMouseEnter);
            mountRef.current.addEventListener('mouseleave', onMouseLeave);
            // Cleanup
            return ({
                "Globe.useEffect": ()=>{
                    window.removeEventListener('click', onClick);
                    window.removeEventListener('resize', onResize);
                    mountRef.current.removeEventListener('mouseenter', onMouseEnter);
                    mountRef.current.removeEventListener('mouseleave', onMouseLeave);
                }
            })["Globe.useEffect"];
        }
    }["Globe.useEffect"], [
        stories,
        isHovered
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Globe$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        ref: mountRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Globe$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].canvas
            }, void 0, false, {
                fileName: "[project]/src/app/components/Globe.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            selectedStory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$Globe$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltip,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: selectedStory.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Location:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 219,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.location.name,
                            ", ",
                            selectedStory.location.country
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Category:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 220,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.category
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Severity:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 221,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.severity
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Summary:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 222,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.summary
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Key Players:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 223,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.keyPlayers.join(', ')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Sentiment:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 224,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.sentiment
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Reliability:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 225,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.reliability
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Bias:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 226,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.bias
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Impact:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 227,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.impact
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Sources:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 228,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.sources
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Timestamp:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 229,
                                columnNumber: 14
                            }, this),
                            " ",
                            selectedStory.timestamp.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this),
                    selectedStory.truthScore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Truth Score:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 230,
                                columnNumber: 43
                            }, this),
                            " ",
                            selectedStory.truthScore
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 230,
                        columnNumber: 40
                    }, this),
                    selectedStory.abstractedContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Abstract:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 231,
                                columnNumber: 50
                            }, this),
                            " ",
                            selectedStory.abstractedContent
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 231,
                        columnNumber: 47
                    }, this),
                    selectedStory.biasedClaims && selectedStory.biasedClaims.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Biased Claims:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 233,
                                columnNumber: 16
                            }, this),
                            " ",
                            selectedStory.biasedClaims.join(', ')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 233,
                        columnNumber: 13
                    }, this),
                    selectedStory.verifiedFacts && selectedStory.verifiedFacts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Verified Facts:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Globe.tsx",
                                lineNumber: 236,
                                columnNumber: 16
                            }, this),
                            " ",
                            selectedStory.verifiedFacts.join(', ')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 236,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedStory(null),
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Globe.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/Globe.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/Globe.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
};
_s(Globe, "l4To7QL7053y6xYX506ZM7FWCE4=");
_c = Globe;
const __TURBOPACK__default__export__ = Globe;
var _c;
__turbopack_context__.k.register(_c, "Globe");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports } = __turbopack_context__;
{
const e = new Error("Could not parse module '[project]/src/app/page.tsx'");
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
}]);

//# sourceMappingURL=src_app_0b258bd4._.js.map