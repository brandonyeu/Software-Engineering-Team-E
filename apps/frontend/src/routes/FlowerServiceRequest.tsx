import { ServiceRequests } from "@/components/ServiceRequests";
import Lilacs from "/src/images/Lilacs.png";
import { flowerForm } from "./exampleForms";

const defaultFormSchema = {
    patientName: "",
    flowerType: "",
    senderName: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    cardMessage: "",
    createdBy: "",
};

// Label is necessary, ids are calculated assuming that there is a title

export default function FlowerService (employee: string | undefined) {

        if(employee == undefined){
            return;
        }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(8);
    return ServiceRequests(
        flowerForm,
        defaultFormSchema,
        "/api/flower",
        Lilacs,
        "Marc, Colin, and Brendan"
    );
};

