import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { DrugDeliveryData } from "common/src/types";

const router = express.Router();

async function getMedServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "MEDICINE",
        },
        include: {
            medicine: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: DrugDeliveryData = req.body;
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "MEDICINE",
                medicine: {
                    create: {
                        patientName: serviceRequest.patientName,
                        patientCondition: serviceRequest.patientCondition,
                        drugName: serviceRequest.drugName,
                        drugQuantity: serviceRequest.drugQuantity,
                    },
                },
            },
            include: {
                medicine: true,
            },
        });

        res.send(
            `Medicine Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getMedServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
