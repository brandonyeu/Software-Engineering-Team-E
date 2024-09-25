import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { Node } from "common/src/types";

const router = express.Router();

async function getNodesFromDB(): Promise<string> {
    const nodes: string = await client.$queryRaw`SELECT * FROM node`;
    return nodes;
}

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const fileContent: string = req.body.fileContent;
        console.log("Node Data Received:", fileContent);

        // Split the fileContent string into individual rows
        const rows = fileContent.split("\n");

        // Iterate over each row and insert it into the database
        for (let i = 1; i < rows.length; i++) {
            // Start from index 1 to skip the header row
            const row = rows[i];
            const [
                building,
                floor,
                longName,
                nodeID,
                nodeType,
                shortName,
                xcoord,
                ycoord,
            ] = row.split(",");

            // Create a FlowerServiceRequest object
            const nodeData: Node = {
                building,
                floor,
                longName,
                nodeID,
                nodeType,
                shortName,
                xcoord,
                ycoord,
                edges: [],
            };

            // Insert flowerData into the database
            await client.node.create({
                data: {
                    nodeID: nodeData.nodeID,
                    xcoord: parseInt(nodeData.xcoord), // Ensure xcoord is parsed as an integer
                    ycoord: parseInt(nodeData.ycoord), // Ensure ycoord is parsed as an integer
                    floor: nodeData.floor,
                    building: nodeData.building,
                    nodeType: nodeData.nodeType,
                    longName: nodeData.longName,
                    shortName: nodeData.shortName,
                    edges: "[]",
                },
            });
        }

        res.send("Nodes added to database");
    } catch (error) {
        console.error("Error uploading node data:", error);
        res.status(500).send("Failed to add nodes to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    const msg = await getNodesFromDB();
    res.send(msg);
});

export default router;
