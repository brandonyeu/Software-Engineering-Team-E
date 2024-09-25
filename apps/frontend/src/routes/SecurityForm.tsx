import { ServiceRequests } from "@/components/ServiceRequests";
import security from "/src/images/security.avif";
import { secForm } from "./exampleForms";

export default function SecurityForm(employee: string | undefined) {

    const defaultFormSchema = {
        requestType: "",
        employeeName: "",
        location: "",
        status: "",
        priority: "",
        alertAuthorities: "false",
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
                secForm,
                defaultFormSchema,
                "/api/security",
                security,
                "Lorenzo and Kai"
            )}
        </div>
    );
}
