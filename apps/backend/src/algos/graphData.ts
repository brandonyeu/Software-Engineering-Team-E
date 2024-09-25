import client from "../bin/database-connection";

interface Coords {
    xcoord: number;
    ycoord: number;
}

export interface Node {
    nodeID: string;
    coords: Coords;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
    edges: Edge[];
}

export interface Edge {
    edgeID: string;
    start: Node;
    end: Node;
}

export async function getNodesFromDatabase(): Promise<Node[]> {
    try {
        const nodes = await client.node.findMany({
            where: {
                blocked: false,
            },
        });
        return nodes.map((node) => ({
            nodeID: node.nodeID,
            coords: {
                xcoord: node.xcoord,
                ycoord: node.ycoord,
            },
            floor: node.floor,
            building: node.building,
            nodeType: node.nodeType,
            longName: node.longName,
            shortName: node.shortName,
            edges: [],
        }));
    } catch (error) {
        console.error("Error fetching nodes from the database:", error);
        throw error;
    }
}

export async function getEdgesFromDatabase(nodeList: Node[]): Promise<Edge[]> {
    try {
        const edges = await client.edge.findMany();
        const edgeList: Edge[] = [];
        edges.forEach((edge) => {
            const startNode = nodeList.find(
                (node) => node.nodeID === edge.startNodeID,
            );
            const endNode = nodeList.find(
                (node) => node.nodeID === edge.endNodeID,
            );
            if (!startNode || !endNode) {
                console.log("Node not found for edge, skipping edge.");
            } else {
                edgeList.push({
                    edgeID: edge.edgeID,
                    start: startNode,
                    end: endNode,
                });
            }
        });
        return edgeList;
    } catch (error) {
        console.error("Error fetching edges from the database:", error);
        throw error;
    }
}

export async function processGraphData(): Promise<[Node[], Edge[]]> {
    try {
        const nodeList: Node[] = await getNodesFromDatabase();
        const edgeList: Edge[] = await getEdgesFromDatabase(nodeList);

        // Link edges to nodes
        for (const edge of edgeList) {
            edge.start.edges.push(edge);
            edge.end.edges.push(edge);
        }
        const nodesandedges: [Node[], Edge[]] = [nodeList, edgeList];
        return nodesandedges;
    } catch (error) {
        console.error("Error processing graph data:", error);
        throw error;
    }
}

export function convertNodeID(path: Node[] | null): string[] | null {
    if (path === null) {
        return null;
    }
    const newPath: string[] = [path[0].nodeID];
    for (let i = 1; i < path.length; i++) {
        newPath.push(path[i].nodeID);
    }
    return newPath;
}

export default processGraphData();
