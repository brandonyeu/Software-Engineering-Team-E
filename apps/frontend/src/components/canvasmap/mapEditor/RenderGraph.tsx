import { DBNode } from "common/src/types";
import drawNodes from "@/components/canvasmap/mapEditor/MapShapes.tsx";

export default function drawGraph(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
    pathData: DBNode[][],
    nodeData: DBNode[],
    mapLevel: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    const floor = ["L2", "L1", "1", "2", "3"];
    ctx.imageSmoothingEnabled = true;

    // Draw paths
    if (pathData.length > 0) {
        ctx.setLineDash([5, 0]);
        ctx.strokeStyle = "#1d3e60";
        ctx.lineWidth = 4;

        for (const group of pathData) {
            if (group.length > 0 && group[0].floor === floor[mapLevel]) {
                ctx.beginPath();
                ctx.moveTo(group[0].xcoord * xMult, group[0].ycoord * yMult);

                // Draw the path for each group
                for (let i = 1; i < group.length; i++) {
                    const node = group[i];
                    if (node.floor === floor[mapLevel]) {
                        ctx.lineTo(node.xcoord * xMult, node.ycoord * yMult);
                    }
                }

                ctx.stroke();
            }
        }
    }

    //NODE DRAWING
    drawNodes(ctx, nodeData, xMult, yMult, mapLevel, mousePosition, dragNode);
}

// //PATH DRAWING
// if (pathData.length > 0) {
//     ctx.setLineDash([7, 3]);
//     ctx.strokeStyle = "#000000";
//     ctx.lineWidth = 4;
//     if (pathData[0].floor === floor[mapLevel]) {
//         ctx.beginPath();
//         ctx.moveTo(pathData[0].xcoord * xMult, pathData[0].ycoord * yMult);
//     }
//     for (let i = 1; i < pathData.length; i++) {
//         const node = pathData[i];
//         if (node.floor === floor[mapLevel]) {
//             //LINE DRAWING
//             ctx.lineTo(node.xcoord * xMult, node.ycoord * yMult);
//         }
//         if (node.floor !== floor[mapLevel]) {
//             ctx.stroke();
//             ctx.beginPath();
//             continue;
//         }
//
//         if (pathData[pathData.length - 1].floor === floor[mapLevel]) {
//             ctx.stroke();
//         }
//     }
//     ctx.setLineDash([5, 0]);
//     ctx.lineWidth = 2;
// }

// function drawNodes(ctx: CanvasRenderingContext2D) {
//     // Draw nodes
//     nodes.forEach((node) => {
//         if (node.floor !== floor[level]) return;
//
//         // Draw the original dot
//         ctx.beginPath();
//         ctx.fillStyle = "#002244";
//         ctx.arc(
//             node.xcoord * xMult,
//             node.ycoord * yMult,
//             3,
//             0,
//             2 * Math.PI,
//         );
//         ctx.fill();
//
//         // Draw the ring around the dot
//         ctx.setLineDash([5, 0]);
//         ctx.beginPath();
//         ctx.strokeStyle = "#012d5a";
//         ctx.lineWidth = 2;
//         ctx.arc(
//             node.xcoord * xMult,
//             node.ycoord * yMult,
//             6,
//             0,
//             2 * Math.PI,
//         );
//         ctx.stroke();
//
//         // Add event listener for node clicks
//         canvasRef.current?.addEventListener("click", (e) => {
//             // Check if canvasRef.current is not null
//             if (canvasRef.current) {
//                 // Calculate the click position in the canvas
//                 const rect = canvasRef.current.getBoundingClientRect();
//                 const clickX = e.clientX - rect.left;
//                 const clickY = e.clientY - rect.top;
//
//                 // Calculate the distance between the click position and the node
//                 const dx = clickX - node.xcoord * xMult;
//                 const dy = clickY - node.ycoord * yMult;
//                 const distance = Math.sqrt(dx ** 2 + dy ** 2);
//
//                 // If the click is within the radius of the ring around the node, handle the node click
//                 if (distance <= 6) {
//                     handleNodeClick(node);
//                 }
//             }
//         });
//     });
//
// }
