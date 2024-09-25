import express, { Request, Response } from "express";
import client from "../bin/database-connection.ts";
import { Edge } from "common/src/types"; // Adjust the path accordingly

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const fileContent: string = req.body.fileContent;
        console.log("Edge data received:", fileContent);

        const rows = fileContent.split("\n");

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const [start, end] = row.split(",");

            const edgeID = `${start}_${end}`;
            const edgeData: Edge = {
                edgeID,
                start,
                end,
            };

            await client.edge.create({
                data: {
                    edgeID: edgeData.edgeID,
                    startNodeID: edgeData.start,
                    endNodeID: edgeData.end,
                },
            });
        }

        res.send("Edges added to database");
    } catch (error) {
        console.error("Error uploading edge data:", error);
        res.status(500).send("Failed to add edges to database");
    }
});

export default router;
