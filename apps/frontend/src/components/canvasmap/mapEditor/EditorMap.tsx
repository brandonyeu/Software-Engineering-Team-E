import React, { useEffect, useState, useRef } from "react";
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
import drawGraph from "@/components/canvasmap/mapEditor/RenderGraph.tsx";
import NodeEditor from "./NodeEditor";
import NodeCreator from "./NodeCreator.tsx";
import EdgeCreator from "./EdgeCreator.tsx";
import { Button } from "@/components/ui/button.tsx";
import EdgeEditor from "@/components/canvasmap/mapEditor/EdgeEditor.tsx";
import axios from "axios";

async function sendDragNodeOrder(updatedNode: DBNode) {
    axios.post("/api/mapeditordrag/update", updatedNode).then((res) => {
        console.log("Updated node data:", updatedNode); // Log the updatedNode data
        console.log(res);
    });
}

// Array of map images for each level
const MapImage = [LLevel2, LLevel1, Level1, Level2, Level3];

// Interface for the component's props
interface CanvasMapProps {
    nodes: DBNode[];
    path: DBNode[][];
    level: number;
    triggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

// EditorMap component function
export default function EditorMap(props: CanvasMapProps) {
    const { nodes, path, level, triggerRefresh } = props;

    // State for selected node
    const [selectedNode, setSelectedNode] = useState<DBNode | null>(null);
    const [hoverNode, setHoverNode] = useState<DBNode | null>(null);
    const [dragNode, setDragNode] = useState<DBNode | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // State to track selected start and end nodes
    const [startNode, setStartNode] = useState<DBNode | null>(null);
    const [endNode, setEndNode] = useState<DBNode | null>(null);

    // Existing states and refs
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [nodeInfoPosition, setNodeInfoPosition] = useState({ x: 0, y: 0 });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mouseState, setMouseState] = useState({ down: false });

    // Effect to handle image loading and updating container size
    useEffect(() => {
        const image = new Image();
        image.src = MapImage[level];
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
    }, [level]);

    // Function to update container size
    const updateContainerSize = () => {
        setContainerSize({
            width: window.outerWidth,
            height: window.outerHeight,
        });
    };

    // Function to handle panning stop events
    const handlePanningStopped = (e: ReactZoomPanPinchRef) => {
        const x = e.state.positionX;
        const y = e.state.positionY;
        const scale = e.state.scale;

        // Center image if it's smaller than the container
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
                (containerSize.height - imageSize.height * scale) / 2,
                scale,
            );
        }
    };

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
        setNodeInfoPosition({
            x: event.nativeEvent.clientX,
            y: event.nativeEvent.clientY,
        });

        for (let i = 0; i < nodes.length; i++) {
            if (
                selectedNode?.nodeID == nodes[i].nodeID &&
                mouseState.down &&
                isDragging
            ) {
                for (let i = 0; i < path.length; i++) {
                    for (let j = 0; j < path[i].length; j++) {
                        if (path[i][j].nodeID == selectedNode.nodeID) {
                            path[i][j].xcoord = mousePosition.x;
                            path[i][j].ycoord = mousePosition.y;
                        }
                    }
                }
                nodes[i].xcoord = mousePosition.x;
                nodes[i].ycoord = mousePosition.y;
            }
        }
    };

    const handleMouseDown = () => {
        setMouseState({ down: true });
        for (let i = 0; i < nodes.length; i++) {
            if (
                selectedNode?.nodeID == nodes[i].nodeID &&
                calculateDistance(mousePosition, nodes[i]) < 9
            ) {
                setDragNode(nodes[i]);
                setIsDragging(true);
            }
        }
    };

    const handleMouseUp = () => {
        if (dragNode != null) {
            dragNode.xcoord = Math.round(dragNode.xcoord);
            dragNode.ycoord = Math.round(dragNode.ycoord);
            sendDragNodeOrder(dragNode);
        }
        setMouseState({ down: false });
        setDragNode(null);
        setIsDragging(false);
        //Aksel added this post to db, should work but idk
    };

    // Function to handle mouse click on canvas
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

        // Check if a node is clicked and set it as selected
        if (hoverNode != null) {
            console.log(x, y, hoverNode.longName);
            triggerRefresh(false);
            setSelectedNode(hoverNode);
        }
    };

    //DRAWING OF NODES AND PATH
    useEffect(() => {
        const xMult = imageSize.width / 5000;
        const yMult = imageSize.height / 3400;

        //This shit supposed to draw the image and the nodes let's goooo
        const image = new Image();
        image.src = MapImage[level];
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
                        path,
                        nodes,
                        level,
                        mousePosition,
                        dragNode,
                    );
                };
            }
        }
    }, [nodes, path, imageSize, level, mousePosition, dragNode]);

    function calculateDistance(point1: { x: number; y: number }, node: DBNode) {
        return Math.sqrt(
            Math.pow(node.xcoord - point1.x, 2) +
                Math.pow(node.ycoord - point1.y, 2),
        );
    }

    // Effect to detect hover node
    useEffect(() => {
        const floor = ["L2", "L1", "1", "2", "3"];

        for (const node of nodes) {
            if (node.floor === floor[level]) {
                if (calculateDistance(mousePosition, node) < 9) {
                    setHoverNode(node);
                    break;
                }
                setHoverNode(null);
            }
        }
    }, [nodes, hoverNode, mousePosition, level, nodeInfoPosition]);

    // Action buttons for set as start and set as end
    const setAsStart = () => {
        if (selectedNode) {
            if (selectedNode === endNode) {
                // If selected node is the same as end node, reset end node
                setEndNode(null);
            }
            setStartNode(selectedNode);
            setCloseEditor(false);
        }
    };

    const setAsEnd = () => {
        if (selectedNode) {
            if (selectedNode === startNode) {
                // If selected node is the same as end node, reset start node
                setStartNode(null);
            }
            setEndNode(selectedNode);
            setCloseEditor(false);
        }
    };

    // Function to set the start node
    const handleSetStartNode = () => {
        setAsStart();
        setCloseEditor(false);
    };

    // Function to set the end node
    const handleSetEndNode = () => {
        setAsEnd();
        setCloseEditor(false);
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

    // Interface for a simplified node containing only the nodeID
    interface NodeIDOnly {
        nodeID: string;
    }

    // Function to extract the nodeID from a DBNode
    const extractNodeID = (node: DBNode): NodeIDOnly => {
        return { nodeID: node.nodeID };
    };

    // Function to check if an edge exists between start and end nodes
    const edgeExists = (
        startNode: DBNode | null,
        endNode: DBNode | null,
    ): boolean => {
        if (!startNode || !endNode) return false;

        // Check if there is an edge between start and end nodes
        for (const edge of path) {
            if (
                (edge[0].nodeID === startNode.nodeID &&
                    edge[1].nodeID === endNode.nodeID) ||
                (edge[0].nodeID === endNode.nodeID &&
                    edge[1].nodeID === startNode.nodeID)
            ) {
                return true;
            }
        }
        return false;
    };

    // Function to find the edgeID based on the start and end nodes
    const findEdgeID = (
        startNode: NodeIDOnly,
        endNode: NodeIDOnly,
    ): string | null => {
        const startID = startNode.nodeID.toString();
        const endID = endNode.nodeID.toString();

        // Check if an edge exists between start and end nodes
        if (!edgeExists(startNode as DBNode, endNode as DBNode)) {
            console.log("Edge does not exist");
            return null;
        }

        // Iterate through the path to find the edge
        for (const edge of path) {
            if (
                (edge[0].nodeID === startID && edge[1].nodeID === endID) ||
                (edge[0].nodeID === endID && edge[1].nodeID === startID)
            ) {
                const edgeID = `${edge[0].nodeID}_${edge[1].nodeID}`;
                console.log("Edge ID found:", edgeID);
                return edgeID;
            }
        }

        console.log("Edge ID not found");
        return null;
    };

    // Extract nodeID for startNode and endNode if they are not null
    const startNodeID = startNode ? extractNodeID(startNode) : null;
    const endNodeID = endNode ? extractNodeID(endNode) : null;

    // Pass extracted nodeIDs to findEdgeID function
    const edgeID =
        startNodeID && endNodeID ? findEdgeID(startNodeID, endNodeID) : null;

    // State to control the visibility of the EdgeEditor and EdgeCreator
    const [closeEditor, setCloseEditor] = useState(false);

    // Effect to handle closing the EdgeEditor
    useEffect(() => {
        if (closeEditor) {
            setStartNode(null);
            setEndNode(null);
        }
    }, [closeEditor]);

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
        <>
            {/* Render map and canvas */}
            {selectedNode && (
                <div
                    className="absolute z-10 rounded-md bg-background shadow-lg flex-col rounded-2 float-left top-[30px] right-[100px] "
                    style={{
                        top: `20px`,
                        right: `20px`,
                        zIndex: `9999px`,
                        whiteSpace: "nowrap",
                        minWidth: "fit-content",
                        maxWidth: "calc(100% - 20px)",
                    }}
                >
                    {/* Top color bar */}
                    <div
                        className="text-foreground text-white text-lg font-bold px-4 py-2"
                        style={{ backgroundColor: setColor(selectedNode) }}
                    >
                        <p>Edge Editor/Creator</p>
                        {selectedNode.longName}
                    </div>

                    {/* Node details */}
                    <div className="p-5 text-sm text-foreground">
                        <p>Building: {selectedNode.building}</p>
                        <p>Floor: {selectedNode.floor}</p>
                        <p>ID: {selectedNode.nodeID}</p>
                        <p>Type: {selectedNode.nodeType}</p>
                        <p>
                            Coordinates: ({selectedNode.xcoord},{" "}
                            {selectedNode.ycoord})
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-evenly p-5 space-x-2">
                        <Button
                            className="space-x-2"
                            onClick={handleSetStartNode}
                        >
                            Set as Start
                        </Button>
                        <Button onClick={handleSetEndNode}>Set as End</Button>
                        <Button
                            className="w-full"
                            variant="destructive"
                            onClick={setCloseEditor}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <TransformWrapper
                initialScale={1.5}
                centerOnInit={true}
                limitToBounds={true}
                minScale={1}
                maxScale={4}
                wheel={{ step: 0.5 }}
                doubleClick={{ disabled: false }}
                onPanningStop={handlePanningStopped}
                disabled={isDragging}
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
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
                </TransformComponent>
            </TransformWrapper>

            {/* Node and Edge Editors */}
            {selectedNode === null && !startNode && !endNode && (
                <NodeCreator triggerRefresh={triggerRefresh} />
            )}
            {selectedNode && !startNode && !endNode && (
                <NodeEditor
                    node={selectedNode}
                    triggerRefresh={triggerRefresh}
                />
            )}
            {selectedNode &&
                !closeEditor &&
                !edgeExists(startNode, endNode) &&
                startNode &&
                endNode && (
                    <EdgeCreator
                        edgeID={""}
                        startNodeID={startNode?.nodeID}
                        endNodeID={endNode?.nodeID}
                        handleClose={() => setCloseEditor(true)}
                        triggerRefresh={triggerRefresh}
                    />
                )}
            {!closeEditor &&
                startNode &&
                endNode &&
                edgeExists(startNode, endNode) && (
                    <>
                        {console.log("Start Node:", startNode)}
                        {console.log("End Node:", endNode)}
                        <EdgeEditor
                            startNode={startNode}
                            endNode={endNode}
                            edgeID={edgeID}
                            handleClose={() => setCloseEditor(true)}
                            triggerRefresh={triggerRefresh}
                        />
                    </>
                )}
        </>
    );
}
