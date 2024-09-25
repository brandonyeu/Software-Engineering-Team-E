import { ServiceRequests } from "@/components/ServiceRequests";

const defaultFormSchema = {
    employeeName: "",
    employeeID: "0",
    alertAuthorities: "false",
    location: "",
    reqPriority: "",
    reqStatus: "",
    requestType: "",
};

//Label is necessary, ids are calculated assuming that there is a title

const defaultForm = [
    {
        content: "label",
        title: "Security Request",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Employee Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "text",
        type: "number",
        title: "Employee ID",
        placeholder: "Enter Employee ID",
        required: true,
        id: 0,
    },
    {
        content: "checkbox",
        type: "string",
        title: "Authorities",
        placeholder: "Alert Authorities?",
        required: false,
        id: 0,
    },
    {
        content: "popover",
        type: "string",
        title: "Select Location",
        placeholder: "Select Placeholder 2",
        required: true,
        id: 0,
        label: "",
        options: [],
    },
    {
        content: "radio",
        type: "string",
        title: "Priority",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Priority",
        options: ["Low", "Medium", "High", "Emergency"],
    },
    {
        content: "radio",
        type: "string",
        title: "Status",
        placeholder: "",
        required: true,
        id: 0,
        label: "Request Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed"],
    },
    {
        content: "select",
        type: "string",
        title: "Type",
        placeholder: "Request Type",
        required: true,
        id: 0,
        label: "Options",
        options: ["Patient Threat", "Staff Threat"],
    },
];
export default function GiftServiceRequest() {
    return ServiceRequests(defaultForm, defaultFormSchema, "/api/security", "");
}
