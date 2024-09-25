import React, { useState, useEffect } from "react";
import { DBNode } from "common/src/types";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const defaultNode = {
    nodeID: "",
    xcoord: 0,
    ycoord: 0,
    floor: "",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
    edges: [],
    blocked: false,
};

interface NodeCreatorProps {
    triggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

async function sendNodeCreateOrder(editedNode: DBNode) {
    axios.post("/api/mapeditorcreate/nodes", editedNode).then((res) => {
        console.log(res);
    });
}

export default function NodeCreator({ triggerRefresh }: NodeCreatorProps) {
    const [editedNode, setEditedNode] = useState<DBNode>(defaultNode);

    // Sync state when the node prop changes
    useEffect(() => {});

    // Function to handle form submission
    function handleSubmit() {
        if (editedNode != null) {
            sendNodeCreateOrder(editedNode);
        }
        setEditedNode(defaultNode);
        triggerRefresh(true);
    }

    // Function to handle cancel action
    function handleCancel() {
        console.log("Cancel node logic here");
        setEditedNode(defaultNode);
        triggerRefresh(true);
    }

    return (
        <div className="absolute bg-secondary rounded-lg p-5 space-y-2 z-50 top-[10vh] ml-10">
            <h3>Create Node</h3>
            <div>
                <Label>
                    {" "}
                    Node ID:
                    <Input
                        type="text"
                        name="nodeID"
                        value={editedNode.nodeID}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                nodeID: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Long Name:
                    <Input
                        type="text"
                        name="longName"
                        value={editedNode.longName}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                longName: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Short Name:
                    <Input
                        type="text"
                        name="longName"
                        value={editedNode.shortName}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                shortName: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Node Type:
                    <Input
                        type="text"
                        name="nodeType"
                        value={editedNode.nodeType}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                nodeType: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Building:
                    <Input
                        type="text"
                        name="building"
                        value={editedNode.building}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                building: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Floor:
                    <Input
                        type="text"
                        name="floor"
                        value={editedNode.floor}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                floor: e.target.value,
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    X Coordinate:
                    <Input
                        type="number"
                        name="xcoord"
                        value={editedNode.xcoord}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                xcoord: parseInt(e.target.value),
                            })
                        }
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Y Coordinate:
                    <Input
                        type="number"
                        name="ycoord"
                        value={editedNode.ycoord}
                        onChange={(e) =>
                            setEditedNode({
                                ...editedNode,
                                ycoord: parseInt(e.target.value),
                            })
                        }
                    />
                </Label>
            </div>
            <Label>Form Defaults to No Edges and Unblocked</Label>
            <div className="space-x-2">
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>{" "}
            </div>
        </div>
    );
}
