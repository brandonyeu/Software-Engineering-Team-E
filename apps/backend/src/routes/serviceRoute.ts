import client from "../bin/database-connection";
import express, { Request, Response } from "express";

const router = express.Router();

async function getAllServicesFromDB(name: string): Promise<string> {
    const services = await client.service.findMany({
        where: {
            employeeName: name,
        },
        include: {
            flower: true,
            gift: true,
            sanitation: true,
            security: true,
            medicaldevice: true,
            medicine: true,
            roomschedule: true,
            interpreter: true,
        },
    });
    return JSON.stringify(services);
}

router.get("/:employeeName", async (req: Request, res: Response) => {
    const employeeName = req.params.employeeName;
    try {
        const services = await getAllServicesFromDB(employeeName);
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(500).send(
            "Failed to retrieve Employees services from database",
        );
    }
});

export default router;
