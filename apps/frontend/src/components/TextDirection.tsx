import { CornerUpLeft } from "lucide-react";
import { MoveDownLeft } from "lucide-react";
import { MoveDownRight } from "lucide-react";
import { CornerUpRight } from "lucide-react";
import { MoveUpLeft } from "lucide-react";
import { MoveUpRight } from "lucide-react";
import { MoveUp } from "lucide-react";
import { Goal } from "lucide-react";
import { Map } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DBNode } from "common/src/types";
import React from "react";
import { translate } from "./LanguageProvider";

export default function TextDirection(nodes: DBNode[], language: string) {
    let { prompts, turns, floors, previousAngle } = initTextDirection(nodes);

    for (let i = 1; i < nodes.length; i++) {
        const currNode = nodes[i];
        const nextNode = nodes[i + 1];

        if (!currNode) break;
        if (!nextNode) {
            // on last node
            prompts.push(
                `${translate("You have reached your destination", language)}, ${currNode.longName}.`,
            );
            turns.push("end");
            floors.push(`${currNode.floor}`);
            break;
        }

        ////////////////////////////////////////////////////////////////////////

        // if in the same building and floor
        if (
            currNode.floor === nextNode.floor &&
            currNode.building === nextNode.building
        ) {
            const promptType: string = "same building and floor";
            const { promptArr, turnArr, floorArr, prevAngle } = determinePrompt(
                nextNode,
                currNode,
                previousAngle,
                prompts,
                turns,
                floors,
                promptType,
                language,
            );

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        /////////////////////////////////////////////////////////////////////////

        // entering new building on the same floor
        else if (
            currNode.floor === nextNode.floor &&
            currNode.building !== nextNode.building
        ) {
            const promptType: string = "diff building same floor";
            const { promptArr, turnArr, floorArr, prevAngle } = determinePrompt(
                nextNode,
                currNode,
                previousAngle,
                prompts,
                turns,
                floors,
                promptType,
                language,
            );

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        ///////////////////////////////////////////////////////////////////////////

        // entering new floor
        else if (currNode.floor !== nextNode.floor) {
            const promptType: string = "diff floor";
            const { promptArr, turnArr, floorArr, prevAngle } = determinePrompt(
                nextNode,
                currNode,
                previousAngle,
                prompts,
                turns,
                floors,
                promptType,
                language,
            );

            previousAngle = prevAngle;
            prompts = promptArr;
            turns = turnArr;
            floors = floorArr;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////
        else {
            prompts.push("Bang! Unexpected node condition.");
            turns.push("Error");
            floors.push("Error");
        }
    }

    // promptArr.push(`${nodes}`);
    return { prompts, turns, floors };
}

//////////////////////////////////////////////////////////

interface TextDirectionProps {
    prompts: string[];
    turns: string[];
    floors: string[];
}

// this is what actually displays to screen
export function TextDirectionComponent(props: TextDirectionProps) {
    const prompts = props.prompts;
    const turns = props.turns;
    const floors = props.floors;
    const floorsUsed: string[] = []; // list of the floors used in order
    const indexOfFloorUsed: number[] = []; // prevents directions from being displayed twice if a floor is re-entered

    // create a list of floors used to title each accordion section
    for (let i = 0; i < floors.length; i++) {
        if (i === 0) floorsUsed.push(floors[i]);
        if (
            floors[i] !== floors[i + 1] &&
            floors[i + 1] !== undefined &&
            floors[i + 1] !== null
        ) {
            // check if floors[i+1] exists
            floorsUsed.push(floors[i + 1]);
            indexOfFloorUsed.push(i + 1);
        }
        if (i === floors.length - 1) indexOfFloorUsed.push(i + 1);
    }

    // Define a mapping object
    const componentMapping: { [key: string]: React.ComponentType } = {
        SLR: MoveUpRight,
        R: CornerUpRight,
        SHR: MoveDownRight,
        SHL: MoveDownLeft,
        L: CornerUpLeft,
        SLL: MoveUpLeft,
        S: MoveUp,
        start: Map,
        end: Goal,
        arise: ArrowUpDown,
    };


      return (
        prompts[0]!=='' ?
        <Accordion type="single" collapsible className="w-full px-3 drop-shadow-xl z-10 bg-secondary dark:bg-primary-element dark:border-accent shadow-md text-foreground rounded-lg">
            {floorsUsed?.map((flr,idx) => (
                <AccordionItem value={`${idx}`}>
                    <AccordionTrigger className="max-h-11 px-2">{flr}</AccordionTrigger>
                    <AccordionContent className="overflow-y-auto h-fit max-h-60">
                        {prompts?.map((prompt, index) => (
                            (floors[index]===flr && floorBool(indexOfFloorUsed,idx,index)) ?
                            <div key={index}
                                 className="flex-row p-2 border z-10 bg-secondary dark:bg-secondary-element text-foreground rounded-lg flex items-center mt-1">
                                <div className="border-black rounded-lg p-1">
                                    {componentMapping[turns [index]] ? React.createElement(componentMapping[turns[index]]) : "Please Select Path"}
                                </div>
                                <div className="px-3">{prompt}</div>
                            </div> : <></>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion> : <></>
    );
}

// matches prompts to accordion section
// indexOfFloorUsed:number[] - holds list of indexes that tracks floor changes
// idx:number - accordion header index
// index:number - prompt list index
function floorBool(indexOfFloorUsed: number[], idx: number, index: number) {
    if (!indexOfFloorUsed[idx - 1] && index < indexOfFloorUsed[idx])
        return true; // accounts for first case when [idx-1] doesnt exist
    else if (
        indexOfFloorUsed[idx - 1] <= index &&
        index < indexOfFloorUsed[idx]
    )
        return true;
    else return false;
}

//////////////////REFACTORED FOR CODE REUSE////////////////////////////////////

// first directions, establishes orientation
function initTextDirection(nodes: DBNode[]) {
    const distance = Math.round(euclideanDistance(nodes[0], nodes[1]));
    const prompts = [
        `Directions from ${nodes[0].longName} to ${nodes[nodes.length - 1].longName}:`,
    ]; // stores prompts
    // decide how to start the directions
    if (
        nodes[0].floor === nodes[1].floor &&
        nodes[0].building === nodes[1].building
    ) {
        // same floor same building
        prompts.push(
            `Head towards ${nodes[1].longName} for ${distance} units of distance.`,
        );
    } else if (
        nodes[0].floor === nodes[1].floor &&
        nodes[0].building !== nodes[1].building
    ) {
        // same floor different building
        prompts.push(
            `Head towards ${nodes[1].longName} in building ${nodes[1].building} for ${distance} units of distance.`,
        );
    } else if (nodes[0].floor !== nodes[1].floor) {
        // different floor
        let medium: string;
        if (nodes[0].nodeType === "ELEV") medium = "elevator";
        else if (nodes[0].nodeType === "STAI") medium = "stairs";
        else medium = "";
        prompts.push(`Take the ${medium} to floor ${nodes[1].floor}.`);
    } else prompts.push("Bang! If you see this there is an error.");

    const turns = ["start"]; // stores turns at each node, start assuming user is facing direction of line
    turns.push("S");
    const floors = [`${nodes[0].floor}`, `${nodes[0].floor}`]; // stores floor of each node

    const deltaX = nodes[1].xcoord - nodes[0].xcoord;
    const deltaY = nodes[1].ycoord - nodes[0].ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if (absoluteAngle < 0) absoluteAngle += 360;
    const previousAngle = absoluteAngle; // previous absolute angle, start in same dir as path

    return { prompts, turns, floors, previousAngle };
}

// determines the next prompt to store in array based on the inputs provide
function determinePrompt(
    nextNode: DBNode,
    currNode: DBNode,
    prevAngle: number,
    promptArr: string[],
    turnArr: string[],
    floorArr: string[],
    promptType: string,
    language: string,
) {
    let scriptArr: string[] = [""]; // set of listed possible prompts
    let turnScriptArr: string[] = [""]; // set of listed possible turns
    if (promptType === "same building and floor") {
        // same building and floor between this node and the next
        const distance = Math.round(euclideanDistance(currNode, nextNode));

        scriptArr = [
            `${translate("Take a slight right and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a right and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a sharp right and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a sharp left and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a left and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a slight left and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Head straight for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
        ];
        turnScriptArr = ["SLR", "R", "SHR", "SHL", "L", "SLL", "S"];
    } else if (promptType === "diff building same floor") {
        // different building but same floor between this node and the next
        const distance = Math.round(euclideanDistance(currNode, nextNode));
        scriptArr = [
            `${translate("Take a slight right into building", language)} ${nextNode.building} ${translate("and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a right into building", language)} ${nextNode.building} ${translate("and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a sharp right into building", language)} ${nextNode.building} ${translate("and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a sharp left into building", language)} ${nextNode.building} ${translate("and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a left into building", language)} ${nextNode.building} ${translate("and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Take a slight left into building", language)} ${nextNode.building} ${translate("and continue for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
            `${translate("Head straight into building", language)} ${nextNode.building} ${translate("for", language)} ${distance} ${translate("units of distance until you reach", language)} ${nextNode.shortName}.`,
        ];
        turnScriptArr = ["SLR", "R", "SHR", "SHL", "L", "SLL", "S"];
    } else if (promptType === "diff floor") {
        // different floor between this node and the next, so elevator or stairs
        let medium: string;
        if (currNode.nodeType === "ELEV") medium = "elevator";
        else if (currNode.nodeType === "STAI") medium = "stairs";
        else medium = ""; // set medium to be elevator or stairs, depending on node type

        for (let i = 0; i < 7; i++)
            scriptArr[i] = `Take the ${medium} to floor ${nextNode.floor}.`;
        for (let i = 0; i < 7; i++) turnScriptArr[i] = "arise";
    } else scriptArr = ["Bang! Should not be possible to see this :/"];

    const deltaX = nextNode.xcoord - currNode.xcoord;
    const deltaY = nextNode.ycoord - currNode.ycoord;

    let absoluteAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI; // degrees
    if (absoluteAngle < 0) absoluteAngle += 360; // shift range to be from 0-360

    // indicates rotation direction and amount
    let relativeAngle =
        absoluteAngle - prevAngle < -180
            ? absoluteAngle - prevAngle + 360 // keeps relative angle in the right 'domain'
            : absoluteAngle - prevAngle; // keeps relative angel in the right 'domain'
    if (relativeAngle > 180) relativeAngle -= 360;

    // by taking the difference of current heading and last heading, relativeAngle indicates relative rotation
    // -90 left turn, 90 right turn, etc.
    const SlightRight = 25 <= relativeAngle && relativeAngle <= 60;
    const Right = 60 < relativeAngle && relativeAngle < 120;
    const SharpRight = 120 <= relativeAngle && relativeAngle <= 155;
    // Straight -150 +/-180 150
    const SharpLeft = -120 >= relativeAngle && relativeAngle >= -155;
    const Left = -60 > relativeAngle && relativeAngle > -120;
    const SlightLeft = -25 >= relativeAngle && relativeAngle >= -60;

    // select correct prompt to push
    const index = SlightRight
        ? 0
        : Right
          ? 1
          : SharpRight
            ? 2
            : SharpLeft
              ? 3
              : Left
                ? 4
                : SlightLeft
                  ? 5
                  : 6;

    promptArr.push(scriptArr[index]); // for this node, display this prompt
    turnArr.push(turnScriptArr[index]); // for this node, the next direction will be this turn
    floorArr.push(`${currNode.floor}`); // keep track of which floor current node is on

    prevAngle = absoluteAngle; // used to determine relative direction for next node
    return { promptArr, turnArr, floorArr, prevAngle };
}

// adjusted to take DBNode
function euclideanDistance(nodeA: DBNode, nodeB: DBNode): number {
    return Math.sqrt(
        Math.pow(nodeA.xcoord - nodeB.xcoord, 2) +
            Math.pow(nodeA.ycoord - nodeB.ycoord, 2),
    );
}
