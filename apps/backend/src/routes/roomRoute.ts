import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { RoomSchedulingForm } from "common/src/types";

const router = express.Router();

async function getRoomServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "ROOMSCHEDULE",
        },
        include: {
            roomschedule: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: RoomSchedulingForm = req.body;
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                serviceType: "ROOMSCHEDULE",
                roomschedule: {
                    create: {
                        serviceType: serviceRequest.serviceType,
                        startTime: serviceRequest.startTime,
                        endTime: serviceRequest.endTime,
                    },
                },
            },
            include: {
                roomschedule: true,
            },
        });

        res.send(
            `Room Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getRoomServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
