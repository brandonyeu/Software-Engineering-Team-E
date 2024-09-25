import client from "../bin/database-connection";
import express, { Request, Response } from "express";
import { EmployeeType } from "common/src/types";

const router = express.Router();

// Function to get an employee by name
async function getEmployeeByName(name: string): Promise<EmployeeType | null> {
    return client.employee.findFirst({
        where: { name },
    });
}

// Function to add or update an employee based on the presence of an employee record
async function addOrUpdateEmployee(
    employeeData: EmployeeType,
): Promise<string> {
    const existingEmployee = await getEmployeeByName(employeeData.name);
    if (existingEmployee) {
        // Update the existing employee's phone number if it's not set
        if (employeeData.phone_number && !existingEmployee.phone_number) {
            await client.employee.update({
                where: { name: existingEmployee.name },
                data: {
                    phone_number: employeeData.phone_number,
                    displayName: employeeData.displayname,
                },
            });
            return "Phone number updated in database";
        }
        return "Employee already exists and has a phone number";
    } else {
        // Create a new employee if not found
        await client.employee.create({
            data: employeeData,
        });
        return "Employee added to database";
    }
}

// Route to add or update an employee
router.post("/", async (req: Request, res: Response) => {
    console.log("Received data:", req.body);
    const employeeReq: EmployeeType = req.body;
    try {
        const message = await addOrUpdateEmployee(employeeReq);
        res.send(message);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to add or update employee in database");
    }
});

// Route to get all employees
router.get("/", async (req: Request, res: Response) => {
    try {
        const employees = await client.employee.findMany();
        res.json(employees);
    } catch (e) {
        console.error(e);
        res.status(500).send("Failed to retrieve employees");
    }
});

// Route to get a specific employee by name
router.get("/:name", async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const employee = await getEmployeeByName(name);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).send("Employee not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//route for checking employee by user admin privileges
router.get("/:name/boolean", async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const employee = await getEmployeeByName(name);
        if (employee) {
            const booleanValue = employee.admin;
            res.json({ name, booleanValue });
        } else {
            res.status(404).send("Employee not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/:name/boolean/toggle", async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const employee = await getEmployeeByName(name);
        if (employee) {
            const updatedAdminValue = !employee.admin;
            await client.employee.update({
                where: { name: name },
                data: { admin: updatedAdminValue },
            });
            res.json({ name, admin: updatedAdminValue });
        } else {
            res.status(404).send("Employee not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
