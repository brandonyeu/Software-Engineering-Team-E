import express, { Request, Response } from "express";
import client from "../bin/database-connection.ts";
import { DrugDeliveryData } from "common/src/types/medicinerequest.ts";

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const fileContent: string = req.body.fileContent;
        console.log("Medicine data received:", fileContent);

        // Split the fileContent string into individual rows
        const rows = fileContent.split("\n");

        // Iterate over each row and insert it into the database
        for (let i = 1; i < rows.length; i++) {
            // Start from index 1 to skip the header row
            const row = rows[i];
            const [
                patientName,
                location,
                patientCondition,
                drugName,
                drugQuantity,
                status,
                priority,
            ] = row.split(",");

            // Create a FlowerServiceRequest object
            const medicineData: DrugDeliveryData = {
                patientName,
                location,
                patientCondition,
                drugName,
                drugQuantity,
                status,
                priority,
            };

            // Insert flowerData into the database
            await client.medicine.create({
                data: {
                    patientName: medicineData.patientName,
                    location: medicineData.location, // Ensure roomNumber is parsed as an integer
                    patientCondition: medicineData.patientCondition,
                    drugName: medicineData.drugName,
                    drugQuantity: medicineData.drugQuantity,
                    status: medicineData.status,
                    priority: medicineData.status,
                },
            });
        }

        res.send("Meds added to database");
    } catch (error) {
        console.error("Error uploading flower data:", error);
        res.status(500).send("Failed to add meds to database");
    }
});

export default router;
