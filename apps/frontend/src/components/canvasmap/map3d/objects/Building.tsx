import { MeshStandardMaterial, Color, Vector3, Mesh } from "three";
import { useGLTF } from "@react-three/drei";
import "./Background.css";

const levelConfig = {
    0: { file: "/floormapL2.glb", scale: 0.4 },
    1: { file: "/floormapL1.glb", scale: 0.4 },
    2: { file: "/floormapL1.glb", scale: 0.4 },
    3: { file: "/floormap2.glb", scale: 0.4 },
    4: { file: "/floormap3.glb", scale: 0.4 },
};

const Building: React.FC<{ position: Vector3; level: number }> = ({
    position,
    level,
}) => {
    const config = levelConfig[level] || {};
    const { nodes } = useGLTF(config.file || "/floormapL1.glb");
    const floormap = nodes.CustomObject as Mesh;

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x2b5685),
    });

    switch (level) {
        case 0:
        case 1:
        case 3:
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
        case 4:
            return (
                <>
                    <mesh
                        castShadow={true}
                        receiveShadow={true}
                        geometry={floormap.geometry}
                        material={customMaterial}
                        position={[position.x - 49.99, 0.1, position.z + 34]}
                        scale={0.4}
                    />
                </>
            );
        case 2:
            return <></>;
        default:
            return <></>;
    }
};

export default Building;
