import React from "react";
import WebstormLogo from "/src/images/webstorm-logo.png";
import DockerLogo from "/src/images/docker-logo.png";
import NodejsLogo from "/src/images/nodejs-logo.png";
import PostgreSQLLogo from "/src/images/postgresql-logo.png";
import SlackLogo from "/src/images/slack-log.png";
import PrismaLogo from "/src/images/prisma-logo.svg";
import FigmaLogo from "/src/images/figma-logo.png";
import TaigaLogo from "/src/images/taiga-logo.png";
import DrawioLogo from "/src/images/drawio-logo.png";
import LucideLogo from "/src/images/lucide-logo.png";
import RadixLogo from "/src/images/radix-logo.png";
import ShadCNLogo from "/src/images/shadcn.jpg";
import Background from "/src/images/background.png";
import {translate, useLanguage} from "@/components/LanguageProvider.tsx";


import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CreditPage: React.FC = () => {
    const { language } = useLanguage();
    const softwareList = [
        {
            name: "Webstorm",
            logo: WebstormLogo,
            version: "2023.3.4",
            link: "https://www.jetbrains.com/webstorm/",
        },
        {
            name: "Docker",
            logo: DockerLogo,
            version: "4.28.0",
            link: "https://www.docker.com/",
        },
        {
            name: "Node.js",
            logo: NodejsLogo,
            version: "v20.11.0",
            link: "https://nodejs.org/",
        },
        {
            name: "PostgreSQL",
            logo: PostgreSQLLogo,
            version: "16.2",
            link: "https://www.postgresql.org/",
        },
        {
            name: "Slack",
            logo: SlackLogo,
            version: "4.37.98",
            link: "https://slack.com/",
        },
        {
            name: "Prisma ORM",
            logo: PrismaLogo,
            link: "https://www.prisma.io/",
        },
        { name: "Figma", logo: FigmaLogo, link: "https://www.figma.com/" },
        { name: "Taiga", logo: TaigaLogo, link: "https://www.taiga.io/" },
        {
            name: "Draw.io",
            logo: DrawioLogo,
            link: "https://www.diagrams.net/",
        },
        { name: "Lucide", logo: LucideLogo, link: "https://lucide.dev/" },
        {
            name: "Radix-UI",
            logo: RadixLogo,
            link: "https://www.radix-ui.com/",
        },
        {
            name: "ShadCN",
            logo: ShadCNLogo,
            link: "https://ui.shadcn.com",
        },
    ];

    return (
        <div
            style={{
                ...styles.container,
                backgroundImage: `url(${Background})`,
            }}
        >
            <div style={styles.content}>
                <h1 style={styles.heading}>{translate("Credit", language)}</h1>
                <p style={styles.text}>
                    {translate("Creditdes", language)}
                </p>
                <div style={styles.cardContainer}>
                    {softwareList.map((software, index) => (
                        <Card
                            key={index}
                            style={styles.card}
                            className="hover:scale-105 ease hover:shadow-accent hover:delay-50 rounded p-4 shadow-lg transition-all duration-700"
                        >
                            <CardHeader>
                                <img
                                    src={software.logo}
                                    alt={`${software.name} Logo`}
                                    style={styles.logo}
                                />
                                <CardTitle>
                                    {software.name}{" "}
                                    {software.version &&
                                        `(${software.version})`}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Add any additional content for the card here */}
                            </CardContent>
                            <CardFooter
                                className="flex justify-center items-center"
                                style={styles.cardFooter}
                            >
                                <a
                                    href={software.link}
                                    className="inline-block bg-accent text-foreground text-md py-2 px-12 rounded hover:bg-primary"
                                    style={styles.link}
                                >
                                    LearnMore
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <p style={styles.thanks}>
                    {translate("Creditthank", language)}
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        margin: "auto",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    content: {
        maxWidth: "800px",
        padding: "20px",
        margin: "0 auto",
    },
    heading: {
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    text: {
        fontSize: "18px",
        marginBottom: "20px",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(300px, 1fr))", // Display three cards per row
        gap: "20px",
        justifyContent: "center", // Center the cards horizontally
    },
    card: {
        width: "250px", // Make the cards wider
        height: "370px", // Make the cards taller
        position: "relative",
    },
    logo: {
        width: "150px", // Make the logos bigger
        alignSelf: "center",
        margin: "0 auto",
    },
    link: {
        textDecoration: "none",
        color: "#fff",
        borderRadius: "4px",
        transition: "background-color 0.3s ease",
    },
    thanks: {
        fontSize: "16px",
        marginTop: "40px",
    },
    cardFooter: {
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
    },
};

export default CreditPage;
