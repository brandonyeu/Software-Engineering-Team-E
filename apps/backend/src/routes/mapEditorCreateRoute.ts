import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { DBNode, Edge } from "common/src/types";

const router = express.Router();

let node: string;
let edge: string;

async function getNodesFromDB(): Promise<string> {
    node = await client.$queryRaw`SELECT * FROM node`;
    return node;
}

router.post("/nodes", async (req: Request, res: Response) => {
    const nodeData: DBNode = req.body;
    try {
        await client.node.create({
            data: {
                nodeID: nodeData.nodeID,
                xcoord: nodeData.xcoord,
                ycoord: nodeData.ycoord,
                floor: nodeData.floor,
                building: nodeData.building,
                nodeType: nodeData.nodeType,
                longName: nodeData.longName,
                shortName: nodeData.shortName,
                edges: "[]",
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to create node in the database");
    }
    res.send("Node created in the database");
});

router.get("/nodes", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

async function getEdgesFromDB(): Promise<string> {
    node = await client.$queryRaw`SELECT * FROM edge`;
    return edge;
}

router.post("/edges", async (req: Request, res: Response) => {
    const edgeData: Edge = req.body;
    console.log("Attempting to create edge with data:", edgeData); // Log the edgeData object
    try {
        await client.edge.create({
            data: {
                edgeID: edgeData.edgeID,
                startNodeID: edgeData.start,
                endNodeID: edgeData.end,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to create edge in the database");
    }
    res.send("Edge created in the database");
});

router.get("/edges", async (req: Request, res: Response) => {
    const msg = await getEdgesFromDB();
    res.send(msg);
});

export default router;
