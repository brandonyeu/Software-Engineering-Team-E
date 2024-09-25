import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { FlowerServiceRequest } from "common/src/types";

const router = express.Router();

async function getFlowerServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "FLOWER",
        },
        include: {
            flower: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: FlowerServiceRequest = req.body;
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "FLOWER",
                flower: {
                    create: {
                        patientName: serviceRequest.patientName,
                        senderName: serviceRequest.senderName,
                        cardMessage: serviceRequest.cardMessage,
                        flowerType: serviceRequest.flowerType,
                    },
                },
            },
            include: {
                flower: true,
            },
        });

        res.send(
            `Flower Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getFlowerServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
