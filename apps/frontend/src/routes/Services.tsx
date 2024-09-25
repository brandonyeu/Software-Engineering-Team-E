import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import Flowers from "/src/images/flowers.jpeg";
import Security from "/src/images/security.jpeg";
import Medication from "/src/images/medication.jpeg";
import Gift from "/src/images/gift.png";
import Language from "/src/images/Language.webp";
import Sanitation from "/src/images/Sanitation.png";
import Scheduling from "/src/images/scheduling.jpg";
import Device from "/src/images/MedicalDevice.png";
import {translate, useLanguage} from "@/components/LanguageProvider.tsx";

export default function Services() {
    const { language } = useLanguage();
    return (
        <div className={"px-0"}>
            <div className={"px-16 py-8 rounded-xl"}>
                <h1 className="text-3xl font-bold"><p>{translate("services", language)}</p></h1>
                <h2 className="text-xl pb-4">
                    <p>{translate("chooseservice", language)}</p>
                </h2>
                <div className="grid lg:grid-cols-4 gap-5">
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 1*/}
                        <CardHeader>
                            <CardTitle><h1><p>{translate("Flowertitle", language)}</p></h1></CardTitle>
                            <CardDescription>
                                <p>{translate("Flowerdes", language)}</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Flowers}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/flower-service"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Order", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 2*/}
                        <CardHeader>
                            <CardTitle>{translate("Securitytitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("Securitydes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Security}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/security"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Request", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 3*/}
                        <CardHeader>
                            <CardTitle>{translate("Medicinetitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("Medicinedes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Medication}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/drug-service"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Order", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 4*/}
                        <CardHeader>
                            <CardTitle>{translate("Gifttitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("GiftDes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Gift}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/gift-service"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Order", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {" "}
                        {/*card 5*/}
                        <CardHeader>
                            <CardTitle>{translate("Interprettitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("Interpretdes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Language}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/language-service"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Request", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 6*/}
                        <CardHeader>
                            <CardTitle>{translate("Sanitationtitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("Sanitationdes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Sanitation}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/sanitation"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Request", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 7*/}
                        <CardHeader>
                            <CardTitle>{translate("Roomtitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("Roomdes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Scheduling}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/room-service"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Take me there", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="bg-secondary shadow-md hover:shadow-lg dark:bg-primary-element dark:border-none">
                        {/*card 8*/}
                        <CardHeader>
                            <CardTitle>{translate("Devicetitle", language)}</CardTitle>
                            <CardDescription>
                                {translate("Devicedes", language)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={Device}
                                className={"rounded-sm aspect-[16/9]"}
                            ></img>
                        </CardContent>
                        <CardFooter className="flex justify-end items-center">
                            <Link
                                to="/medical-device-service"
                                className="inline-block bg-accent font-semibold text-foreground hover:text-background text-md py-2 px-4 rounded hover:bg-primary align-middle mt-1 ml-4 dark:bg-accent dark:hover:bg-inherit dark:ring-0 dark:hover:ring-1 dark:ring-accent dark:text-background dark:hover:text-foreground transition-all"
                            >
                                {translate("Request", language)}
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
