import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { SecurityServiceRequest } from "common/src/types";

const router = express.Router();

async function getSecurityServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "SECURITY",
        },
        include: {
            security: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: SecurityServiceRequest = req.body;
    let boolCheck = serviceRequest.alertAuthorities;
    if (typeof serviceRequest.alertAuthorities === "string") {
        boolCheck = serviceRequest.alertAuthorities === "true";
    }
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "SECURITY",
                security: {
                    create: {
                        requestType: serviceRequest.requestType,
                        alertAuthorities: boolCheck,
                    },
                },
            },
            include: {
                security: true,
            },
        });

        res.send(
            `Security Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getSecurityServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
