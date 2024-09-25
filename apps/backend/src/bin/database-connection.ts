import fs from "fs";
import { PrismaClient } from "database";
import { DBParseNode, Edge } from "common/src/types";
// Create the prisma client, this automatically connects to the database
const client = new PrismaClient();

const edges: string = "./src/data/edges.csv";
const nodes: string = "./src/data/nodes.csv";

function createNodes(): Promise<DBParseNode[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(nodes, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                reject(err);
                return;
            }

            const lines = data.trim().split(/\r?\n/);
            const nodesArray: DBParseNode[] = lines.slice(1).map((line) => {
                line = line.replace(/\r$/, "");
                const [
                    nodeID,
                    xcoord,
                    ycoord,
                    floor,
                    building,
                    nodeType,
                    longName,
                    shortName,
                ] = line.split(",");
                return {
                    nodeID: nodeID,
                    coords: {
                        xcoord: parseInt(xcoord, 10),
                        ycoord: parseInt(ycoord, 10),
                    },
                    floor: floor,
                    building: building,
                    nodeType: nodeType,
                    longName: longName,
                    shortName: shortName,
                    edges: [],
                };
            });

            resolve(nodesArray);
        });
    });
}

function createEdges(): Promise<Edge[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(edges, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                reject(err);
                return;
            }

            const lines = data.trim().split(/\r?\n/);
            const edgesArray: Edge[] = lines.slice(1).map((line) => {
                line = line.replace(/\r$/, "");
                const [edgeID, start, end] = line.split(",");
                return {
                    edgeID: edgeID,
                    start: start,
                    end: end,
                };
            });

            resolve(edgesArray);
        });
    });
}

async function processGraphData(): Promise<void> {
    const nodeList: DBParseNode[] = await createNodes();
    const edgeList: Edge[] = await createEdges();

    for (let i = 0; i < edgeList.length; i++) {
        for (let j = 0; j < nodeList.length; j++) {
            if (
                nodeList[j].nodeID === edgeList[i].start ||
                nodeList[j].nodeID === edgeList[i].end
            ) {
                if (!nodeList[j].edges.includes(edgeList[i])) {
                    nodeList[j].edges.push(edgeList[i]);
                }
            }
        }
    }
    //console.log(nodeList);

    // Process edges
    for (const edge of edgeList) {
        try {
            await client.edge.create({
                data: {
                    edgeID: edge.edgeID,
                    startNodeID: edge.start,
                    endNodeID: edge.end,
                },
            });
        } catch (e) {
            //console.log(`Edge with ID ${edge.edgeID} already exists. Skipping...`);
        }
    }

    for (const node of nodeList) {
        try {
            await client.node.create({
                data: {
                    nodeID: node.nodeID,
                    xcoord: node.coords.xcoord,
                    ycoord: node.coords.ycoord,
                    floor: node.floor,
                    building: node.building,
                    nodeType: node.nodeType,
                    longName: node.longName,
                    shortName: node.shortName,
                    //ignore this "TBD" I promise it works as intended (maybe)
                    edges: "TBD",
                },
            });
        } catch (e) {
            //console.log(`Node with ID ${node.nodeID} already exists. Skipping...`);
        }
    }
}

// async function generateAllOutput(): Promise<void> {
//   const result = await client.$queryRaw`SELECT * FROM node`;
//   console.log(result);
//   const result2 = await client.$queryRaw`SELECT * FROM edge`;
//   console.log(result2);
// }

processGraphData();
//generateAllOutput();
// Export the client
export default client;

// Prisma automatically closes on shutdown
