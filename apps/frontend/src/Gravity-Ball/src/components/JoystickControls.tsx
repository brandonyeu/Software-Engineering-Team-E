import { createContext, useRef } from "react";

interface JoystickInput {
    x: number | null;
    y: number | null;
}

const defaultValue = {
    x: null,
    y: null,
};

export const JoystickContext =
    createContext<React.MutableRefObject<JoystickInput>>();

interface JoystickControlsRootProps {
    children: React.ReactNode;
}

export const JoystickControlsRoot = ({
    children,
}: JoystickControlsRootProps) => {
    const joystickInputRef = useRef<JoystickInput>(defaultValue);
    return (
        <JoystickContext.Provider value={joystickInputRef}>
            {children}
        </JoystickContext.Provider>
    );
};
