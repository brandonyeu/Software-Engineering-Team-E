import { processGraphData, Node, Edge } from "./graphData.ts";
import euclideanDistance from "./euclideanDistance.ts";
import TinyQueue from "tinyqueue";

export class PathFinder {
    private strategy: PathFindingStrategy;

    constructor(strategy: PathFindingStrategy) {
        this.strategy = strategy;
    }

    executeStrategy(startId: string, endId: string): Promise<Node[] | null> {
        return this.strategy.findPath(startId, endId);
    }
}

export interface PathFindingStrategy {
    findPath(start: string, end: string): Promise<Node[] | null>;
}

export abstract class firstSearchAlgos implements PathFindingStrategy {
    add(list: Node[], neighbor: Node) {
        list.push(neighbor);
    }
    async findPath(start: string, end: string): Promise<Node[] | null> {
        const nodes = await getStartEnd(start, end);
        if (nodes[0] && nodes[1]) {
            const queue: Node[] = [nodes[0]];
            const visited: Set<Node> = new Set([nodes[0]]);
            const parentMap: Map<Node, Node> = new Map();

            while (queue.length > 0) {
                let current: Node = queue.shift() as Node;

                // When the end is found, reconstruct the path from end to start
                if (current === nodes[1]) {
                    const path: Node[] = [];
                    while (current) {
                        path.unshift(current);
                        current = parentMap.get(current) as Node;
                    }
                    return path;
                }

                // Explore neighbors
                for (const edge of current.edges) {
                    const neighbor =
                        edge.start === current ? edge.end : edge.start;
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        this.add(queue, neighbor);
                        parentMap.set(neighbor, current); // Track the path
                    }
                }
            }
            // If the loop ends without finding a path
            console.log("Bang! It's null.");
            return null;
        }
        return null;
    }
}

export abstract class weightedSearchAlgos implements PathFindingStrategy {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    weight(start: Node, end: Node) {
        return 0;
    }
    async findPath(start: string, end: string): Promise<Node[] | null> {
        const nodes = await getStartEnd(start, end);
        if (nodes[0] && nodes[1]) {
            const openSet = new PriorityQueue<Node>(
                [],
                (a, b) =>
                    (fScore.get(a) || Infinity) - (fScore.get(b) || Infinity),
            );
            const cameFrom: Map<Node, Node> = new Map();
            const gScore: Map<Node, number> = new Map([[nodes[0], 0]]);
            const fScore: Map<Node, number> = new Map([
                [nodes[0], this.weight(nodes[0], nodes[1])],
            ]);
            const closedSet: Set<Node> = new Set();

            openSet.push(nodes[0]);

            while (!openSet.isEmpty()) {
                let current = openSet.pop()!;

                if (current === nodes[1]) {
                    const path: Node[] = [];
                    while (current) {
                        path.unshift(current);
                        current = cameFrom.get(current)!;
                    }
                    return path;
                }

                closedSet.add(current);

                for (const edge of current.edges) {
                    const neighbor =
                        edge.start === current ? edge.end : edge.start;
                    if (closedSet.has(neighbor)) continue;

                    const tentativeGScore =
                        gScore.get(current)! +
                        euclideanDistance(current, neighbor);

                    if (!openSet.has(neighbor)) openSet.push(neighbor);

                    if (tentativeGScore >= (gScore.get(neighbor) || Infinity))
                        continue;

                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(
                        neighbor,
                        tentativeGScore + this.weight(neighbor, nodes[1]),
                    );
                }
            }
            // If the loop ends without finding a path
            console.log("Bang! It's null.");
            return null;
        }
        return null;
    }
}

class PriorityQueue<T> extends TinyQueue<T> {
    constructor(
        items?: T[],
        private readonly comparator?: (a: T, b: T) => number,
    ) {
        super(items, comparator);
    }

    public push(...items: T[]): number {
        for (const item of items) {
            super.push(item);
        }
        return this.length;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public has(item: T): boolean {
        return this.data.includes(item);
    }
}

export class BFS extends firstSearchAlgos {
    add(list: Node[], neighbor: Node) {
        list.push(neighbor);
    }
}
export class DFS extends firstSearchAlgos {
    add(list: Node[], neighbor: Node) {
        list.unshift(neighbor);
    }
}
export class ASTAR extends weightedSearchAlgos {
    weight(start: Node, end: Node) {
        return euclideanDistance(start, end);
    }
}
export class DIJKSTRA extends weightedSearchAlgos {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    weight(start: Node, end: Node) {
        return 0;
    }
}

async function getStartEnd(
    start: string,
    end: string,
): Promise<(Node | null)[]> {
    const data: [Node[], Edge[]] = await processGraphData();
    const nodeList: Node[] = data[0];
    let startNode: Node | null = null;
    let endNode: Node | null = null;

    for (const node of nodeList) {
        if (node.nodeID === start) {
            startNode = node;
        }
        if (node.nodeID === end) {
            endNode = node;
        }
    }

    return [startNode, endNode];
}
