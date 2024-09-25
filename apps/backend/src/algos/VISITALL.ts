import { processGraphData, Edge, Node } from "./graphData.ts";

async function runVISITALL(): Promise<
    {
        nodeID: string;
        ycoord: number;
        xcoord: number;
        floor: string;
        building: string;
        nodeType: string;
        longName: string;
        shortName: string;
    }[][]
> {
    // Initialize paths as an empty array
    const paths: {
        nodeID: string;
        ycoord: number;
        xcoord: number;
        floor: string;
        building: string;
        nodeType: string;
        longName: string;
        shortName: string;
    }[][] = [];

    await processGraphData().then((data) => {
        const edgeList: Edge[] = data[1];

        for (let i = 0; i < edgeList.length; i++) {
            const path: Node[] | null = [];
            path.push(edgeList[i].start);
            path.push(edgeList[i].end);
            const simplifiedPath = path.map((node) => {
                return {
                    nodeID: node.nodeID,
                    ycoord: node.coords.ycoord,
                    xcoord: node.coords.xcoord,
                    floor: node.floor,
                    building: node.building,
                    nodeType: node.nodeType,
                    longName: node.longName,
                    shortName: node.shortName,
                };
            });
            paths.push(simplifiedPath);
        }
    });
    return paths;
}

export default runVISITALL;
