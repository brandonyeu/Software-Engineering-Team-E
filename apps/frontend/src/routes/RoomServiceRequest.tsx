import { ServiceRequests } from "@/components/ServiceRequests";
import scheduling from "/src/images/scheduling.jpg";
import { roomForm } from "./exampleForms";

export default function RoomScheduling(employee: string | undefined) {

    const defaultFormSchema = {
        employeeName: "",
        serviceType: "",
        location: "",
        startTime: "",
        endTime: "",
        status: "",
        priority: "",
        createdBy: "",
    };

    // Label is necessary, ids are calculated assuming that there is a title

    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(8);
  
    return ServiceRequests(
        roomForm,
        defaultFormSchema,
        "/api/room",
        scheduling,
        "Aksel and Christian"
    );
}
