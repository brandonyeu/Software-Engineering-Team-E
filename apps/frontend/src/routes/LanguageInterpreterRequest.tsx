import { ServiceRequests } from "@/components/ServiceRequests";
import translation from "/src/images/translation.jpg";
import { langForm } from "./exampleForms";

export default function InterpreterService(employee: string | undefined) {

    const defaultFormSchema = {
        clientName: "",
        language: "",
        location: "",
        employeeName: "",
        duration: "",
        additionalInfo: "",
        status: "",
        priority: "",
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
                langForm,
                defaultFormSchema,
                "/api/interpreter",
                translation,
                "Tao"
            )}
        </div>
    );
}

