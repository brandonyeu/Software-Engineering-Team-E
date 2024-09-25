import Diagnosis from "@/routes/Diagnosis.tsx";
import { analyzeNextSteps } from "@/routes/analyzeSteps.tsx";
import React, { useState } from "react";

interface ResponseBotObject {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
}

const DiagnosisBot: React.FC = () => {
    const [userResponse, setUserResponse] = useState<string>("");
    const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({
        purpose: "",
        message: "",
        sender: "bot",
    });

    const [sendUserResponse, setSendUserResponse] = useState<string>("");

    const setNextStep = (response: string) => {
        setStep((prevState) => prevState + 1);
        setSendUserResponse(response);
        const res = analyzeNextSteps(step, response);
        setBotResponse({ ...res, sender: "bot" });
        setUserResponse("");
    };
    const optionClick = (e: React.MouseEvent<HTMLElement>) => {
        const option = e.currentTarget.dataset.id;
        if (option) {
            setNextStep(option);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNextStep(userResponse);
    };

    return (
        <div>
            <Diagnosis
                userResponse={userResponse}
                botResponse={botResponse}
                sendUserResponse={sendUserResponse}
                optionClick={optionClick}
            />
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => handleInputChange(e)}
                    value={userResponse}
                ></input>
                <button className="bg-blue-900 hover:bg-accent text-white font-semibold hover:text-blue-900 py-2.5 px-4 border hover:border-blue-900 rounded">
                    <i>Send</i>
                </button>
            </form>
        </div>
    );
};

export default DiagnosisBot;
