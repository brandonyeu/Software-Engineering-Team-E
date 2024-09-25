import { MeshStandardMaterial, Color, Vector3, Mesh } from "three";
import { useGLTF } from "@react-three/drei";
import "./Background.css";

const levelConfig = {
    0: { file: "/roomoutlinesL2.glb", scale: 0.4 },
    1: { file: "/roomoutlinesL1.glb", scale: 0.4 },
    2: { file: "/roomoutlines1.glb", scale: 0.4 },
    3: { file: "/roomoutlines2.glb", scale: 0.4 },
    4: { file: "/roomoutlines3.glb", scale: 0.4 },
};

const RoomOutlines: React.FC<{ position: Vector3; level: number }> = ({
    position,
    level,
}) => {
    const config = levelConfig[level] || {};
    const { nodes } = useGLTF(config.file || "/roomoutlinesL1.glb");
    const floormap = nodes.CustomObject as Mesh;

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x8aa2c8),
    });

    switch (level) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            return (
                <>
                    <mesh
                        castShadow={true}
                        receiveShadow={true}
                        geometry={floormap.geometry}
                        material={customMaterial}
                        position={[position.x - 49.99, 0, position.z + 34]}
                        scale={0.4}
                    />
                </>
            );
        default:
            return <></>;
    }
};

export default RoomOutlines;
