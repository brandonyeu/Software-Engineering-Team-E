import express, { Request, Response } from "express";
import client from "../bin/database-connection.ts";

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const fileContent: string = req.body.fileContent;
        console.log("Node data:", fileContent);

        const rows = fileContent.split("\n");

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const [
                nodeID,
                xcoord,
                ycoord,
                floor,
                building,
                nodeType,
                longName,
                shortName,
            ] = row.split(",");

            const nodeData: {
                nodeID: string;
                xcoord: string;
                ycoord: string;
                floor: string;
                building: string;
                nodeType: string;
                longName: string;
                shortName: string;
            } = {
                nodeID,
                xcoord,
                ycoord,
                floor,
                building,
                nodeType,
                longName,
                shortName,
            };

            await client.node.create({
                data: {
                    nodeID: nodeData.nodeID,
                    xcoord: parseInt(nodeData.xcoord),
                    ycoord: parseInt(nodeData.ycoord),
                    floor: nodeData.floor,
                    nodeType: nodeData.nodeType,
                    building: nodeData.building,
                    longName: nodeData.longName,
                    shortName: nodeData.shortName,
                    edges: "TBD",
                },
            });
        }

        res.send("Nodes added to database");
    } catch (error) {
        console.error("Error uploading node data:", error);
        res.status(500).send("Failed to add node to database");
    }
});

export default router;
