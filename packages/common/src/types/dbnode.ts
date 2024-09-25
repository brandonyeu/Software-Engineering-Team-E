import { Edge } from "./edge";
export interface DBNode {
    building: string;
    edges: Edge[];
    floor: string;
    longName: string;
    nodeID: string;
    nodeType: string;
    shortName: string;
    xcoord: number;
    ycoord: number;
    blocked: boolean;
}
