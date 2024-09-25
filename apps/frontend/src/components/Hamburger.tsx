"use client";
import * as React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import bwhLogo from "../images/BWH logo.svg";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
    ChevronRight,
    Map,
    HandHelping,
    Database,
    Sticker,
    FileText,
 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translate, useLanguage } from "@/components/LanguageProvider.tsx";

export default function Hamburger() {
    const { isAuthenticated } = useAuth0();
    const { language } = useLanguage();

    return (
        <Sheet>
            <SheetTrigger className="fixed top-0 z-50 pl-2 pt-2 flex transition-all">
                <Button variant={"outline"} size={"icon"}>
                    <Menu className={"transition-all"} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="dark:bg-background">
                <div className="grid gap-2 py-2">
                    <SheetClose asChild>
                        <Link
                            to="/"
                            className="rounded hover:bg-accent dark:hover:bg-accent inline-block"
                        >
                            <div className={"mx-auto size-fit"}>
                                <img
                                    src={bwhLogo}
                                    alt="BWH logo"
                                    style={{ height: "70px" }}
                                />
                            </div>
                            
                        </Link>
                    </SheetClose>
                    {isAuthenticated && (
                        <Collapsible className="grid gap-4">
                            <CollapsibleTrigger className="flex rounded-sm p-2 px-4 hover:bg-accent w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 dark:hover:text-background">
                                <div className={"w-full flex flex-row"}>
                                {translate("services", language)}{" "}
                                <HandHelping className={"mx-auto mr-4"}/>
                                </div>
                                <ChevronRight className="ml-auto w-4 h-4 transition-all" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="grid gap-3 bg-gray-150 px-3">
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="services"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "allservices",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="flower-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Flowertitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="gift-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Gifttitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="drug-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Medicinetitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="security"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Securitytitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="language-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Interprettitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="sanitation"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Sanitationtitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="room-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Roomtitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="medical-device-service"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Devicetitle",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                    <div className={""} />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                    <Collapsible className="grid gap-4">
                        <CollapsibleTrigger className="flex rounded-sm p-2 px-4 hover:bg-accent w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 dark:hover:text-background">
                            <div className={"w-full flex flex-row"}>
                            {translate("Map", language)}{" "}
                            <Map className={"mx-auto mr-4"}/>
                            </div>
                            <ChevronRight className="self-center self-end w-4 h-4 transition-all size-full" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid gap-3 bg-gray-150 px-3">
                                <SheetClose asChild>
                                    <Link
                                        className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                        to="map"
                                    >
                                        <div className="text-sm font-medium leading-none group-hover:underline">
                                            {translate("Map", language)}
                                        </div>
                                    </Link>
                                </SheetClose>
                                {isAuthenticated && (
                                    <SheetClose asChild>
                                        <Link
                                            className="group grid h-auto w-full rounded-sm p-1 px-2 hover:bg-accent justify-start gap-1 dark:hover:text-background"
                                            to="map-editor"
                                        >
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {translate(
                                                    "Mapeditor",
                                                    language,
                                                )}
                                            </div>
                                        </Link>
                                    </SheetClose>
                                )}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    {isAuthenticated && (
                        <SheetClose asChild>
                            <Link
                                className="group rounded-sm p-2 px-4 hover:bg-accend h-auto w-full justify-start gap-1 hover:bg-accent dark:hover:text-background"
                                to="data"
                            >
                                <div className={"w-full flex flex-row text-lg font-semibold"}>
                                {translate("dataviewer", language)}
                                <Database className={"mx-auto mr-4 self-end"}/>
                                <ChevronRight className="self-end w-4 h-4 transition-all opacity-0" />
                                </div>
                                
                                
                            </Link>
                        </SheetClose>
                    )}
                    <SheetClose asChild>
                        <Link
                            className="group rounded-sm p-2 px-4 hover:bg-accent h-auto w-full justify-start gap-1 hover:bg-accent dark:hover:text-background"
                            to="about-us"
                        >
                                <div className={"w-full flex flex-row text-lg font-semibold"}>
                                {translate("aboutus", language)}{" "}
                                <Sticker className={"mx-auto mr-4 self-end"}/>
                                <ChevronRight className="self-end w-4 h-4 transition-all opacity-0" />
                                </div>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            className="group rounded-sm p-2 px-4 hover:bg-accent h-auto w-full justify-start gap-1 dark:hover:text-background"
                            to="credit-page"
                        >
                                <div className={"w-full flex flex-row text-lg font-semibold"}>
                                {translate("Credit", language)}{" "}
                                <FileText className={"mx-auto mr-4 self-end transition-all"}/>
                                <ChevronRight className="self-end w-4 h-4 transition-all opacity-0" />
                                </div>
                        </Link>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
