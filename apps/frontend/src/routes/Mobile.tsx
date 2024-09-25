import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MobileMap from '@/components/canvasmap/mobilemap/MobileMap';
import DBNode from 'common/src/types';
import LevelButtons from '@/components/canvasmap/map/LevelButtons';
import TextDirection, { TextDirectionComponent } from '@/components/TextDirection';

export default function Mobile({nodesIn} : { nodes : DBNode[]}) {
    const { start, end, algorithm } = useParams();
    const [level, setLevel] = useState<number>(1);
    const [pathNodes, setPathNodes] = useState([]);
    const [prompt, setPrompt] = useState<string[]>([""]);
    const [turn, setTurn] = useState<string[]>([""]);
    const [floor, setFloor] = useState<string[]>([""]);

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
                const { prompts, turns, floors } = TextDirection(res.data);
                setPrompt(prompts);
                setTurn(turns);
                setFloor(floors);
            } catch (error) {
                setPathNodes([]);
                console.error("Error fetching data:", error);
            }
        }
        fetchPathData().then();
    }, [start, end, algorithm]);

    return (
        <div>
            <LevelButtons levelProps={[level, setLevel]}/>
            <div style={{ height: "50vh"}}>
                <MobileMap level={level}
                        path={pathNodes}
                        nodes={nodesIn}
                        />
            </div>
            <TextDirectionComponent prompts={prompt} turns={turn} floors={floor} currFloor={level}/>
        </div>
    );
}