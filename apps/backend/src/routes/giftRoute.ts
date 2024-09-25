import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { GiftServiceRequest } from "common/src/types";

const router = express.Router();

async function getGiftServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "GIFT",
        },
        include: {
            gift: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: GiftServiceRequest = req.body;
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "GIFT",
                gift: {
                    create: {
                        recipientName: serviceRequest.recipientName,
                        message: serviceRequest.message,
                        giftSize: serviceRequest.giftSize,
                        wrapping: serviceRequest.wrapping,
                    },
                },
            },
            include: {
                flower: true,
            },
        });

        res.send(
            `Gift Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getGiftServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
