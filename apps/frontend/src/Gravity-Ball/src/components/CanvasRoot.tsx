import { Canvas } from "@react-three/fiber";
import { GameplayComponents } from "./GameplayComponents";
import { cameraShiftX, cameraShiftY, cameraShiftZ } from "./constants";

export const CanvasRoot = () => {
    return (
        <Canvas
            camera={{
                position: [cameraShiftX, cameraShiftY, cameraShiftZ],
            }}
        >
            <ambientLight intensity={1} />
            <GameplayComponents />
        </Canvas>
    );
};
