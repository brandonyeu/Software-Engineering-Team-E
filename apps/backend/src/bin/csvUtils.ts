import * as fs from "fs";
import { Edge, DBParseNode } from "common/src/types";
import client from "../bin/database-connection";

export function saveNodesToCSV(nodes: DBParseNode[], filename: string) {
    const headers =
        "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName";
    const rows = nodes
        .map(
            (node) =>
                `${node.nodeID},${node.coords.xcoord},${node.coords.ycoord},${node.floor},${node.building},${node.nodeType},${node.longName},${node.shortName}`,
        )
        .join("\n");
    const csvData = `${headers}\n${rows}`;

    fs.writeFileSync(filename, csvData);
    console.log(`Nodes saved to ${filename}`);
}

export function saveEdgesToCSV(edges: Edge[], filename: string) {
    const headers = "edgeID,startNode,endNode";
    const rows = edges
        .map((edge) => `${edge.edgeID},${edge.start},${edge.end}`)
        .join("\n");
    const csvData = `${headers}\n${rows}`;

    fs.writeFileSync(filename, csvData);
    console.log(`Edges saved to ${filename}`);
}

export function createNodes(csvFile: string) {
    const lines = csvFile.trim().split(/\r?\n/);
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
    return nodesArray;
}

export function createEdges(csvFile: string) {
    const lines = csvFile.trim().split(/\r?\n/);
    const edgesArray: Edge[] = lines.slice(1).map((line) => {
        line = line.replace(/\r$/, "");
        const [edgeID, start, end] = line.split(",");
        return {
            edgeID: edgeID,
            start: start,
            end: end,
        };
    });

    return edgesArray;
}

export async function processGraphData(
    nodeList: DBParseNode[],
    edgeList: Edge[],
) {
    if (nodeList.length === 0) {
        const nodes: string = "./src/data/nodes.csv";
        nodeList = createNodes(nodes);
    } else if (edgeList.length === 0) {
        const edges: string = "./src/data/edges.csv";
        edgeList = createEdges(edges);
    }
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
    return 1;
}
