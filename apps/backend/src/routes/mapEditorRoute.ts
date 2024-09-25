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
    const nodeReq: DBNode = req.body;
    try {
        await client.node.update({
            where: {
                nodeID: nodeReq.nodeID,
            },
            data: {
                longName: nodeReq.longName,
                nodeType: nodeReq.nodeType,
                shortName: nodeReq.shortName,
                xcoord: nodeReq.xcoord,
                ycoord: nodeReq.ycoord,
                blocked: nodeReq.blocked,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to update node to database");
    }
    res.send("node update sent to database");
});

router.get("/nodes", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

async function getEdgesFromDB(): Promise<string> {
    edge = await client.$queryRaw`SELECT * FROM edge`;
    return edge;
}

router.post("/edges", async (req: Request, res: Response) => {
    const edgeReq: Edge = req.body;
    try {
        await client.edge.update({
            where: {
                edgeID: edgeReq.edgeID,
            },
            data: {
                edgeID: edgeReq.edgeID,
                startNodeID: edgeReq.start,
                endNodeID: edgeReq.end,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to update edge to database");
    }
    res.send("edge update sent to database");
});

router.get("/edges", async (req: Request, res: Response) => {
    const msg = await getEdgesFromDB();
    res.send(msg);
});

export default router;
