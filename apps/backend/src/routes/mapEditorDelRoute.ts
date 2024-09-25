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
        await client.node.delete({
            where: {
                nodeID: nodeReq.nodeID,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to delete node from the database");
    }
    res.send("Node deleted from the database");
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
        await client.edge.delete({
            where: {
                edgeID: edgeReq.edgeID,
            },
        });
    } catch (e) {
        console.log(e);
        res.send("Failed to delete edge from the database");
    }
    res.send("Edge deleted from the database");
});

router.get("/edges", async (req: Request, res: Response) => {
    const msg = await getEdgesFromDB();
    res.send(msg);
});

export default router;
