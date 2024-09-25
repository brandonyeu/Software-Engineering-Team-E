import client from "../bin/database-connection";
import express, { Request, Response } from "express";

const router = express.Router();

let edges: string;

async function getEdgesFromDB(): Promise<string> {
    edges = await client.$queryRaw`SELECT * FROM edge`;
    return edges;
}

router.get("/", async (req: Request, res: Response) => {
    const msg = await getEdgesFromDB();
    res.send(msg);
});

export default router;
