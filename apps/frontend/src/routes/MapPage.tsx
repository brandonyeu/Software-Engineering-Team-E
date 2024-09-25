import CanvasMap from "@/components/canvasmap/map/CanvasMap.tsx";
import LevelButtons from "@/components/canvasmap/map/LevelButtons.tsx";
import SearchBar from "@/components/canvasmap/map/MapUI.tsx";
import axios from "axios";
import { DBNode } from "common/src/types";
import Legend from "@/components/canvasmap/map/Legend";
import { useEffect, useState } from "react";
import TextDirection, {
    TextDirectionComponent,
} from "@/components/TextDirection.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useLanguage } from "@/components/LanguageProvider";
//import MapPage3d from "@/routes/MapPage3d.tsx";
import {Box} from "lucide-react";
// import NodeDisplay from "@/components/canvasmap/NodeDisplay.tsx";
//import { Node } from "common/src/types";

export default function MapPage({ nodes }: { nodes: DBNode[] }) {
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [algorithm, setAlgorithm] = useState<string>("ASTAR");
    const [pathNodes, setPathNodes] = useState<DBNode[]>([]);
    const [level, setLevel] = useState<number>(1);
    const [prompt, setPrompt] = useState<string[]>([""]);
    const [turn, setTurn] = useState<string[]>([""]);
    const [floor, setFloor] = useState<string[]>([""]);
    const language = useLanguage();
    const handleRandomize = () => {
        const nonHallNodes = nodes.filter((node) => {
            return node.nodeType != "HALL";
        });
    
        if (nonHallNodes.length === 0) {
            console.error("No non-hall nodes available");
            return;
        }
    
        const randomStart =
            nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
        const randomEnd =
            nonHallNodes[Math.floor(Math.random() * nonHallNodes.length)].nodeID;
        const algorithms = ["ASTAR", "DIJKSTRA", "BFS", "DFS"];
        const randomAlgo =
            algorithms[Math.floor(Math.random() * algorithms.length)];
        console.log(randomAlgo);
        setStart(randomStart);
        setEnd(randomEnd);
        setAlgorithm(randomAlgo);
    };

    useEffect(() => {
        async function fetchPathData() {
            try {
                let res;
                if (!algorithm) {
                    res = await axios.get(
                        `/api/path/${start}/${end}/${"ASTAR"}`,
                    );
                } else {
                    res = await axios.get(
                        `/api/path/${start}/${end}/${algorithm}`,
                    );
                }

                setPathNodes(res.data);
                const { prompts, turns, floors } = TextDirection(res.data, `${language}`);
                setPrompt(prompts);
                setTurn(turns);
                setFloor(floors);
            } catch (error) {
                setPathNodes([]);
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [start, end, algorithm, language]);

    return (
        <>
            <div className="fixed z-50 bottom-[6.5rem] pl-2 transition-all">
                <Button variant="outline" size="icon" onClick={() => { window.location.href = "/map3d"; }}>
                    <Box/>
                </Button>
            </div>
        <div className="flex flex-col absolute h-screen space-y-4 left-0">
            <div className="flex z-10 ml-20 mt-5">
                <SearchBar
                    selection={nodes}
                    start={[start, setStart]}
                    end={[end, setEnd]}
                    algorithm={[algorithm, setAlgorithm]}
                />
            </div>

            <div className="flex z-10 ml-20">
                <Button 
                    className={"dark:hover:bg-background dark:bg-accent dark:hover:text-foreground dark:text-background dark:hover:ring-2 dark:ring-accent"}
                    onClick={handleRandomize}>
                    I'm Feeling Lucky
                </Button>
            </div>

            <div className="absolute top-0 left-0 z-10 ml-2.5 mt-20 pt-10">
                <LevelButtons levelProps={[level, setLevel]}/>
            </div>

            <div className="z-10 ml-20 mt-5 max-w-72 overflow-auto">
                <TextDirectionComponent prompts={prompt} turns={turn} floors={floor}/>
            </div>
        </div>

        <div className="flex flex-col absolute h-screen space-y-4 right-0">
            <div className="z-10 mt-14 mr-2.5">
                <Legend/>
            </div>

        </div>

        <div style={{height: "100vh", overflow: "hidden"}}>
            <CanvasMap
                level={level}
                path={pathNodes}
                nodes={nodes}
                setLevel={setLevel}
                start={setStart}
                end={setEnd}
            />
        </div>
        </>
    );
}
