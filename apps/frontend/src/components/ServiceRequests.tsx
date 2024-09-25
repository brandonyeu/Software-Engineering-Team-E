"use client";
import * as React from "react";
import { FormEvent, useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Confetti from "react-confetti";
import axios from "axios";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DBNode } from "common/src/types";
import { Employee } from "common/src/types";
import {
    MedicalDeviceServiceRequest,
    GiftServiceRequest,
    FlowerServiceRequest,
    InterpreterServiceRequest,
    DrugDeliveryData,
    RoomSchedulingForm,
    SanitationServiceRequest,
    SecurityServiceRequest,
} from "common/src/types";

//import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//} from "@/components/ui/form";

type FormSchemas =
    | MedicalDeviceServiceRequest
    | GiftServiceRequest
    | FlowerServiceRequest
    | InterpreterServiceRequest
    | DrugDeliveryData
    | RoomSchedulingForm
    | SanitationServiceRequest
    | SecurityServiceRequest;

export type FormLabel = {
    content: string; //Element content - (input, select, switch, button, ect)
    title: string; //Element title
    type: string; //Element type - (string, number, etc)
    required: boolean; //Required? field
    id: number;
    width: string;
};

export type FormComponent = FormLabel & {
    placeholder: string; //Displayed placeholder text
    variant: string;
};

export type FormSelect = FormComponent & {
    label: string; // Options label
    options: string[]; //Displayed options
};

// layout: an array of objects of type component, how to define the objects is shown above
// blankSchema: whatever type/interface you assign to the output of your form, just pass a blank version
/*              for instance, for a FlowerServiceRequest form using the interface FlowerServiceRequest:
 *
 * interface FlowerServiceRequest {
 *   patientName: string;
 *   roomNumber: string;
 *   senderName: string;
 *   cardMessage: string;
 *   flowerType: string;
 * }
 *
 * You would simply pass an object with blank values:
 *
 * const defaultSchema {
 *   patientName: "",
 *   roomNumber: "",
 *   senderName: "",
 *   cardMessage: "",
 *   flowerType: "",
 * }
 * */

export const ServiceRequests = (
    layout: (FormLabel | FormComponent | FormSelect)[],
    blankSchema: FormSchemas,
    apiPath: string,
    bgPath: string,
    devNames: string,
) => {
    const [nodes, setNodes] = useState<DBNode[]>([]);
    const [filteredNodes, setFilteredNodes] = useState(nodes);
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const [employees, setEmployee] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    useEffect(() => {
        async function fetchNodes() {
            try {
                const response = await axios.get("/api/nodes");
                const originalNodes = response.data;
                const returnNodes = originalNodes
                    .filter((node) => {
                        return node.nodeType != "HALL";
                    })
                    .sort(function (a, b) {
                        if (a.longName < b.longName) {
                            return -1;
                        }
                        if (a.longName > b.longName) {
                            return 1;
                        }
                        return 0;
                    });
                setNodes(returnNodes);
            } catch (error) {
                console.error("Failed to fetch nodes: ", error);
            }
        }
        fetchNodes();
    }, []);
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await axios.get("/api/employee");
                setEmployee(response.data);
            } catch (error) {
                console.error("Failed to fetch Employees: ", error);
            }
        }
        fetchEmployees();
    }, []);
    useEffect(() => {
        setFilteredNodes(
            nodes.filter((node) =>
                node.longName.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        );
    }, [searchTerm, nodes]);
    useEffect(() => {
        setFilteredEmployees(
            employees.filter((employee) =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        );
    }, [searchTerm, employees]);

    const [formSchema, setFormSchema] = useState(structuredClone(blankSchema));
    const schemaKeys = [] as string[];

    Object.keys(formSchema).map((value) => {
        schemaKeys.push(value);
    });

    async function sendForm(formData: FormSchemas, apiPath: string) {
        axios.post(apiPath, formData).then((res) => {
            console.log(res);
        });
    }

    // Form Generation
    const makeForm = (props: (FormLabel | FormComponent | FormSelect)[]) => {
        return (
            <>
                <div className="grid gap-x-4 gap-y-6 grid-flow-dense grid-cols-2 auto-rows-auto">
                    {props.map(identifyComponent)}
                </div>
            </>
        );
    };
    // Identify element to return based on value of Component.content
    const identifyComponent = (
        props: FormLabel | FormComponent | FormSelect,
    ) => {
        if (props.content.includes("text")) {
            return inputComp(props as FormComponent);
        } else if (props.content.includes("select")) {
            return selectComp(props as FormSelect);
        } else if (props.content.includes("label")) {
            return labelComp(props as FormLabel);
        } else if (props.content.includes("radio")) {
            return radioGroupComp(props as FormSelect);
        } else if (props.content.includes("checkbox")) {
            return checkboxComp(props as FormComponent);
        } else if (props.content.includes("location")) {
            return LocationComp(props as FormComponent);
        } else if (props.content.includes("employee")) {
            return EmployeeComp(props as FormComponent);
        } else {
            console.error("Failed to identify element - " + props.type);
        }
    };

    //Beginning of Elements

    const labelComp = (props: FormLabel) => {
        console.log("making label '" + props.title + "' id: " + props.id);
        return (
            <>
                <div
                    className={
                        "col-span-full text-extrabold basis-full text-center text-3xl"
                    }
                >
                    <Label>{props.title}</Label>
                </div>
            </>
        );
    };

    const inputComp = (props: FormComponent) => {
        console.log("making input '" + props.title + "' id: " + props.id);
        console.log(props);
        return (
            <>
                <div className={props.width}>
                    <label
                        className={
                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                        }
                    >
                        {props.title}
                    </label>
                    <FormInput
                        type={props.type}
                        placeholder={props.placeholder}
                        onChange={(e) =>
                            (formSchema[schemaKeys[props.id]] =
                                e.target.value.toString())
                        }
                        className={
                            "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0 dark:hover:bg-primary-element dark:bg-secondary-element"
                        }
                    />
                </div>
            </>
        );
    };
    const selectComp = (props: FormSelect) => {
        console.log("making select '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className={props.width}>
                    <label className="block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1">
                        {props.title}
                    </label>
                    <Select
                        onValueChange={(value) =>
                            (formSchema[schemaKeys[props.id]] =
                                value.toString())
                        }
                    >
                        <SelectTrigger className="flex max-w-full min-w-fit shadow-md hover:ring-2 ring-accent text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-primary-element dark:bg-secondary-element dark:ring-accent transition-all">
                            <SelectValue 
                            className={"dark:bg-background"} 
                            placeholder={props.placeholder}/>
                        </SelectTrigger>
                        <SelectContent className={"dark:bg-secondary-element"}>
                            <SelectGroup>
                                <SelectLabel>{props.label}</SelectLabel>
                                {/* Map options to select */}
                                {props.options.map((option) => (
                                    <SelectItem
                                        value={option.toString()}
                                        className={
                                            "text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-tertiary-element"
                                        }
                                    >
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </>
        );
    };

    const radioGroupComp = (props: FormSelect) => {
        console.log("making radio '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className={props.width}>
                    <label
                        className={
                            "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                        }
                    >
                        {props.title}
                    </label>
                    <div
                        className={
                            "p-2 w-full bg-background dark:bg-secondary-element border-input border shadow-md rounded"
                        }
                    >
                        <RadioGroup
                            onChange={(e) =>
                                (formSchema[schemaKeys[props.id]] =
                                    e.target.value.toString())
                            }
                        >
                            {/* Map options to select */}
                            <div className="flex grid grid-flow-dense grid-cols-auto grid-rows-auto px-4 dark:bg-secondary-element">
                                {props.options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex cols-span-1"
                                    >
                                        <RadioGroupItem
                                            className={"hover:bg-accent"}
                                            value={option}
                                        />
                                        <Label className="ml-2 text-sm font-medium text-gray-700 dark:text-foreground flex-nowrap">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </>
        );
    };

    const checkboxComp = (props: FormComponent) => {
        console.log("making checkbox '" + props.title + "' id: " + props.id);
        return (
            <>
                <div className={props.width}>
                    <div className={"flex flex-row size-full"}>
                        <Checkbox
                            onChange={(e) =>
                                (formSchema[schemaKeys[props.id]] =
                                    e.target.value.toString())
                            }
                            className={"hover:bg-accent my-auto self-center size-4 ml-6 mr-5"}
                        />
                        <Label className="text-sm font-medium text-gray-700 dark:text-foreground size-fit self-center">
                            {props.title}
                        </Label>
                    </div>
                </div>
            </>
        );
    };

    const LocationComp = (props: FormComponent) => {
        console.log(
            "making Popover(Location) '" + props.title + "' id: " + props.id,
        );

        const handleLocationSelect = (longName: string) => {
            setFormSchema({ ...formSchema, [schemaKeys[props.id]]: longName });
            setSearchTerm("");
        };

        return (
            <div className={props.width}>
                <label
                    className={
                        "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                    }
                >
                    {props.title}
                </label>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="flex h-10 w-full rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0 text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-primary-element dark:bg-secondary-element">
                            {formSchema[schemaKeys[props.id]] ||
                                "Select Location"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="origin-top-right absolute max-h-60 overflow-y-auto rounded-md shadow-lg dark:bg-secondary-element">
                        <Input
                            ref={searchRef}
                            className="w-full mb-2"
                            placeholder="Search location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredNodes.map((node) => (
                            <div
                                key={node.nodeID}
                                className="p-2 hover:bg-accent hover-text cursor-pointer rounded-md hover:text-accent-foreground dark:hover:bg-tertiary-element"
                                onClick={() =>
                                    handleLocationSelect(node.longName)
                                }
                            >
                                {node.longName}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    const EmployeeComp = (props: FormComponent) => {
        console.log(
            "making Popover(Employee) '" + props.title + "' id: " + props.id,
        );
        const handleLocationSelect = (name: string) => {
            setFormSchema({ ...formSchema, [schemaKeys[props.id]]: name });
            setSearchTerm("");
        };

        // console.log(employees);

        return (
            <div className={props.width}>
                <label
                    className={
                        "block text-sm text-bold font-medium text-gray-700 dark:text-foreground m-1"
                    }
                >
                    {props.title}
                </label>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="flex h-10 w-full rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0 text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-primary-element dark:bg-secondary-element">
                            {formSchema[schemaKeys[props.id]] ||
                                "Select Employee"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="origin-top-right absolute max-h-60 overflow-y-auto rounded-md shadow-lg dark:bg-secondary-element">
                        <Input
                            ref={searchRef}
                            className="w-full mb-2"
                            placeholder="Assign Employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredEmployees.map((employee) => (
                            <div
                                key={employee.id}
                                className="p-2 hover:bg-accent hover-text cursor-pointer rounded-md hover:text-accent-foreground dark:hover:bg-tertiary-element"
                                onClick={() =>
                                    handleLocationSelect(employee.name)
                                }
                            >
                                {employee.name}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    //End of Elements

    const submittedServiceData = [] as (typeof blankSchema)[];
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Assign id to each element specified in layout based on order in the form,
    // determines where form values are sent on submit
    layout.map((field) => (field.id = layout.indexOf(field) - 1));

    // console.log(layout);

    const handleSubmit = (e: FormEvent) => {
        // Prevent reload on submit
        e.preventDefault();

        for (const layoutElement of layout) {
            if (
                layoutElement.required &&
                formSchema[schemaKeys[layoutElement.id]] === ""
            ) {
                alert("Please Fill Out All Required Fields");
                return;
            }
        }

        // Add current submission to array of submissions
        submittedServiceData.push(formSchema);
        sendForm(formSchema, apiPath);

        // Push submission to console
        // Push all submissions for current session to console
        // console.log(submittedServiceData);
        // Not really necessary but clear formValues for next submit
        handleClearForm(e);
        setIsSubmitted(true);
    };

    const handleClearForm = (e: FormEvent) => {
        e.preventDefault();
        setFormSchema(structuredClone(blankSchema));
        // Reset the form fields
        const formElement = e.currentTarget.closest("form");
        if (formElement) {
            formElement.reset();
        }
        setIsSubmitted(false);
    };
    if (bgPath === "") {
        if (layout.length < 1) {
            return (
                <>
                    <div className="flex transition-all">
                        <div className="w-full">
                            <div className="block dark:bg-primary-element bg-secondary rounded-lg">
                                <form className="px-16 py-8">
                                    {makeForm([
                                        {
                                            content: "label",
                                            title: "Form Is Blank",
                                            type: "header",
                                            required: false,
                                            id: 0,
                                        },
                                    ])}
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <>
                <div className="flex transition-all">
                    <div className="w-full rounded-lg">
                        <div className="bg-secondary rounded-lg dark:bg-primary-element">
                            <form className="px-16 py-8">
                                {makeForm(layout)}
                                <div
                                    className={
                                        "pt-16 grid grid-col grid-cols-3 "
                                    }
                                >
                                    <button
                                        className="bg-accent hover:bg-destructive text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                        type="reset"
                                        onClick={handleClearForm}
                                    >
                                        Clear Form
                                    </button>
                                    <div></div>
                                    <button
                                        className="bg-blue-900 hover:bg-accent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                        onClick={handleClearForm}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <section
                className="fixed blur-[5px] top-0 bg-white bg-cover content-center size-full"
                style={{
                    backgroundImage: `url(${[bgPath]})`,
                }}
            />

            {isSubmitted && <Confetti />}
            <div className="flex justify-center container shrink-0 w-full h-dvh py-8">
                <div className="m-auto relative w-2/3 min-w-[35rem]">
                    <div className="block shadow-lg bg-background dark:bg-primary-element rounded-lg border-4 border-background">
                        <form className="px-16 py-8" onSubmit={handleSubmit}>
                            {makeForm(layout)}
                            <div className={"pt-16 grid grid-col grid-cols-3 "}>
                                <button
                                    className="bg-accent hover:bg-destructive text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                    type="reset"
                                    onClick={handleClearForm}
                                >
                                    Clear Form
                                </button>
                                <div></div>
                                <button
                                    className="bg-blue-900 hover:bg-accent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div>
                            <p>Developed by: {devNames}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
