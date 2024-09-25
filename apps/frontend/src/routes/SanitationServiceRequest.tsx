import { ServiceRequests } from "@/components/ServiceRequests";
import cleaning from "/src/images/cleaning.jpg";
import { sanitationForm } from "./exampleForms";

export default function SanitationService(employee: string | undefined) {

    const defaultFormSchema = {
        patientName: "",
        serviceType: "",
        additionalInfo: "",
        location: "",
        status: "",
        priority: "",
        employeeName: "",
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
                sanitationForm,
                defaultFormSchema,
                "/api/sanitation",
                cleaning,
                "Yan"
            )}
        </div>
    );
}
