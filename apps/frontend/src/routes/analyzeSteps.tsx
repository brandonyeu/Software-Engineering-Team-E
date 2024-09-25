export const analyzeNextSteps = (step: number, userResponse: string) => {
    if (step === 0) {
        return {
            purpose: "specify name",
            message: `Nice to meet you, ${userResponse}! What services do you need in the hospital today?`,
            options: ["Medicine", "Health Checkup"],
        };
    } else if (step === 1) {
        if (userResponse === "Medicine") {
            return {
                purpose: "specify medicine",
                message: "What symptoms are you experiencing? We will supply a quick diagnosis for your needs",
                options: ["Fever", "Body Sores", "Insomnia"],
            };
        } else {
            return {
                purpose: "specify health checkup",
                message: "Which specific area do you need to check up on?",
                options: ["General Checkup", "MRI"]
            };
        }
    }else if (step === 2){
        if(userResponse === "Fever"){
            return{
                purpose: "medicine fever",
                message: "You should order Advil or Tylenol for fevers.",
            };
        }
        if(userResponse === "Body Sores"){
            return{
                purpose: "medicine body sores",
                message: "You should order Advil or Tylenol for body sores. Tylenol is better in this case.",
            };
        }
        if(userResponse === "Insomnia"){
            return{
                purpose: "medicine insomnia",
                message: "You should order Melatonin for insomnia.",
            };
        }
        if(userResponse === "General Checkup"){
            return{
                purpose: "general checkup",
                message: "You should go to the map and search for [Location].",
            };
        }
        if(userResponse === "MRI"){
            return{
                purpose: "mri checkup",
                message: "You should order Melatonin for [Location].",
            };
        }
    } else {
        return {
            purpose: "bye",
            message: "Bye!",
        };
    }
};
