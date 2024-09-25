import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { MedicalDeviceServiceRequest } from "common/src/types";

const router = express.Router();

async function getMedDeviceServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "MEDICALDEVICE",
        },
        include: {
            medicaldevice: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: MedicalDeviceServiceRequest = req.body;
    const boolCheck: boolean = serviceRequest.withBalloons === "true";
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "MEDICALDEVICE",
                medicaldevice: {
                    create: {
                        selectedDevice: serviceRequest.selectedDevice,
                        withBalloons: boolCheck,
                    },
                },
            },
            include: {
                medicaldevice: true,
            },
        });

        res.send(
            `MedicalDevice Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getMedDeviceServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
