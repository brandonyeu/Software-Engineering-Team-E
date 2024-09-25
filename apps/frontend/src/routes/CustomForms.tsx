import * as React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    ServiceRequests,
} from "@/components/ServiceRequests";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    flowerForm,
    giftForm,
    medForm,
    medicalForm,
    sanitationForm,
    roomForm,
    secForm,
    langForm,
 } from "./exampleForms";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/formInput";
import { 
    Plus, 
    Minus, 
    X, 
    ALargeSmall,
    SquareCheck,
    Circle,
    UserRoundSearch,
    MapPinned,
    TextCursorInput,
    ListChecks,
    MoreHorizontal,
    FileInput,
 } from "lucide-react";

export default function FormMaker() {
    const [customForm, setCustomForm] = useState([]);
    const [currComponent, setCurrComponent] = useState("");
    const [currEdit, setCurrEdit] = useState(-2);

    const AddField = (props, edit) => {
        const [newObject, setNewObject] = useState({});
        if (
            edit &&
            props != undefined &&
            newObject["id"] !== props["id"]
        ) {
            setNewObject(props);
        } else if (!edit && newObject["content"] !== props["content"]) {
            setNewObject(props);
        }
        if (edit) {
            props = newObject;
        }

        const [options, setOptions] = useState([]);
        const [option, setOption] = useState("");
        const [id, setID] = useState("");

        // console.log(newObject);
        // console.log(customForm);
        // console.log(edit.toString());
        const handleOption = (type: string, field) => {
            if (field === "type") {
                return (
                    <Select
                        onValueChange={(value) =>
                            setNewObject({
                                ...newObject,
                                [field]: value,
                            })
                        }
                    >
                        <SelectTrigger className="flex max-w-full min-w-fit hover:bg-secondary shadow-md hover:ring-2 ring-accent text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-inherit dark:bg-primary-element">
                            <SelectValue placeholder={"Select Type"} />
                        </SelectTrigger>
                        <SelectContent className={"dark:bg-primary-element"}>
                            <SelectGroup>
                                <SelectLabel className={"bg-card dark:bg-secondary-element rounded-sm"}>
                                    {"Select Type"}
                                </SelectLabel>
                                <SelectItem
                                    value={"string"}
                                    className={
                                        "text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-tertiary-element"
                                    }
                                >
                                    {"String"}
                                </SelectItem>
                                <SelectItem
                                    value={"number"}
                                    className={
                                        "text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-tertiary-element"
                                    }
                                >
                                    {"Number"}
                                </SelectItem>
                                <SelectItem
                                    value={"time"}
                                    className={
                                        "text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-tertiary-element"
                                    }
                                >
                                    {"Time"}
                                </SelectItem>
                                <SelectItem
                                    value={"datetime-local"}
                                    className={
                                        "text-sm text-bold font-medium text-gray-700 dark:text-foreground dark:hover:bg-tertiary-element"
                                    }
                                >
                                    {"Time-Date"}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                );
            }else if(field === "width"){
                return (
                    <>
                    <div
                        className={
                            "p-2 w-full bg-background border-input border shadow-md rounded pt-3 dark:bg-primary-element"
                        }
                    >
                    <RadioGroup
                            onValueChange={(value) =>
                                (setNewObject({
                                    ...newObject,
                                    [field]: value,
                                }))
                            }
                        >
                            <div className="flex grid grid-flow-dense grid-cols-auto grid-rows-auto px-4">
                                    <div
                                        className="flex cols-span-1"
                                    >
                                        <RadioGroupItem
                                            className={"hover:bg-accent"}
                                            value={"col-span-1"}
                                        />
                                        <Label className="ml-2 text-sm font-medium text-gray-700 dark:text-foreground flex-nowrap">
                                            {"Single"}
                                        </Label>
                                    </div>
                                    <div
                                        className="flex cols-span-1"
                                    >
                                        <RadioGroupItem
                                            className={"hover:bg-accent"}
                                            value={"col-span-2"}
                                        />
                                        <Label className="ml-2 text-sm font-medium text-gray-700 dark:text-foreground flex-nowrap">
                                            {"Double"}
                                        </Label>
                                    </div>
                                </div>
                        </RadioGroup>
                    </div>
                    </>
                );
            }

            if (type === "string") {
                return (
                    <FormInput
                        placeholder={props[field]}
                        className={
                            "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent dark:hover:bg-inherit ring-0 dark:bg-primary-element"
                        }
                        onChange={(e) => {
                            setNewObject(
                                {
                                    ...newObject,
                                    [field]: e.target.value,
                                },
                                //console.log(newObject);
                            );
                        }}
                    />
                );
            } else if (type === "boolean") {
                return (
                    <Checkbox
                        onCheckedChange={(checked) => {
                            setNewObject(
                                {
                                    ...newObject,
                                    [field]: checked,
                                },
                                //console.log(newObject);
                            );
                        }}
                        className={"hover:bg-accent my-auto ml-5 mt-2"}
                    />
                );
            } else if (type === "number") {
                return (
                    <FormInput
                        placeholder={"Input Number"}
                        type={"number"}
                        className={
                            "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0 dark:bg-primary-element"
                        }
                        onChange={(e) => {
                            setNewObject({
                                ...newObject,
                                [field]: e.target.value,
                            });
                        }}
                    />
                );
            } else if (type === "object") {
                if(edit && id !== props["id"] && newObject !== undefined){
                    console.log("changing id from " + id + " to " + props["id"]);
                    setOptions([]);
                    setID(props["id"]);
                }else if(edit && (options.length === 0 && newObject[field] !== undefined)){
                    setOptions(newObject[field]);
                }else if(newObject[field] !== options){
                    setNewObject({
                        ...newObject,
                        [field]: options
                    });
                }
                return (
                    <div className={"bg-card rounded-lg transition-all"}>
                    <div className={"flex flex-row flex-nowrap mb-1"}>
                        <FormInput
                            placeholder={"Input Options"}
                            type={"string"}
                            className={
                                "w-full shadow-md hover:ring-2 hover:bg-secondary hover:ring-accent ring-0 dark:bg-primary-element dark:hover:bg-inherit"
                            }
                            onChange={(e) => {
                                // console.log(option);
                                setOption(e.target.value);
                            }}
                        />
                        <Button
                            className={
                                "size-8 p-0 m-1 bg-green-400 hover:bg-green-500 shadow-none hover:shadow-md self-center shrink-0"
                            }
                            onClick={() => {
                                setOptions([...options, option]);
                                setNewObject({
                                    ...newObject,
                                    [field]: options,
                                });
                            }}
                            disabled={option === ""}
                        >
                            <Plus className={"transition-all"} />
                        </Button>
                    </div>
                    <div className={"mx-2 overflow-y-auto h-fit max-h-32"}>
                        {options.map((op) => {
                            return(
                                <div className={"flex flex-row flex-nowrap bg-background dark:bg-tertiary-element rounded-lg content-center p-[1px] mb-[2px]"}>
                                    <Button
                                        className={
                                            "size-5 p-0 mx-2 bg-red-400 shadow-none hover:shadow-md hover:bg-red-500 self-center rounded-full"
                                        }
                                        onClick={() => {
                                            setOptions(options.slice(0, options.indexOf(op)).concat(options.slice(options.indexOf(op) + 1)),);
                                            setNewObject({
                                                ...newObject,
                                                [field]: options
                                            });
                                            // console.log(options);
                                            // console.log(options.slice(0, options.indexOf(op)).concat(options.slice(options.indexOf(op) + 1)),);
                                            // console.log(options.indexOf(op));
                                        }}
                                    >
                                        <X className={"transition-all"} />
                                    </Button>
                                    {op}
                                </div>
                            );
                        })}
                    </div>
                </div>
                );
            }
            // console.log("TYPE ==" + type);
            return;
        };

        if (props === "") {
            return;
        } else {
            if (newObject["content"] === undefined && !edit) {
                // console.log(newObject);
                // console.log(customForm);
                // console.log(edit.toString());
                setNewObject(
                    {
                        ...newObject,
                        content: props["content"],
                    },
                    //console.log(newObject);
                );
            }
            if (edit && currEdit > -2) {
                return (
                    <>
                        <div
                            className={
                                "size-full px-5 pb-5 bg-popover rounded-xl flex flex-col capitalize dark:bg-card "
                            }
                        >
                            {Object.keys(props).map((field) => {
                                // console.log(field);
                                if (newObject[field] === undefined) {
                                    setNewObject(
                                        {
                                            ...newObject,
                                            [field]: props[field],
                                        },
                                        //console.log(newObject);
                                    );
                                }
                                if (
                                    field === "display" ||
                                    field === "content" ||
                                    field === "id"
                                ) {
                                    return;
                                }
                                return (
                                    <div className={""}>
                                        <Label
                                            className={
                                                "block text-sm text-bold font-medium text-gray-700 dark:text-foreground mt-2"
                                            }
                                        >
                                            {field}
                                        </Label>
                                        {handleOption(
                                            typeof props[field],
                                            field,
                                        )}
                                    </div>
                                );
                            })}
                            <div className={"flex flex-row flex-nowrap"}>
                                <Button
                                    className={
                                        "mx-auto size-fit ml-0 p-1 mt-5 bg-red-400 hover:bg-red-500 self-start shadow-none hover:shadow-md"
                                    }
                                    onClick={() => {
                                        //console.log(newObject);
                                        if (edit) {
                                            setCustomForm([
                                                ...customForm.slice(
                                                    0,
                                                    newObject["id"] + 1,
                                                ),
                                                ...customForm.slice(
                                                    newObject["id"] + 2,
                                                ),
                                            ]);
                                            setNewObject({});
                                            setCurrEdit(-2);
                                            return;
                                        }
                                        setCustomForm([
                                            ...customForm,
                                            newObject,
                                        ]);
                                        //console.log(customForm);
                                    }}
                                >
                                    Remove
                                    <Minus className={"transition-all"} />
                                </Button>
                                <Button
                                    className={
                                        "mx-auto size-fit mr-0 p-1 mt-5 bg-yellow-400 hover:bg-yellow-500 self-end shadow-none hover:shadow-md"
                                    }
                                    onClick={() => {
                                        //console.log(newObject);
                                        if (edit) {
                                            setCustomForm([
                                                ...customForm.slice(
                                                    0,
                                                    newObject["id"] + 1,
                                                ),
                                                newObject,
                                                ...customForm.slice(
                                                    newObject["id"] + 2,
                                                ),
                                            ]);
                                            setNewObject({});
                                            setCurrEdit(-2);
                                            return;
                                        }
                                        setCustomForm([
                                            ...customForm,
                                            newObject,
                                        ]);
                                        //console.log(customForm);
                                    }}
                                >
                                    Modify
                                    <Plus className={"transition-all"} />
                                </Button>
                            </div>
                        </div>
                    </>
                );
            } else if (!edit || currEdit["id"] !== undefined) {
                return (
                    <>
                        <div
                            className={
                                "size-full px-5 pb-5 bg-popover dark:bg-card rounded-xl flex flex-col capitalize"
                            }
                        >
                            {Object.keys(props).map((field) => {
                                //console.log(field);
                                if (newObject[field] === undefined) {
                                    setNewObject(
                                        {
                                            ...newObject,
                                            [field]: props[field],
                                        },
                                        //console.log(newObject);
                                    );
                                }
                                if (
                                    field === "display" ||
                                    field === "content" ||
                                    field === "id"
                                ) {
                                    return;
                                }
                                return (
                                    <div className={""}>
                                        <Label
                                            className={
                                                "block text-sm text-bold font-medium text-gray-700 dark:text-foreground mt-2"
                                            }
                                        >
                                            {field}
                                        </Label>
                                        {handleOption(
                                            typeof props[field],
                                            field,
                                        )}
                                    </div>
                                );
                            })}
                            <div className={"flex flex-row flex-nowrap"}>
                            <Button
                                className={
                                    "bg-transparent p-3 bottom-0 pt-9"
                                }
                                onClick={() => {
                                    setCurrComponent("");
                                }}
                            >
                                <X className={"transition-all text-foreground size-auto"} />
                            </Button>
                            <Button
                                className={
                                    "mx-auto size-fit mr-0 p-1 mt-5 bg-green-400 hover:bg-green-500 self-end shadow-none hover:shadow-md"
                                }
                                onClick={() => {
                                    setCustomForm([...customForm, newObject]);
                                    setCurrComponent("");
                                    setOptions([]);
                                }}
                            >
                                Add
                                <Plus className={"transition-all p-[2px]"} />
                            </Button>
                            </div>
                        </div>
                    </>
                );
            }
        }
    };

    const importedForms = {
        None : {
            display : "None",
            form : [],
        },
        Flower :
        {
            display : "Flower Form",
            form : flowerForm,
        },
        Gift : 
        {
            display : "Gift Form",
            form : giftForm,
        },
        Med : 
        {
            display : "Medicine Form",
            form : medForm,
        },
        Medical : 
        {
            display : "Medical Devices",
            form : medicalForm,
        },
        Sanitation : 
        {
            display : "Sanitation Form",
            form : sanitationForm,
        },
        Room : 
        {
            display : "Room Request Form",
            form : roomForm,
        },
        Security : 
        {
            display : "Security Form",
            form : secForm,
        },
        Language : 
        {
            display : "Language Form",
            form : langForm,
        },
    };

    const components = {
        label: {
            display: "Form Label",
            content: "label",
            title: "",
        },
        textField: {
            display: "Text Field",
            width: "col-span-1",
            content: "text",
            type: "",
            title: "",
            placeholder: "",
            required: false,
            id: 0,
        },
        checkBox: {
            display: "Checkbox",
            width: "col-span-1",
            content: "checkbox",
            title: "",
            required: false,
            id: 0,
        },
        select: {
            display: "Select",
            width: "col-span-1",
            content: "select",
            title: "",
            placeholder: "",
            id: 0,
            label: "",
            required: false,
            options: [],
        },
        radioButtons: {
            display: "Radio Select",
            width: "col-span-1",
            content: "radio",
            title: "",
            id: 0,
            required: false,
            options: [],
        },
        locationSelector: {
            display: "Location ",
            width: "col-span-1",
            content: "location",
            title: "",
            id: 0,
            required: false,
        },
        employeeSelector: {
            display: "Employee ",
            width: "col-span-1",
            content: "employee",
            title: "",
            id: 0,
            required: false,
        },
    };

    const icons = (index) => {
        if(index === 0){return(<ALargeSmall className={"size-fit transition-all"}/>);}
        if(index === 1){return(<TextCursorInput className={"size-fit transition-all"}/>);}
        if(index === 2){return(<ListChecks className={"size-fit transition-all"}/>);}
        if(index === 3){return(<SquareCheck className={"size-fit transition-all"}/>);}
        if(index === 4){return(<Circle className={"size-fit transition-all"}/>);}
        if(index === 5){return(<MapPinned className={"size-fit transition-all"}/>);}
        if(index === 6){return(<UserRoundSearch className={"size-fit transition-all"}/>);}
    };

    //console.log(currEdit);

    return (
        <>
            <div
                className={
                    "bg-card flex items-center w-full mx-auto rounded-lg min-h-screen grid grid-cols-3 dark:bg-primary-element"
                }
            >
                <div className={"relative pt-20 pr-4 pl-14 col-span flex flex-col self-start w-full h-screen relative overflow-auto"}>
                    <div className={"bg-card w-full rounded-lg"}>
                        <div className={"flex flex-col space-y-10 place-content-evenly pb-20 dark:bg-primary-element"}>
                            <Popover>
                                <PopoverTrigger>
                                    <Button className="flex h-11 w-56 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring shadow-none hover:shadow-md text-sm font-bold text-gray-700 hover:text-foreground bg-accent hover:bg-inherit border-2 border-notcolor hover:border-accent transition-all">
                                        {"Use Existing Template"}
                                        <FileInput className={"size-5 mr-0 ml-auto"}/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-60 w-48 overflow-y-auto rounded-md dark:bg-secondary-element">
                                    {Object.keys(importedForms).map(
                                        (option, index) => {
                                            return(
                                                <div
                                                    key={index}
                                                    className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize text-nowrap dark:hover:text-background"
                                                    onClick={() => {
                                                        //console.log(importedForms[option]["form"]);
                                                        setCustomForm(importedForms[option]["form"]);
                                                        setCurrComponent("");
                                                        setCurrEdit(-2);
                                                        //console.log(customForm);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            );
                                        }
                                    )}
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger>
                                    <Button className="flex h-11 min-w-56 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring shadow-none hover:shadow-md text-sm font-bold text-gray-700 hover:text-foreground bg-accent hover:bg-inherit border-2 border-notcolor hover:border-accent transition-all">
                                        {currComponent["display"] ||
                                            "Select Element to Add"}
                                            <Plus className={"size-5 mr-0 ml-auto"}/> 
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-60 w-48 overflow-y-auto rounded-md dark:bg-secondary-element">
                                    {Object.keys(components).map(
                                        (option, index) => (
                                            <div
                                                key={index}
                                                className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize w-full dark:hover:text-background"
                                                onClick={() => {
                                                    //console.log(option);
                                                    setCurrComponent(
                                                        components[option],
                                                    );
                                                }}
                                            >
                                                <div className={"text-nowrap flex flex-row flex-nowrap w-full items-stretch columns-2"}>
                                                    <div className={"w-full self-end"}>{components[option]["display"]}</div>
                                                    <div className={"w-fit self-end"}>{icons(index)}</div>
                                                 </div>
                                            </div>
                                        ),
                                    )}
                                </PopoverContent>
                            </Popover>
                            <div className={"transition-all w-full min-w-48"}>
                                {AddField(currComponent, false)}
                            </div>
                            <Popover>
                                <PopoverTrigger
                                    disabled={customForm.length < 1}>
                                    <Button
                                        className="flex h-11 w-56 rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring shadow-none hover:shadow-md text-sm font-bold text-gray-700 hover:text-foreground bg-accent hover:bg-inherit border-2 border-notcolor hover:border-accent transition-all disabled:bg-primary"
                                        disabled={customForm.length < 1}
                                    >
                                        {"Select Element to Alter" ||
                                            "ID " +
                                                currEdit["id"] +
                                                " : " +
                                                currEdit["content"]}
                                        <MoreHorizontal className={"size-5 mr-0 ml-auto"}/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="origin-top-left max-h-60 w-48 overflow-y-auto rounded-md dark:bg-secondary-element">
                                    {customForm.map((option, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="p-2 hover:bg-accent cursor-pointer rounded-md hover-text hover:text-accent-foreground capitalize text-nowrap dark:hover:text-background"
                                                onClick={() => {
                                                    // console.log(
                                                    //     customForm[index],
                                                    // );
                                                    setCurrEdit(index);
                                                }}
                                            >
                                                <div
                                                    className={
                                                        "font-bold capitalize flex flex-row flex-nowrap"
                                                    }
                                                >
                                                    {"ID "}
                                                    {option.id}
                                                    {": "}
                                                    <div className={"text-none"}>
                                                        {option.content}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </PopoverContent>
                            </Popover>
                            <div className={"transition-all w-full min-w-48"}>
                                {AddField(customForm[currEdit], true)}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        "bg-background w-full h-screen col-span-2 px-16 overflow-auto overflow-y-scroll"
                    }
                >
                    <div
                        className={
                            "bg-background py-4 relative h-fit font-bold text-center w-fit text-2xl mx-auto rounded-lg"
                        }
                    >
                        Form Preview
                    </div>
                    <div className={"mx-auto mb-6 dark:bg-primary-element rounded-lg"}>
                        {ServiceRequests(customForm, {}, "", "", "")}
                    </div>
                </div>
            </div>
        </>
    );
}