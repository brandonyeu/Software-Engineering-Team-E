import { expect, test, describe } from "vitest";
import {
    BFS,
    ASTAR,
    DFS,
    DIJKSTRA,
    PathFinder,
} from "../src/algos/pathFindingStrategy.ts";
import { convertNodeID } from "../src/algos/graphData.ts";

/*
 *  To run tests:
 *  - Directory should be Team-E-Production\apps\backend
 *  - yarn run test
 */

describe("BFS Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const pathFinder = new PathFinder(new BFS());
        const path = pathFinder.executeStrategy("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(await path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Traverses the between two adjacent floors", async () => {
        const pathFinder = new PathFinder(new BFS());
        const path = pathFinder.executeStrategy("CLABS001L1", "GLABS003L2");
        expect(convertNodeID(await path)).toStrictEqual([
            "CLABS001L1",
            "WELEV00ML1",
            "WELEV00ML2",
            "CHALL005L2",
            "WHALL001L2",
            "WHALL002L2",
            "GHALL001L2",
            "GLABS003L2",
        ]);
    });
    test("Path differs from ASTAR path (less nodes but more distance)", async () => {
        const pathFinder1 = new PathFinder(new BFS());
        const pathFinder2 = new PathFinder(new ASTAR());
        const path1 = pathFinder1.executeStrategy("CDEPT002L1", "CLABS005L1");
        const path2 = pathFinder2.executeStrategy("CDEPT002L1", "CLABS005L1");
        expect(convertNodeID(await path1)).toStrictEqual([
            "CDEPT002L1",
            "CHALL013L1",
            "CHALL012L1",
            "CRETL001L1",
            "CHALL009L1",
            "WELEV00KL1",
            "CHALL008L1",
            "CDEPT004L1",
            "CHALL002L1",
            "CCONF003L1",
            "CHALL003L1",
            "CLABS005L1",
        ]);

        expect(
            // Need to fix errors, but it still works since they shouldn't be null
            // @ts-expect-error is not going to be null
            convertNodeID(await path1).toString() ==
                // @ts-expect-error is not going to be null
                convertNodeID(await path2).toString(),
        ).toBe(false);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new BFS());
        const path = pathFinder.executeStrategy("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new BFS());
        const path = pathFinder.executeStrategy("ASTAI00101", "ACONF00102");
        expect(convertNodeID(await path)).toStrictEqual([
            "ASTAI00101",
            "ASTAI00102",
            "AHALL00202",
            "AHALL00102",
            "ACONF00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const pathFinder = new PathFinder(new BFS());
        const path = pathFinder.executeStrategy("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual(["BDEPT00402"]);
    });
});
describe("A* Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const pathFinder = new PathFinder(new ASTAR());
        const path = pathFinder.executeStrategy("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(await path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Traverses the between two adjacent floors", async () => {
        const pathFinder = new PathFinder(new ASTAR());
        const path = pathFinder.executeStrategy("CLABS001L1", "GLABS003L2");
        expect(convertNodeID(await path)).toStrictEqual([
            "CLABS001L1",
            "WELEV00ML1",
            "WELEV00ML2",
            "CHALL005L2",
            "WHALL001L2",
            "WHALL002L2",
            "GHALL001L2",
            "GLABS003L2",
        ]);
    });
    test("Path differs from BFS path (more nodes but less distance)", async () => {
        const pathFinder1 = new PathFinder(new ASTAR());
        const path1 = pathFinder1.executeStrategy("CDEPT002L1", "CLABS005L1");
        const pathFinder2 = new PathFinder(new BFS());
        const path2 = pathFinder2.executeStrategy("CDEPT002L1", "CLABS005L1");
        expect(convertNodeID(await path1)).toStrictEqual([
            "CDEPT002L1",
            "CHALL013L1",
            "CHALL012L1",
            "CRETL001L1",
            "CHALL009L1",
            "WELEV00KL1",
            "CHALL008L1",
            "CDEPT004L1",
            "CHALL002L1",
            "CSERV001L1",
            "CCONF002L1",
            "WELEV00HL1",
            "CHALL004L1",
            "CREST004L1",
            "CLABS005L1",
        ]);
        expect(
            // @ts-expect-error is not going to be null
            convertNodeID(await path1).toString() ==
                // @ts-expect-error is not going to be null
                convertNodeID(await path2).toString(),
        ).toBe(false);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new ASTAR());
        const path = pathFinder.executeStrategy("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new ASTAR());
        const path = pathFinder.executeStrategy("ASTAI00101", "ACONF00102");
        expect(convertNodeID(await path)).toStrictEqual([
            "ASTAI00101",
            "ASTAI00102",
            "AHALL00202",
            "AHALL00102",
            "ACONF00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const pathFinder = new PathFinder(new ASTAR());
        const path = pathFinder.executeStrategy("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual(["BDEPT00402"]);
    });
});
describe("DFS Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const pathFinder = new PathFinder(new DFS());
        const path = pathFinder.executeStrategy("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(await path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new DFS());
        const path = pathFinder.executeStrategy("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new DFS());
        const path = pathFinder.executeStrategy("FSTAI00101", "BSTAI00102");
        expect(convertNodeID(await path)).toStrictEqual([
            "FSTAI00101",
            "HSTAI00102",
            "HHALL00302",
            "WHALL00302",
            "WHALL00402",
            "BSTAI00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const pathFinder = new PathFinder(new DFS());
        const path = pathFinder.executeStrategy("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual(["BDEPT00402"]);
    });
});
describe("Dijkstra Algorithm Tests", () => {
    test("Traverses the same floor between two rooms", async () => {
        const pathFinder = new PathFinder(new DIJKSTRA());
        const path = pathFinder.executeStrategy("ADEPT00101", "ADEPT00301");
        expect(convertNodeID(await path)).toStrictEqual([
            "ADEPT00101",
            "AHALL00401",
            "AHALL00501",
            "AHALL00701",
            "ADEPT00301",
        ]);
    });
    test("Traverses the between two adjacent floors", async () => {
        const pathFinder = new PathFinder(new DIJKSTRA());
        const path = pathFinder.executeStrategy("CLABS001L1", "GLABS003L2");
        expect(convertNodeID(await path)).toStrictEqual([
            "CLABS001L1",
            "WELEV00ML1",
            "WELEV00ML2",
            "CHALL005L2",
            "WHALL001L2",
            "WHALL002L2",
            "GHALL001L2",
            "GLABS003L2",
        ]);
    });
    test("Path differs from BFS path (more nodes but less distance)", async () => {
        const pathFinder1 = new PathFinder(new DIJKSTRA());
        const path1 = pathFinder1.executeStrategy("CDEPT002L1", "CLABS005L1");
        const pathFinder2 = new PathFinder(new BFS());
        const path2 = pathFinder2.executeStrategy("CDEPT002L1", "CLABS005L1");
        expect(convertNodeID(await path1)).toStrictEqual([
            "CDEPT002L1",
            "CHALL013L1",
            "CHALL012L1",
            "CRETL001L1",
            "CHALL009L1",
            "WELEV00KL1",
            "CHALL008L1",
            "CDEPT004L1",
            "CHALL002L1",
            "CSERV001L1",
            "CCONF002L1",
            "WELEV00HL1",
            "CHALL004L1",
            "CREST004L1",
            "CLABS005L1",
        ]);
        expect(
            // @ts-expect-error is not going to be null
            convertNodeID(await path1).toString() ==
                // @ts-expect-error is not going to be null
                convertNodeID(await path2).toString(),
        ).toBe(false);
    });
    test("Starts in elevator going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new DIJKSTRA());
        const path = pathFinder.executeStrategy("WELEV00J03", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual([
            "WELEV00J03",
            "WELEV00J02",
            "BHALL00502",
            "BDEPT00402",
        ]);
    });
    test("Starts on stairs going to different floor immediately", async () => {
        const pathFinder = new PathFinder(new DIJKSTRA());
        const path = pathFinder.executeStrategy("ASTAI00101", "ACONF00102");
        expect(convertNodeID(await path)).toStrictEqual([
            "ASTAI00101",
            "ASTAI00102",
            "AHALL00202",
            "AHALL00102",
            "ACONF00102",
        ]);
    });
    test("Starts at a node and ends immediately at that node", async () => {
        const pathFinder = new PathFinder(new DIJKSTRA());
        const path = pathFinder.executeStrategy("BDEPT00402", "BDEPT00402");
        expect(convertNodeID(await path)).toStrictEqual(["BDEPT00402"]);
    });
});
