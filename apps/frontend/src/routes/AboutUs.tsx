import {CardContent, CardDescription, CardTitle, PortraitCard} from "@/components/ui/card.tsx";
import React, {useState} from 'react';
import kai from "/src/images/kai.png";
import aksel from "/src/images/aksel.png";
import yan from "/src/images/yan.png";
import tri from "/src/images/tri.png";
import brandon from "/src/images/brandon.png";
import tao from "/src/images/tao.png";
import lorenzo from "/src/images/lorenzo.png";
import devin from "/src/images/devin.png";
import brendan from "/src/images/brendan.png";
import christian from "/src/images/christian.png";
import marc from "/src/images/marc.png";
import colin from "/src/images/colin.png";
import funny from "/src/sounds/metal-pipe-falling-sound-effect-made-with-Voicemod.mp3";
import fortnite from "/src/sounds/fortnite-dance-moves-emote-music-tv9iv8cxmo0-1.mp3";
import logo from "/src/images/Emerald_Ewok_Logo.png";

import {translate, useLanguage} from "@/components/LanguageProvider.tsx";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
    const { language } = useLanguage();
    const[selectedMember, setSelectedMember] = useState<string | null>(null);

    // Array of objects representing each team member
    const teamMembers = [
        {
            name: translate("Yan Acevedo", language),
            role: translate("Project Manager", language),
            major: translate("Robotics", language),
            class: "2025",
            quote: "La vida es un carnaval. - Celia Cruz",
            image: yan,
            audio: funny,
        },
        {
            name: translate("Kai Davidson", language),
            role: translate("Lead Developer", language),
            major: translate("ComputerBioinformatics", language),
            class: "2026",
            quote: "Only one man ever understood me, and even he didn’t understand me. - Georg Wilhelm Hegel",
            image: kai,
            audio: funny,
        },
        {
            name: translate("Aksel Jensen", language),
            role: translate("Assistant Lead Developer", language),
            major: translate("ComputerBioinformatics", language),
            class: "2026",
            quote: "How fleeting are all human passions when compared with the massive continuity of ducks. - Dorothy L. Sayers",
            image: aksel,
            audio: funny,
        },
        {
            name: translate("Tri Vien Le", language),
            role: translate("Scrum Master", language),
            major: translate("Computer", language),
            class: "2025",
            quote: "On my momma, I did not rebase the repo.",
            image: tri,
            audio: funny,
        },
        {
            name: translate("Lorenzo Manfredi Segato", language),
            role: translate("Assistant Lead Software Engineer", language),
            major: translate("ComputerRobotics", language),
            class: "2025",
            quote: "The fire of extravagance can never burn simplicity",
            image: lorenzo,
            audio: funny,
        },
        {
            name: translate("Devin Mihaichuk", language),
            role: translate("Algorithms", language),
            major: translate("Computer", language),
            class: "2026",
            quote: "I want to be the best like no one ever was, I guess.",
            image: devin,
            audio: funny,
        },
        {
            name: translate("Brendan Reilly", language),
            role: translate("Backend Database Engineer", language),
            major: translate("Computer", language),
            class: "2026",
            quote: "To do anything to a high level, it has to be total obsession - Conor McGregor",
            image: brendan,
            audio: funny,
        },
        {
            name: translate("Christian Reynolds", language),
            role: translate("Algorithms", language),
            major: translate("Computer", language),
            class: "2026",
            quote: "You miss 100% of the shots you don't take - Wayne Gretzky",
            image: christian,
            audio: fortnite,
        },
        {
            name: translate("Marc Wehbe", language),
            role: translate("Frontend", language),
            major: translate("Electrical", language),
            class: "2025",
            quote: "At the end of the day, it's the end of the day",
            image: marc,
            audio: funny,
        },
        {
            name: translate("Colin Williams", language),
            role: translate("Frontend", language),
            major: translate("Computer", language),
            class: "2026",
            quote: "Ooohh... I like that",
            image: colin,
            audio: funny,
        },
        {
            name: translate("Brandon Yeu", language),
            role: translate("Product Owner", language),
            major: translate("Data Science", language),
            class: "2026",
            quote: "Do the best you can until you know better. Then when you know better, do better. — Maya Angelou",
            image: brandon,
            audio: funny,
        },
        {
            name: translate("Tao Zou", language),
            role: translate("Documentation Analyst", language),
            major: translate("Robotics", language),
            class: "2024",
            quote: "宽以律己 严以待人",
            image: tao,
            audio: funny,
        },
    ];

    const toggleQuote = (member: typeof teamMembers[number]) => {
        setSelectedMember(member.quote === selectedMember ? null : member.quote);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center pt-10 text-4xl font-bold">
                {translate("aboutus", language)}
                <div className="p-10">
                    <Button className="text-3xl bg-accent" onClick={() => {window.location.href = "/meettheteam";}}>Meet The Team!</Button>
                </div>
                <img className="rounded-lg" src={logo} alt="logo" width="250" height="auto"/>
            </div>
            <div className="flex items-center text-center justify-center pt-5">    
                {translate("aboutusdes1", language)} <br/>
                {translate("aboutusdes2", language)}<br/> {translate("aboutusdes3", language)}
            </div>
            <div className="grid gap-x-3 gap-y-3 grid-cols-3 auto-rows-auto pt-10 p-10" style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                {teamMembers.map((member, index) => (
                    <div key={index} style={{flex: '0 0 calc(33.33% - 2rem)'}}>
                        <PortraitCard className="bg-secondary dark:bg-primary-element shadow-md hover:cursor-pointer hover:outline" onClick={() => toggleQuote(member)}>
                            <CardContent style={{height: selectedMember === member.quote ? 'auto' : '475px' }}>
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <img className="rounded-md" src={member.image} alt={member.name}/>
                                        <div className="mt-3">
                                            <CardTitle>{member.name}</CardTitle>
                                            <CardDescription className="mt-1">{member.role}</CardDescription>
                                            <CardDescription>{member.major} Major</CardDescription>
                                            <CardDescription>Class of {member.class}</CardDescription>
                                        </div>
                                    </div>
                                    {selectedMember === member.quote && (
                                        <div className="p-4 italic">
                                            <CardDescription className="text-center">Quote: {member.quote}</CardDescription>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </PortraitCard>
                    </div>
                ))}
            </div>
            {/* Thank you message */}            
            <div className="p-10 flex text-center items-center justify-center font-bold">
                {translate("aboutusthank1", language)}<br/> {translate("aboutusthank2", language)}
            </div>
        </div>
    );
}
