import { Node } from "./graphData.ts";

export function euclideanDistance(nodeA: Node, nodeB: Node): number {
    return Math.sqrt(
        Math.pow(nodeA.coords.xcoord - nodeB.coords.xcoord, 2) +
            Math.pow(nodeA.coords.ycoord - nodeB.coords.ycoord, 2),
    );
}

export default euclideanDistance;
