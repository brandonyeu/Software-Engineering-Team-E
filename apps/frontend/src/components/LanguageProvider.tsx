import { createContext, useContext, useEffect, useState } from "react";
import translations from "@/assets/translationData.json";

type Language = "en" | "ch"; // Define your language options here

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

type LanguageProviderProps = {
    children: React.ReactNode;
    defaultLanguage?: Language;
    storageKey?: string;
};

type LanguageProviderState = {
    language: Language;
    setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
    language: "en", // Set the default language here
    setLanguage: () => null,
};

const LanguageProviderContext = createContext(initialState);

// Translation function

export function translate(key: string, language: string): string {
    const translationsData = translations as Translations;
    console.log("Translations data:", translationsData);
    console.log("Language:", language);

    const languageData = translationsData[language];
    console.log("Language data:", languageData);

    const translatedText = languageData && languageData[key];
    console.log("Translated text:", translatedText);

    return translatedText !== undefined ? translatedText : key;
}

export function LanguageProvider({
    children,
    defaultLanguage = "en",
    storageKey = "language",
    ...props
}: LanguageProviderProps) {
    const [language, setLanguage] = useState(
        () => (localStorage.getItem(storageKey) as Language) || defaultLanguage,
    );

    useEffect(() => {
        console.log("Current language:", language);
        localStorage.setItem(storageKey, language);
    }, [language, storageKey]);

    const value = {
        language,
        setLanguage,
    };

    return (
        <LanguageProviderContext.Provider value={value} {...props}>
            {children}
        </LanguageProviderContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageProviderContext);

    if (context === undefined)
        throw new Error("useLanguage must be used within a LanguageProvider");

    return context;
}
