import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { SanitationServiceRequest } from "common/src/types";

const router = express.Router();

async function getSanitationServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "SANITATION",
        },
        include: {
            sanitation: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: SanitationServiceRequest = req.body;
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "SANITATION",
                sanitation: {
                    create: {
                        patientName: serviceRequest.patientName,
                        serviceType: serviceRequest.serviceType,
                        additionalInfo: serviceRequest.additionalInfo,
                    },
                },
            },
            include: {
                sanitation: true,
            },
        });

        res.send(
            `Sanitation Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getSanitationServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
