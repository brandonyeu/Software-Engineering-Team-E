import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { InterpreterServiceRequest } from "common/src/types";

const router = express.Router();

async function getInterpServicesFromDB(): Promise<string> {
    const services = await client.service.findMany({
        where: {
            serviceType: "INTERPRETER",
        },
        include: {
            interpreter: true,
        },
    });
    return JSON.stringify(services);
}

router.post("/", async (req: Request, res: Response) => {
    const serviceRequest: InterpreterServiceRequest = req.body;
    try {
        const createdService = await client.service.create({
            data: {
                location: serviceRequest.location,
                status: serviceRequest.status,
                priority: serviceRequest.priority,
                employeeName: serviceRequest.employeeName,
                createdBy: serviceRequest.createdBy,
                serviceType: "INTERPRETER",
                interpreter: {
                    create: {
                        clientName: serviceRequest.clientName,
                        language: serviceRequest.language,
                        duration: serviceRequest.duration,
                        additionalInfo: serviceRequest.additionalInfo,
                    },
                },
            },
            include: {
                flower: true,
            },
        });

        res.send(
            `Interpreter Service added to database: ${JSON.stringify(createdService)}`,
        );
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add service to database");
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await getInterpServicesFromDB();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve services from database");
    }
});

export default router;
