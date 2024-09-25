import React, { useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import { DBNode } from "common/src/types";
import { TextureLoader, Vector3, Euler } from "three";
import { OrbitControls } from "@react-three/drei";
import { THREE } from "aframe";
import LLevel1 from "./blankImages/00_thelowerlevel1.png";
import LLevel2 from "./blankImages/00_thelowerlevel2.png";
import Level1 from "./blankImages/01_thefirstfloor.png";
import Level2 from "./blankImages/02_thesecondfloor.png";
import Level3 from "./blankImages/03_thethirdfloor.png";

import Borders from "./objects/Borders";
import Rooms from "./objects/Rooms";
import RoomOutlines from "./objects/RoomOutlines";
import GraphMesh from "./objects/RenderGraph";
import Building from "./objects/Building";

const MapCanvas: React.FC<{
    pathNodes: DBNode[];
    level: number;
    nodes: DBNode[];
    setHoverNode: (node: DBNode) => void;
    setLevel: (level: number) => void;
}> = ({ pathNodes, level, nodes, setHoverNode, setLevel }) => {
    const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];

    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, MapImage[level]);
    const aspectRatio = 5000 / 3400;
    const width = 100;
    const height = width / aspectRatio;
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggable, setIsDraggable] = useState(false);
    const [position, setPosition] = useState(new Vector3(0, 0, 0));
    const [rotation] = useState(new Euler(-Math.PI / 2, 0, 0));

    const handlePointerDown = (event: { stopPropagation: () => void }) => {
        setIsDragging(true);
        event.stopPropagation();
        if (isDraggable) {
            setHoverNode(null);
        }
    };

    const handlePointerMove = (event: {
        movementX: number;
        movementY: number;
        stopPropagation: () => void;
    }) => {
        if (isDragging && meshRef.current) {
            const deltaX = event.movementX;
            const deltaZ = -event.movementY;

            if (
                position.x + deltaX * 0.013 > 28 ||
                position.x + deltaX * 0.013 < -40
            ) {
                if (
                    position.z - deltaZ * 0.013 < -28 ||
                    position.z - deltaZ * 0.013 > 25
                ) {
                    setPosition((prev) => new Vector3(prev.x, prev.y, prev.z));
                } else {
                    setPosition(
                        (prev) =>
                            new Vector3(
                                prev.x,
                                prev.y,
                                prev.z - deltaZ * 0.013,
                            ),
                    );
                }
            } else if (
                position.z - deltaZ * 0.013 < -28 ||
                position.z - deltaZ * 0.013 > 25
            ) {
                setPosition(
                    (prev) =>
                        new Vector3(prev.x + deltaX * 0.013, prev.y, prev.z),
                );
            } else {
                setPosition(
                    (prev) =>
                        new Vector3(
                            prev.x + deltaX * 0.013,
                            prev.y,
                            prev.z - deltaZ * 0.013,
                        ),
                );
            }
        }
        event.stopPropagation();
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerOut={handlePointerUp}
                // onClick={() => setHoverNode(null)}
            >
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <>
                <Building position={position} level={level} />
                <Rooms position={position} level={level} />
                <Borders position={position} level={level} />
                <RoomOutlines position={position} level={level} />
                <GraphMesh
                    position={position}
                    pathNodes={pathNodes}
                    level={level}
                    nodes={nodes}
                    setHoverNode={setHoverNode}
                    setIsDraggable={setIsDraggable}
                    setLevel={setLevel}
                />
            </>
        </>
    );
};

function setColor(node: DBNode) {
    switch (node.nodeType) {
        case "HALL":
            return "#0a2ce1";
        case "CONF":
            return "#25982a";
        case "DEPT":
            return "#e04545";
        case "ELEV":
            return "#da8f08";
        case "EXIT":
            return "#ddde1f";
        case "INFO":
            return "#1fe18a";
        case "LABS":
            return "#9608da";
        case "REST":
            return "#5cdbda";
        case "BATH":
            return "#ce24d4";
        case "RETL":
            return "#0b6009";
        case "STAI":
            return "#82a7f6";
        case "SERV":
            return "#67c537";
    }
}

const Map3d: React.FC<{
    pathNodes: DBNode[];
    level: number;
    nodes: DBNode[];
    setStart: (start: string) => void;
    setEnd: (end: string) => void;
    setLevel: (level: number) => void;
}> = ({ pathNodes, level, nodes, setStart, setEnd, setLevel }) => {
    const [hoverNode, setHoverNode] = useState<DBNode | null>(null);

    return (
        <div className="map-container">
            <Canvas
                camera={{
                    fov: 75,
                    position: new Vector3(0, 5, 5),
                    near: 1,
                    far: 1000,
                }}
                style={{ height: "100vh", width: "100vw" }}
            >
                <directionalLight
                    position={new Vector3(0, 5, 0)}
                    intensity={1}
                />
                <directionalLight
                    position={new Vector3(-5, 0, 0)}
                    intensity={0.5}
                />
                <directionalLight
                    position={new Vector3(0, 0, 5)}
                    intensity={0.8}
                />
                <directionalLight
                    position={new Vector3(0, 0, -5)}
                    intensity={0.15}
                />
                <directionalLight
                    position={new Vector3(5, 0, 0)}
                    intensity={0.15}
                />
                <OrbitControls
                    enableRotate={false}
                    enableZoom={false}
                    enablePan={false}
                />
                <MapCanvas
                    pathNodes={pathNodes}
                    level={level}
                    nodes={nodes}
                    setHoverNode={setHoverNode}
                    setLevel={setLevel}
                />
            </Canvas>

            {hoverNode && (
                <div // ml-4 justify-items-center bg-background  absolute z-10 text-md rounded-md px-2 py-1 flex flex-col rounded-2 float-left top-0
                    className="absolute z-10 rounded-md bg-background shadow-lg flex-col rounded-2 float-left top-1/3 left-[60px] "
                    style={{
                        top: `300px`,
                        left: `60px`,
                        zIndex: `9999px`,
                        whiteSpace: "nowrap",
                        minWidth: "fit-content",
                        maxWidth: "calc(100% - 20px)",
                    }}
                >
                    {/* Top color bar */}
                    <div
                        className="text-foreground text-white text-lg font-bold rounded-t-md px-4 py-2"
                        style={{ backgroundColor: setColor(hoverNode) }}
                    >
                        {hoverNode.longName}
                    </div>

                    {/* Node details */}
                    <div className="p-5 text-sm text-foreground">
                        <p>Building: {hoverNode.building}</p>
                        <p>Floor: {hoverNode.floor}</p>
                        <p>ID: {hoverNode.nodeID}</p>
                        <p>Type: {hoverNode.nodeType}</p>
                        <p>
                            Coordinates: ({hoverNode.xcoord}, {hoverNode.ycoord}
                            )
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-evenly p-5 space-x-2">
                        <Button
                            className="space-x-2"
                            onClick={() => setStart(hoverNode.nodeID)}
                        >
                            Set as Start
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setEnd(hoverNode.nodeID)}
                        >
                            Set as End
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Map3d;
