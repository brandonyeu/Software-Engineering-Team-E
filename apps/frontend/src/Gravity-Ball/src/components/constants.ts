// for development
export const isDev = import.meta.env.DEV;
export const isPhysicsDebug =
    isDev && import.meta.env.DEV_PHYSICS_DEBUG === "1";

// camera position relative to the player
export const cameraShiftX = 0;
export const cameraShiftY = 4;
export const cameraShiftZ = 9;

export const material = "default";
