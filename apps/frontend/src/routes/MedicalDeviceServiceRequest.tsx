import { ServiceRequests } from "@/components/ServiceRequests";
import MedicalDevice from "/src/images/MedicalDevice.png";
import { medicalForm } from "./exampleForms";

export default function MedicalDeviceService(employee: string | undefined) {

    const defaultFormSchema = {
        location: "",
        selectedDevice: "",
        withBalloons: "false",
        status: "",
        priority: "",
        employeeName: "",
        createdBy: "",
    };

    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(8);

    return ServiceRequests(
        medicalForm,
        defaultFormSchema,
        "/api/medical-device",
        MedicalDevice,
        "Brandon Yeu",
    );
}
