import React, { useEffect, useState, useRef, useMemo, RefObject } from "react";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { DBNode } from "common/src/types";
import LLevel1 from "../mapImages/00_thelowerlevel1.png";
import LLevel2 from "../mapImages/00_thelowerlevel2.png";
import Level1 from "../mapImages/01_thefirstfloor.png";
import Level2 from "../mapImages/02_thesecondfloor.png";
import Level3 from "../mapImages/03_thethirdfloor.png";
import drawGraph from "@/components/canvasmap/map/RenderGraph.tsx";

const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[];
    level: number;
    setLevel: (level: number) => void;
    start: (start: string) => void;
    end: (end: string) => void;
}

export default function CanvasMap(nodes: CanvasMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const nullNode: DBNode = useMemo(
        () => ({
            building: "",
            edges: [],
            floor: "",
            longName: "",
            nodeID: "",
            nodeType: "",
            shortName: "",
            xcoord: 0,
            ycoord: 0,
            blocked: false,
        }),
        [],
    );
    const [hoverNode, sethoverNode] = useState(nullNode);
    const nodeData = nodes.nodes;
    const pathData = nodes.path;
    const mapLevel = nodes.level;

    //RESIZING OF CANVAS
    useEffect(() => {
        const image = new Image();
        image.src = MapImage[mapLevel];
        image.onload = () => {
            setImageSize({ width: image.width, height: image.height });
        };

        // Update container size on mount
        updateContainerSize();
        // Update container size on window resize
        window.addEventListener("resize", updateContainerSize);

        return () => {
            window.removeEventListener("resize", updateContainerSize);
        };
    }, [mapLevel]);

    // Function to update container size
    const updateContainerSize = () => {
        setContainerSize({
            width: window.outerWidth,
            height: window.outerHeight,
        });
    };

    // Function to handle panning stopped event
    const handlePanningStopped = (e: ReactZoomPanPinchRef) => {
        const x = e.state.positionX;
        const y = e.state.positionY;
        const scale = e.state.scale;

        // If image is smaller than the container, center it
        if (imageSize.width * scale < containerSize.width) {
            e.setTransform(
                (containerSize.width - imageSize.width * scale) / 2,
                y,
                scale,
            );
        }
        if (imageSize.height * scale < containerSize.height) {
            e.setTransform(
                x,
                (containerSize.width - imageSize.width * scale) / 2,
                scale,
            );
        }
    };

    // This function took like 3 hours dont touch it
    // Map current mouse position onto canvas
    const handleMouseMoveCanvas = (
        event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

        const x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
        const y = (event.clientY - rect.top) * scaleY; // been adjusted to be relative to element

        setMousePosition({ x, y });
    };

    const handleMouseClick = (
        event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
        const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

        const x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
        const y = (event.clientY - rect.top) * scaleY; // been adjusted to be relative to element

        if (hoverNode.longName !== "") {
            console.log(x, y, hoverNode.longName);
        }

        const floor = ["L2", "L1", "1", "2", "3"];

        let tempHoverNode: DBNode = nullNode;

        for (const node of nodeData) {
            if (node.floor === floor[mapLevel]) {
                if (calculateDistance(mousePosition, node) < 12) {
                    sethoverNode(node);
                    tempHoverNode = node;
                    break;
                }
                sethoverNode(nullNode);
            }
        }

        if (tempHoverNode.nodeType == "ELEV") {
            for (let i = 0; i < pathData.length - 1; i++) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "ELEV" &&
                    pathData[i + 1].nodeType == "ELEV"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i + 1].floor));
                }
            }
        }

        if (tempHoverNode.nodeType == "ELEV") {
            for (let i = pathData.length - 1; i > 0; i--) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "ELEV" &&
                    pathData[i - 1].nodeType == "ELEV"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i - 1].floor));
                }
            }
        }

        if (tempHoverNode.nodeType == "STAI") {
            for (let i = 0; i < pathData.length - 1; i++) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "STAI" &&
                    pathData[i + 1].nodeType == "STAI"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i + 1].floor));
                }
            }
        }

        if (tempHoverNode.nodeType == "STAI") {
            for (let i = pathData.length - 1; i > 0; i--) {
                if (
                    pathData[i].nodeID == tempHoverNode.nodeID &&
                    pathData[i].nodeType == "STAI" &&
                    pathData[i - 1].nodeType == "STAI"
                ) {
                    sethoverNode(nullNode);
                    nodes.setLevel(floor.indexOf(pathData[i - 1].floor));
                }
            }
        }
    };

    const [dashOffset, setDashOffset] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDashOffset((dashOffset) => dashOffset + 1);
        }, 50); // Adjust timing as needed

        return () => clearInterval(intervalId);
    }, []);

    const transformWrapperRef = useRef<ReactZoomPanPinchRef>(null);

    useEffect(() => {
        const zoomToRectangle = (
            transformWrapperRef: RefObject<ReactZoomPanPinchRef>,
        ): void => {
            if (transformWrapperRef.current) {
                const { setTransform } = transformWrapperRef.current;

                const image = new Image();
                image.src = MapImage[mapLevel];

                if (canvasRef.current) {
                    const canvas = canvasRef.current;
                    const context = canvas.getContext("2d");
                    if (context) {
                        image.onload = () => {
                            setTimeout(() => {
                                setTransform(0, 0, 1.5);
                            }, 600);
                        };
                    }
                }
            }
        };
        zoomToRectangle(transformWrapperRef);
    }, [mapLevel]);

    //DRAWING OF NODES AND PATH
    useEffect(() => {
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;

        //This shit supposed to draw the image and the nodes let's goooo
        const image = new Image();
        image.src = MapImage[mapLevel];
        // Path to your image file
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                image.onload = () => {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    drawGraph(
                        context!,
                        xMult,
                        yMult,
                        pathData,
                        nodeData,
                        mapLevel,
                        mousePosition,
                        dashOffset,
                    );
                };
            }
        }
    }, [
        nodeData,
        pathData,
        imageSize,
        mapLevel,
        mousePosition,
        dashOffset,
        containerSize,
    ]);

    function calculateDistance(point1: { x: number; y: number }, node: DBNode) {
        return Math.sqrt(
            Math.pow(node.xcoord - point1.x, 2) +
                Math.pow(node.ycoord - point1.y, 2),
        );
    }

    const adjustCanvasSize = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = 5000 / 3400;
        const aspectHeight = 3400 / 5000;

        // Calculate both potential widths and heights
        const widthFromHeight = viewportHeight * aspectRatio;
        const heightFromWidth = viewportWidth * aspectHeight;

        if (viewportWidth >= widthFromHeight) {
            // If the viewport is wider than the height-based calculated width
            if (canvasRef.current) {
                canvasRef.current.style.width = "100vw";
                canvasRef.current.style.height = `${heightFromWidth}px`;
            }
        } else {
            // If the viewport is not as wide
            if (canvasRef.current) {
                canvasRef.current.style.width = `${widthFromHeight}px`;
                canvasRef.current.style.height = "100vh";
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", adjustCanvasSize);
        adjustCanvasSize(); // Call on initial render

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("resize", adjustCanvasSize);
        };
    }, []);
    return (
        <TransformWrapper
            ref={transformWrapperRef}
            initialScale={1.5}
            centerOnInit={true}
            minScale={1}
            maxScale={4}
            wheel={{ step: 0.5 }}
            doubleClick={{ disabled: false }}
            onPanningStop={handlePanningStopped}
        >
            <TransformComponent>
                <canvas
                    ref={canvasRef}
                    height={3400}
                    width={5000}
                    style={{
                        display: "block",
                        overflow: "hidden",
                    }}
                    id="layer1"
                    onMouseMove={handleMouseMoveCanvas}
                    onClick={handleMouseClick}
                />
            </TransformComponent>
        </TransformWrapper>
    );
}
