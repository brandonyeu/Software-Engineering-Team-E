import express, { Router } from "express";
import {
    BFS,
    ASTAR,
    DFS,
    DIJKSTRA,
    PathFinder,
} from "../algos/pathFindingStrategy.ts";

const router: Router = express.Router();
router.get("/:start/:end/:algo", async (req, res) => {
    const { start, end, algo } = req.params;
    let pathFinder;
    if (algo == "BFS") {
        pathFinder = new PathFinder(new BFS());
    } else if (algo == "ASTAR") {
        pathFinder = new PathFinder(new ASTAR());
    } else if (algo == "DFS") {
        pathFinder = new PathFinder(new DFS());
    } else if (algo == "DIJKSTRA") {
        pathFinder = new PathFinder(new DIJKSTRA());
    }
    await pathFinder!.executeStrategy(start, end).then((path) => {
        const simplifiedPath = path!.map((node) => {
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
        res.send(simplifiedPath);
    });
});
export default router;
