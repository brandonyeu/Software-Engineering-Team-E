// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// const MapWindow = () => {
//     const [path, setPath] = useState<string[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//
//     const generateRandomPath = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get("/api/randomPath");
//             setPath(response.data);
//         } catch (error) {
//             console.error("Error generating random path:", error);
//         }
//         setIsLoading(false);
//     };
//
//     useEffect(() => {
//         const interval = setInterval(generateRandomPath, 5000);
//         return () => clearInterval(interval);
//     }, []);
//
//     return (
//         <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//             {isLoading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <div style={{ width: "80%", height: "80%", border: "2px solid black", position: "relative" }}>
//                     {path.map((point, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 width: "10px",
//                                 height: "10px",
//                                 backgroundColor: "red",
//                                 borderRadius: "50%",
//                                 position: "absolute",
//                                 left: `${Math.random() * 90}%`,
//                                 top: `${Math.random() * 90}%`,
//                                 animation: "drawPath 1s linear forwards",
//                                 animationDelay: `${index * 0.2}s`
//                             }}
//                         />
//                     ))}
//                     <style>
//                         {`
//                             @keyframes drawPath {
//                                 from { opacity: 0; }
//                                 to { opacity: 1; }
//                             }
//                         `}
//                     </style>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default MapWindow;
//
// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// const MapWindow = () => {
//     const [path, setPath] = useState<string[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//
//     const generateRandomPath = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get("/api/randomPath");
//             setPath(response.data);
//         } catch (error) {
//             console.error("Error generating random path:", error);
//         }
//         setIsLoading(false);
//     };
//
//     useEffect(() => {
//         const interval = setInterval(generateRandomPath, 20000);
//         return () => clearInterval(interval);
//     }, []);
//
//     return (
//         <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//             {isLoading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <div style={{ width: "80%", height: "80%", border: "2px solid black", position: "relative" }}>
//                     {path.length > 1 && (
//                         <>
//                             {path.map((point, index) => (
//                                 <div
//                                     key={index}
//                                     style={{
//                                         width: "10px",
//                                         height: "10px",
//                                         backgroundColor: "red",
//                                         borderRadius: "50%",
//                                         position: "absolute",
//                                         left: `${parseInt(point.split(",")[0], 10) * 100}%`,
//                                         top: `${parseInt(point.split(",")[1], 10) * 100}%`,
//                                         animation: "drawPath 1s linear forwards",
//                                         animationDelay: `${index * 0.2}s`
//                                     }}
//                                 />
//                             ))}
//                             <style>
//                                 {`
//                                     @keyframes drawPath {
//                                         from { opacity: 0; }
//                                         to { opacity: 1; }
//                                     }
//                                 `}
//                             </style>
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default MapWindow;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// const MapWindow = () => {
//     const [path, setPath] = useState<string[]>([]);
//
//     useEffect(() => {
//         const interval = setInterval(generateRandomPath, 5000);
//         return () => clearInterval(interval);
//     }, []);
//
//     const generateRandomPath = async () => {
//         try {
//             const response = await axios.get("/api/randomPath");
//             setPath(response.data);
//         } catch (error) {
//             console.error("Error generating random path:", error);
//         }
//     };
//
//     return (
//         <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <div style={{ width: "80%", height: "80%", border: "2px solid black", position: "relative" }}>
//                 {path.map((point, index) => {
//                     const [x, y] = point.split(",").map(parseFloat);
//                     return (
//                         <div
//                             key={index}
//                             style={{
//                                 width: "10px",
//                                 height: "10px",
//                                 backgroundColor: "red",
//                                 borderRadius: "50%",
//                                 position: "absolute",
//                                 left: `${x * 100}%`,
//                                 top: `${y * 100}%`,
//                                 animation: "drawPath 1s linear forwards",
//                                 animationDelay: `${index * 0.2}s`
//                             }}
//                         />
//                     );
//                 })}
//                 <style>
//                     {`
//                         @keyframes drawPath {
//                             from { opacity: 0; }
//                             to { opacity: 1; }
//                         }
//                     `}
//                 </style>
//             </div>
//         </div>
//     );
// };
//
// export default MapWindow;

// import React, { useEffect, useRef } from "react";
//
// const RandomPathMap = () => {
//     const canvasRef = useRef(null);
//
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//
//         // Generate a random path
//         const path = generateRandomPath(canvas.width, canvas.height);
//
//         // Draw the path
//         ctx.beginPath();
//         ctx.moveTo(path[0].x, path[0].y);
//         for (let i = 1; i < path.length; i++) {
//             ctx.lineTo(path[i].x, path[i].y);
//         }
//         ctx.stroke();
//     }, []);
//
//     const generateRandomPath = () => {
//         const path = [{ x: 0, y: 0 }]; // Start at the top-left corner
//         let currentX = 0;
//         let currentY = 0;
//
//         // Generate random steps
//         for (let i = 0; i < 100; i++) {
//             const direction = Math.floor(Math.random() * 4); // 0: up, 1: right, 2: down, 3: left
//             let newX = currentX;
//             let newY = currentY;
//             let stepSize = 5;
//
//             switch (direction) {
//                 case 0: // Up
//                     newY = Math.max(currentY - stepSize, 0); // Limit to 0 (top boundary)
//                     break;
//                 case 1: // Right
//                     newX = Math.min(currentX + stepSize, window.innerWidth); // Limit to window width (right boundary)
//                     break;
//                 case 2: // Down
//                     newY = Math.min(currentY + stepSize, window.innerHeight); // Limit to window height (bottom boundary)
//                     break;
//                 case 3: // Left
//                     newX = Math.max(currentX - stepSize, 0); // Limit to 0 (left boundary)
//                     break;
//                 default:
//                     break;
//             }
//
//             path.push({ x: newX, y: newY });
//             currentX = newX;
//             currentY = newY;
//         }
//
//         return path;
//     };
//
//
//     return <canvas ref={canvasRef} width={500} height={500} />;
// };
//
// const Carousel = () => {
//     return (
//         <div className="carousel">
//             <div className="carousel-window">
//                 <RandomPathMap />
//             </div>
//             <div className="carousel-window">
//                 <RandomPathMap />
//             </div>
//             <div className="carousel-window">
//                 <RandomPathMap />
//             </div>
//         </div>
//     );
// };
//
// export default Carousel;

// import React, { useEffect, useState } from "react";
// import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
// import {DBNode} from "common/src/types";
//
// const MapWindow = () => {
//     const [path, setPath] = useState<DBNode[]>([]);
//     const [animationIndex, setAnimationIndex] = useState<number>(0);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setPath(generateRandomPath());
//             setAnimationIndex(0);
//         }, 5000);
//
//         return () => clearInterval(interval);
//     }, []);
//
//     const generateRandomPath = (): DBNode[] => {
//         // Simulate generating a random path
//         const pathLength = Math.floor(Math.random() * 10) + 5;
//         const path: DBNode[] = [];
//         for (let i = 0; i < pathLength; i++) {
//             path.push({
//                 xcoord: Math.random() * 5000,
//                 ycoord: Math.random() * 3400,
//                 nodeID: `${i}`,
//                 floor: "1",
//                 nodeType: "HALL",
//                 longName: "",
//                 shortName: "",
//                 building: "",
//                 edges: [],
//                 blocked: false,
//             });
//         }
//         return path;
//     };
//
//     const animatePath = () => {
//         if (animationIndex < path.length) {
//             setAnimationIndex(animationIndex + 1);
//         }
//     };
//
//     return (
//         <div className="relative w-full h-full">
//             <div className="absolute inset-0 flex items-center justify-center">
//                 <CanvasMap
//                     nodes={[]}
//                     path={path.slice(0, animationIndex)}
//                     level={1}
//                     setLevel={() => {}}
//                 />
//             </div>
//             <button
//                 className="absolute bottom-4 right-4 px-4 py-2 bg-gray-800 text-white rounded"
//                 onClick={animatePath}
//             >
//                 Next Step
//             </button>
//         </div>
//     );
// };
//
// export default MapWindow;

// import React, { useEffect, useState } from "react";
// import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
// import { DBNode } from "common/src/types";
//
// interface MapWindowProps {
//     nodes : DBNode[]
// }
//
// const MapWindow: React.FC<MapWindowProps> = ({}) => {
//     // State for managing the path and nodes
//     const [path, setPath] = useState<DBNode[]>([]);
//     const [nodes, setNodes] = useState<DBNode[]>([]);
//     const [level, setLevel] = useState<number>(0);
//     const [start, setStart] = useState<string>("");
//     const [end, setEnd] = useState<string>("");
//     const [algorithm, setAlgorithm] = useState<string>("ASTAR");
//
//     const handleRandomize = () => {
//         const nonHallNodes = nodes
//             .filter((node) => {
//                 return node.nodeType != "HALL";
//             });
//         const randomStart = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//         const randomEnd = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//         const algorithms = ["ASTAR", "DIJKSTRA", "BFS", "DFS"];
//         const randomAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];
//         console.log(randomAlgo);
//         setStart(randomStart);
//         setEnd(randomEnd);
//         setAlgorithm(randomAlgo);
//     };
//
//     // Function to generate a random path every 5 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             // Generate a random path (replace with your path generation logic)
//             const randomPath: DBNode[] = generateRandomPath();
//             setPath(randomPath);
//         }, 5000); // 5 seconds interval
//
//         return () => clearInterval(interval);
//     }, []);
//
//     // Function to generate a random path (replace with your logic)
//     const generateRandomPath = (): DBNode[] => {
//         // Generate a random path here
//         return [];
//     };
//
//     return (
//         <div>
//             <div>
//                 {/* Your existing code for the carousel */}
//             </div>
//             <div>
//                 {/* Render the CanvasMap component */}
//                 <CanvasMap
//                     nodes={nodes}
//                     path={path}
//                     level={level}
//                     setLevel={setLevel}
//                     start={(start: string) => {}}
//                     end={(end: string) => {}}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default MapWindow;

// import React, { useState } from "react";
// import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
// import { DBNode } from "common/src/types";
//
// interface MapWindowProps {
//     activeLevel: number;
// }
//
// const MapWindow: React.FC<MapWindowProps> = ({ activeLevel }) => {
//     const [path, setPath] = useState<DBNode[]>([]);
//     const [isDrawing, setIsDrawing] = useState<boolean>(false);
//
//     // Generate a random path
//     const generatePath = () => {
//         const pathLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 15
//         const newPath: DBNode[] = [];
//
//         // Generate random nodes for the path
//         for (let i = 0; i < pathLength; i++) {
//             const node: DBNode = {
//                 building: "",
//                 edges: [],
//                 floor: "",
//                 longName: "",
//                 nodeID: `Node ${i}`,
//                 nodeType: "",
//                 shortName: "",
//                 xcoord: Math.floor(Math.random() * 5000), // Random x-coordinate between 0 and 5000
//                 ycoord: Math.floor(Math.random() * 3400), // Random y-coordinate between 0 and 3400
//                 blocked: false,
//             };
//             newPath.push(node);
//         }
//
//         setPath(newPath);
//         setIsDrawing(true);
//     };
//
//     return (
//         <div className="w-full h-full flex justify-center items-center">
//             <div className="w-11/12 h-11/12 bg-gray-800 relative">
//                 <CanvasMap
//                     nodes={[]}
//                     path={isDrawing ? path : []}
//                     level={activeLevel}
//                     //setLevel={(level: number) => {}}
//                     //start={(start: string) => {}}
//                     //end={(end: string) => {}}
//                 />
//             </div>
//             <button
//                 className="absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md"
//                 onClick={generatePath}
//             >
//                 Generate Path
//             </button>
//         </div>
//     );
// };
//
// export default MapWindow;

// import React, { useEffect } from 'react';
// import CanvasMap from '@/components/canvasmap/map/CanvasMap.tsx';
// //import { DBNode } from 'common/src/types';
//
// interface MapWindowProps {
//     active: boolean;
// }
//
// const MapWindow: React.FC<MapWindowProps> = ({ active }) => {
//     const handleRandomize = () => {
//         const nonHallNodes = nodes
//             .filter((node) => {
//                 return node.nodeType != "HALL";
//             });
//         const randomStart = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//         const randomEnd = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//         const algorithms = ["ASTAR", "DIJKSTRA", "BFS", "DFS"];
//         const randomAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];
//         console.log(randomAlgo);
//         setStart(randomStart);
//         setEnd(randomEnd);
//         setAlgorithm(randomAlgo);
//     };
//
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             handleRandomize();
//         }, 10000); // Generate a new path every 10 seconds
//
//         return () => {
//             clearInterval(intervalId);
//         };
//     }, [active]);
//
//     return (
//         <div className={`map-window ${active ? 'active' : ''}`}>
//             <CanvasMap />
//         </div>
//     );
// };
//
// export default MapWindow;

//------------------------------------------------------

// import React, { useEffect, useRef, useState } from "react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import MapImage from "./canvasmap/mapImages/01_thefirstfloor.png"; // Path to your map image
//
// const MapWindow = () => {
//     const canvasRef = useRef(null);
//     const [path, setPath] = useState([]);
//     const [zoomed, setZoomed] = useState(false);
//
//     // const handleRandomize = () => {
//     //     const nonHallNodes = nodes
//     //         .filter((node) => {
//     //             return node.nodeType != "HALL";
//     //         });
//     //     const randomStart = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//     //     const randomEnd = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//     //     const algorithms = ["ASTAR", "DIJKSTRA", "BFS", "DFS"];
//     //     const randomAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];
//     //     console.log(randomAlgo);
//     //     setStart(randomStart);
//     //     setEnd(randomEnd);
//     //     setAlgorithm(randomAlgo);
//     // };
//
//     const handleRandomize = () => {
//         const nonHallNodes = nodes
//             .filter((node) => {
//                 return node.nodeType !== "HALL";
//             });
//         const randomStart = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//         const randomEnd = nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
//         const algorithms = ["ASTAR", "DIJKSTRA", "BFS", "DFS"];
//         const randomAlgo = algorithms[Math.floor(Math.random() * algorithms.length)];
//         console.log(randomAlgo);
//         setStart(randomStart);
//         setEnd(randomEnd);
//         setAlgorithm(randomAlgo);
//     };
//
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             const newPath = handleRandomize();
//             setPath(newPath);
//             setZoomed(false); // Reset zoom
//         }, 10000); // Generate a new path every 10 seconds
//
//         return () => clearInterval(intervalId);
//     }, []);
//
//     const handleZoomEnd = () => {
//         if (!zoomed) {
//             setZoomed(true);
//             // Zoom to fit the entire path
//             // You can implement this based on the size and coordinates of your path
//         }
//     };
//
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//
//         // Clear canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//         // Draw map image
//         const mapImg = new Image();
//         mapImg.src = MapImage;
//         mapImg.onload = () => {
//             ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
//
//             // Draw path
//             ctx.strokeStyle = "red";
//             ctx.lineWidth = 2;
//             ctx.beginPath();
//             path.forEach((point, index) => {
//                 if (index === 0) ctx.moveTo(point.x, point.y);
//                 else ctx.lineTo(point.x, point.y);
//             });
//             ctx.stroke();
//         };
//     }, [path]);
//
//     return (
//         <TransformWrapper>
//             <TransformComponent>
//                 <canvas
//                     ref={canvasRef}
//                     width={800} // Set your canvas width
//                     height={600} // Set your canvas height
//                     style={{ border: "1px solid black" }}
//                     onWheel={handleZoomEnd}
//                 />
//             </TransformComponent>
//         </TransformWrapper>
//     );
// };
//
// export default MapWindow;
//

import React, { useEffect, useState } from "react";
import { DBNode } from "common/src/types";
import drawGraph from "@/components/canvasmap/map/RenderGraph.tsx";
import drawNodes from "@/components/canvasmap/map/MapShapes.tsx";

const MapWindow: React.FC<{ nodes: DBNode[] }> = ({ nodes }) => {
    const [startNode, setStartNode] = useState<number>(-1);
    const [endNode, setEndNode] = useState<number>(-1);
    const [currentPath, setCurrentPath] = useState<DBNode[]>([]);
    const [activeLevel, setActiveLevel] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newStartNode = getRandomNodeId(nodes);
            let newEndNode = getRandomNodeId(nodes);
            while (newEndNode === newStartNode) {
                newEndNode = getRandomNodeId(nodes);
            }
            setStartNode(newStartNode);
            setEndNode(newEndNode);
        }, 10000);

        return () => clearInterval(interval);
    }, [nodes]);

    useEffect(() => {
        if (startNode !== -1 && endNode !== -1) {
            // Generate a path between the start and end nodes
            // For demonstration purposes, let's assume this function exists
            const newPath = generatePath(nodes, startNode, endNode);
            setCurrentPath(newPath);
        }
    }, [startNode, endNode, nodes]);

    useEffect(() => {
        // Zoom in on the start of the path and switch floors if needed
        if (currentPath.length > 0) {
            const startNode = currentPath[0];
            setActiveLevel(getFloorIndex(startNode.floor));
        }
    }, [currentPath]);

    useEffect(() => {
        const canvas = document.getElementById(
            "mapCanvas",
        ) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGraph(
                ctx,
                1,
                1,
                currentPath,
                nodes,
                activeLevel,
                { x: 0, y: 0 },
                0,
            );
            drawNodes(ctx, nodes, currentPath, 1, 1, activeLevel, {
                x: 0,
                y: 0,
            });
        }
    }, [currentPath, activeLevel, nodes]);

    return (
        <div className="relative h-screen">
            <canvas
                id="mapCanvas"
                className="w-full h-full absolute top-0 left-0"
            />
        </div>
    );
};

function getRandomNodeId(nodes: DBNode[]): number {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return Number(nodes[randomIndex].nodeID);
}

function generatePath(
    nodes: DBNode[],
    startNode: number,
    endNode: number,
): DBNode[] {
    // Assume this function generates a path between two nodes
    // For demonstration purposes, let's return a straight line between start and end nodes
    //const start = nodes.find(node => node.nodeID === startNode);
    const start = nodes.find((node) => node.nodeID === String(startNode));

    //const end = nodes.find(node => node.nodeID === endNode);
    const end = nodes.find((node) => node.nodeID === String(endNode));

    if (!start || !end) return [];
    return [start, end];
}

function getFloorIndex(floor: string): number {
    const floorLevels = ["L2", "L1", "1", "2", "3"];
    return floorLevels.indexOf(floor);
}

export default MapWindow;
