import {ServiceRequests} from "@/components/ServiceRequests.tsx";
import doctor from "/src/images/doctor.jpg";

const defaultSymptomsSchema = {
    patientName: "",
    symptom1: "",
    symptom2: "",
    symptom3: "",
    symptom4: "",
    priority: "",
    status: "",
};

const SymptomsForm = [
    {
        content: "label",
        title: "Symptoms Submission Form",
        type: "header",
        id: 0,
    },
    {
        content: "text",
        type: "string",
        title: "Patient Name",
        placeholder: "First, Last",
        required: true,
        id: 0,
    },
    {
        content: "radio",
        type: "string",
        title: "Symptom 1",
        placeholder: "Please Select Symptoms (1)",
        required: true,
        id: 0,
        label: "Symptom1",
        options: ["Fever" , "Cold Sores", "Insomnia", "Body Sores"],
    },
    {
        content: "radio",
        type: "string",
        title: "Symptom 2",
        placeholder: "Please Select Symptoms (2)",
        required: false,
        id: 0,
        label: "Symptom2",
        options: ["None", "Fever" , "Cold Sores", "Insomnia", "Body Sores"],
    },
    {
        content: "radio",
        type: "string",
        title: "Symptom 3",
        placeholder: "Please Select Symptoms (3)",
        required: false,
        id: 0,
        label: "Symptom3",
        options: ["None", "Fever" , "Cold Sores", "Insomnia", "Body Sores"],
    },
    {
        content: "radio",
        type: "string",
        title: "Symptom 4",
        placeholder: "Please Select Symptoms (4)",
        required: false,
        id: 0,
        label: "Symptom4",
        options: ["None", "Fever" , "Cold Sores", "Insomnia", "Body Sores"],
    },
    {
        content: "radio",
        type: "string",
        title: "Priority",
        placeholder: "Priority",
        required: true,
        id: 0,
        label: "Request Priority",
        options: ["Low", "Medium", "High", "Emergency"],
    },
    {
        content: "radio",
        type: "string",
        title: "Status",
        placeholder: "Status",
        required: true,
        id: 0,
        label: "Request Status",
        options: ["Unassigned", "Assigned", "In Progress", "Closed"],
    },
];

export default function SymptomsService(){
    return ServiceRequests(
        SymptomsForm,
        defaultSymptomsSchema,
        "/api/symptoms",
        doctor,
        "Tri"
    );
}

