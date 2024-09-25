import { DBNode } from "common/src/types";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "../../ui/select.tsx";
// import { Path } from "common/src/types";
// import axios from "axios";
// import formInput, {FormInput} from "@/components/ui/formInput.tsx";

interface PathSetFunctionProps {
    selection: DBNode[];
    start: [startPath: string, (start: string) => void];
    end: [endPath: string, (end: string) => void];
    algorithm: [algorithmChoice: string, (algorithm: string) => void];
}

export default function SearchBar(PathFunctions: PathSetFunctionProps) {
    const startFunction = PathFunctions.start[1];
    const endFunction = PathFunctions.end[1];
    const algorithmFunction = PathFunctions.algorithm[1];
    const startPath = PathFunctions.start[0];
    const endPath = PathFunctions.end[0];
    const algorithm = PathFunctions.algorithm[0];
    const choices = removeHallNodes(PathFunctions.selection);

    function removeHallNodes(nodes: DBNode[]): DBNode[] {
        return nodes
            .filter((node) => {
                return node.nodeType != "HALL";
            })
            .sort(function (a, b) {
                if (a.longName < b.longName) {
                    return -1;
                }
                if (a.longName > b.longName) {
                    return 1;
                }
                return 0;
            });
    }

    return (
        <>
            <div
                className={
                    " w-[300px] justify-items-center text-2xl rounded-2xl flex flex-col rounded-2"
                }
            >
                <div
                    className={
                        "flex flex-col rounded-2 border-white drop-shadow-xl"
                    }
                >
                    <Select
                        onValueChange={(e) => startFunction(e)}
                        value={startPath}
                    >
                        <SelectTrigger
                            className={
                                "dark:text-foreground dark:ring-0 dark:border-0 dark:bg-primary-element dark:ring-0 dark:hover:ring-2 dark:ring-accent transition-all"
                            }
                        >
                            <SelectValue placeholder="Start Node" />
                        </SelectTrigger>
                        <SelectContent className={"bg-secondary-element"}>
                            {choices.map((node, index) => (
                                <SelectItem key={index} value={node.nodeID}>
                                    {node.longName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div
                    className={
                        "py-5 flex flex-col rounded-2 border-white drop-shadow-xl"
                    }
                >
                    <Select
                        onValueChange={(e) => endFunction(e)}
                        value={endPath}
                    >
                        <SelectTrigger
                            className={
                                "dark:text-foreground dark:ring-0 dark:border-0 dark:bg-primary-element dark:ring-0 dark:hover:ring-2 dark:ring-accent transition-all"
                            }
                        >
                            <SelectValue placeholder="End Node" />
                        </SelectTrigger>
                        <SelectContent className={"bg-secondary-element"}>
                            {choices.map((node, index) => (
                                <SelectItem key={index} value={node.nodeID}>
                                    {node.longName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col rounded-2 border-white drop-shadow-xl">
                    <Select
                        value={algorithm}
                        onValueChange={(value) => algorithmFunction(value)}
                    >
                        <SelectTrigger
                            className={
                                "dark:text-foreground dark:ring-0 dark:border-0 dark:bg-primary-element dark:ring-0 dark:hover:ring-2 dark:ring-accent transition-all"
                            }
                        >
                            <SelectValue placeholder="A* (A-Star)" />
                        </SelectTrigger>
                        <SelectContent
                            className={"bg-secondary-element"}
                            defaultValue="ASTAR"
                        >
                            <SelectItem value="BFS">
                                Breadth-First Search (BFS)
                            </SelectItem>
                            <SelectItem value="ASTAR">A* (A-Star)</SelectItem>
                            <SelectItem value="DFS">
                                Depth-First Search (DFS)
                            </SelectItem>
                            <SelectItem value="DIJKSTRA">Dijkstra</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}
