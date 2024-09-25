import { ServiceRequests } from "@/components/ServiceRequests";
import medicinestore from "/src/images/medicinestore.jpg";
import { medForm } from "./exampleForms";

export default function DrugDelivery(employee: string | undefined) {

    const defaultFormSchema = {
        patientName: "",
        drugName: "",
        drugQuantity: "",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
        patientCondition: "Fever", // Translating the patient condition
        createdBy: "",
    };

    // Label is necessary, ids are calculated assuming that there is a title

    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(8);
    return (
        <div>
            {ServiceRequests(
                medForm,
                defaultFormSchema,
                "/api/medicine",
                medicinestore,
                "Tri and Brendan"
            )}
        </div>
    );
}

