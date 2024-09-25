import { MeshStandardMaterial, Color, Vector3, Mesh } from "three";
import { useGLTF } from "@react-three/drei";
import "./Background.css";

const levelConfig = {
    0: { file: "/bordersL2.glb", scale: 0.4 },
    1: { file: "/bordersL1.glb", scale: 0.4 },
    2: { file: "/bordersL1.glb", scale: 0.4 },
    3: { file: "/borders2.glb", scale: 0.4 },
    4: { file: "/borders3.glb", scale: 0.4 },
};

const Stairs: React.FC<{ position: Vector3; level: number }> = ({
    position,
    level,
}) => {
    const config = levelConfig[level] || {};
    const { nodes } = useGLTF(config.file || "/bordersL1.glb");
    const floormap = nodes.CustomObject as Mesh;

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x334d7e),
    });

    switch (level) {
        case 0:
        case 1:
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
        case 2:
            return <></>;
        default:
            return <></>;
    }
};

export default Stairs;
