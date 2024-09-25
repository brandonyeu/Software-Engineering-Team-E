import { ServiceRequests } from "@/components/ServiceRequests";
import gifts from "/src/images/gifts.jpg";
import { giftForm } from "./exampleForms";

const defaultFormSchema = {
    recipientName: "",
    giftSize: "",
    message: "",
    location: "",
    status: "",
    priority: "",
    employeeName: "",
    wrapping: "festive",
    createdBy: "",
};

export default function GiftServiceRequest(employee: string | undefined) {
    
    if(employee == undefined){
        return;
    }
    defaultFormSchema.createdBy = JSON.stringify(employee).replace(/\s+/g, '').replace(/[^\w.@]+/g, '').substring(8);
    return ServiceRequests(
        giftForm,
        defaultFormSchema,
        "/api/gift",
        gifts,
        "Devin and Marc",
    );
}
