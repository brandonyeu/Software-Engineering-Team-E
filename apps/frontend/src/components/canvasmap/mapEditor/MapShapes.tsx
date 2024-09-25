import { DBNode } from "common/src/types";

export default function drawNodes(
    ctx: CanvasRenderingContext2D,
    nodeData: DBNode[],
    xMult: number,
    yMult: number,
    mapLevel: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    const floor = ["L2", "L1", "1", "2", "3"];
    nodeData.forEach((node) => {
        if (node.floor !== floor[mapLevel]) return;
        ctx.lineWidth = 2;
        switch (node.nodeType) {
            case "HALL":
                drawSquare(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "CONF":
                drawRectangle(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "DEPT":
                drawCircle(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "ELEV":
                drawOval(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "EXIT":
                drawHexagon(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "INFO":
                drawTriangle(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "LABS":
                drawRhombus(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "REST":
                drawParallelogram(
                    ctx,
                    node,
                    xMult,
                    yMult,
                    mousePosition,
                    dragNode,
                );
                break;
            case "BATH":
                drawTrapezoid(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "RETL":
                drawOctagon(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "STAI":
                drawPentagon(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
            case "SERV":
                drawSeptagon(ctx, node, xMult, yMult, mousePosition, dragNode);
                break;
        }
    });
}
function calculateDistance(point1: { x: number; y: number }, node: DBNode) {
    return Math.sqrt(
        Math.pow(node.xcoord - point1.x, 2) +
            Math.pow(node.ycoord - point1.y, 2),
    );
}

function drawHexagon(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    let size = 7;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        size *= 2;
    }

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";

    for (let side = 0; side <= 6; side++) {
        const angle = ((2 * Math.PI) / 6) * side;
        const x = node.xcoord * xMult + size * Math.cos(angle);
        const y = node.ycoord * yMult + size * Math.sin(angle);

        if (side === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.fillStyle = "#ddde1f";
    ctx.fill();
    ctx.stroke();
}

function drawCircle(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    let size = 6;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        size *= 2;
    }
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(node.xcoord * xMult, node.ycoord * yMult, size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#e04545";
    ctx.fill();
    ctx.stroke();
}

function drawSquare(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    let size: number = 10;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        size *= 2;
    }
    const halfSize = size / 2;
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;

    ctx.rect(centerX - halfSize, centerY - halfSize, size, size);
    ctx.fillStyle = "#0a2ce1";
    ctx.fill();
    ctx.stroke();
}

function drawRectangle(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    let size = 10;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        size *= 2;
    }
    const halfSize = size / 2;
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;

    ctx.rect(
        centerX - halfSize - size * 0.25,
        centerY - halfSize,
        size + size * 0.5,
        size,
    );
    ctx.fillStyle = "#25982a";
    ctx.fill();
    ctx.stroke();
}

function drawTriangle(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    let size = 14;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        size *= 2;
    }
    const height = size * (Math.sqrt(3) / 2);
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult + 2;

    ctx.moveTo(centerX - size / 2, centerY + height / 3);
    ctx.lineTo(centerX + size / 2, centerY + height / 3);
    ctx.lineTo(centerX, centerY - (2 * height) / 3);
    ctx.closePath();

    ctx.fillStyle = "#1fe18a";
    ctx.fill();
    ctx.stroke();
}

function drawOval(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let radiusX = 8;
    let radiusY = 6;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        radiusX *= 2;
        radiusY *= 2;
    }
    const rotation = 0;
    ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    ctx.fillStyle = "#da8f08";
    ctx.fill();
    ctx.stroke();
}

function drawRhombus(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let diag = 14;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        diag *= 2;
    }
    ctx.moveTo(centerX, centerY - diag / 2);
    ctx.lineTo(centerX + diag / 2, centerY);
    ctx.lineTo(centerX, centerY + diag / 2);
    ctx.lineTo(centerX - diag / 2, centerY);
    ctx.closePath();

    ctx.fillStyle = "#9608da";
    ctx.fill();
    ctx.stroke();
}

function drawParallelogram(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let base = 14;
    let height = 9;
    let skew = 4;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        base *= 2;
        height *= 2;
        skew *= 2;
    }
    ctx.moveTo(centerX - base / 2, centerY + height / 2);
    ctx.lineTo(centerX + base / 2, centerY + height / 2);
    ctx.lineTo(centerX + base / 2 + skew, centerY - height / 2);
    ctx.lineTo(centerX - base / 2 + skew, centerY - height / 2);
    ctx.closePath();

    ctx.fillStyle = "#5cdbda";
    ctx.fill();
    ctx.stroke();
}

function drawTrapezoid(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let base = 16;
    let top = 9;
    let height = 9;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        base *= 2;
        top *= 2;
        height *= 2;
    }

    ctx.moveTo(centerX - base / 2, centerY + height / 2);
    ctx.lineTo(centerX + base / 2, centerY + height / 2);
    ctx.lineTo(centerX + top / 2, centerY - height / 2);
    ctx.lineTo(centerX - top / 2, centerY - height / 2);
    ctx.closePath();

    ctx.fillStyle = "#ce24d4";
    ctx.fill();
    ctx.stroke();
}

function drawOctagon(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let side = 5;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        side *= 2;
    }

    const radius = side / (2 * Math.sin(Math.PI / 8));

    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = "#0b6009";
    ctx.fill();
    ctx.stroke();
}

function drawPentagon(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let side = 8;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        side *= 2;
    }

    const radius = side / (2 * Math.sin(Math.PI / 5));

    for (let i = 0; i < 5; i++) {
        const angle = Math.PI / 2 + ((2 * Math.PI) / 5) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = "#82a7f6";
    ctx.fill();
    ctx.stroke();
}

function drawSeptagon(
    ctx: CanvasRenderingContext2D,
    node: DBNode,
    xMult: number,
    yMult: number,
    mousePosition: { x: number; y: number },
    dragNode: DBNode | null,
) {
    ctx.beginPath();
    const centerX = node.xcoord * xMult;
    const centerY = node.ycoord * yMult;
    let side = 6;
    if (
        calculateDistance(mousePosition, node) < 9 ||
        (dragNode != null && dragNode!.nodeID == node.nodeID)
    ) {
        side *= 2;
    }

    const radius = side / (2 * Math.sin(Math.PI / 7));

    for (let i = 0; i < 7; i++) {
        const angle = Math.PI / 2 + ((2 * Math.PI) / 7) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = "#67c537";
    ctx.fill();
    ctx.stroke();
}
