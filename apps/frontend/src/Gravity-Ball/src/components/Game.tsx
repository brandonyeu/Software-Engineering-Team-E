import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";
import { KeyboardControlsRoot } from "./KeyboardControls";
import { UI } from "./UI";
import { HUD } from "./HUD";
import { DisablePageScroll } from "./DisablePageScroll";
import { JoystickControlsRoot } from "./JoystickControls";
import { useState } from "react";

const CanvasRootLazy = dynamic(() =>
    import("./CanvasRoot").then((mod) => mod.CanvasRoot),
);

export const Game = () => {
    const [score, setScore] = useState(0);
    return (
        <RecoilRoot>
            <DisablePageScroll />
            <div className="h-screen">
                <JoystickControlsRoot>
                    <UI score={score} setScore={setScore} />
                    <HUD />
                    <KeyboardControlsRoot>
                        <CanvasRootLazy />
                    </KeyboardControlsRoot>
                </JoystickControlsRoot>
            </div>
        </RecoilRoot>
    );
};
