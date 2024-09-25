import express, { Request, Response } from "express";
import client from "../bin/database-connection.ts";
import { FlowerServiceRequest } from "common/src/types"; // Adjust the path accordingly

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const fileContent: string = req.body.fileContent;
        console.log("Flower data received:", fileContent);

        const rows = fileContent.split("\n");

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const [
                patientName,
                location,
                senderName,
                cardMessage,
                flowerType,
                status,
                priority,
            ] = row.split(",");

            const flowerData: FlowerServiceRequest = {
                patientName,
                location,
                senderName,
                cardMessage,
                flowerType,
                status,
                priority,
            };

            await client.flower.create({
                data: {
                    patientName: flowerData.patientName,
                    location: flowerData.location, // Ensure roomNumber is parsed as an integer
                    senderName: flowerData.senderName,
                    cardMessage: flowerData.cardMessage,
                    flowerType: flowerData.flowerType,
                    status: flowerData.status,
                    priority: flowerData.status,
                },
            });
        }

        res.send("Flowers added to database");
    } catch (error) {
        console.error("Error uploading flower data:", error);
        res.status(500).send("Failed to add flowers to database");
    }
});

export default router;
