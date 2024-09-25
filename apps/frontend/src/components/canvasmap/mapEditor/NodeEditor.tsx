import React, { useState, useEffect } from "react";
import { DBNode } from "common/src/types";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NodeEditorProps {
    node: DBNode | null;
    triggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

async function sendNodeOrder(editedNode: DBNode) {
    axios.post("/api/mapeditor/nodes", editedNode).then((res) => {
        console.log(res);
    });
}

async function sendNodeDelOrder(editedNode: DBNode) {
    axios.post("/api/mapeditordel/nodes", editedNode).then((res) => {
        console.log(res);
    });
}

export default function NodeEditor({ node, triggerRefresh }: NodeEditorProps) {
    const [editedNode, setEditedNode] = useState<DBNode | null>(node);

    // Sync state when the node prop changes
    useEffect(() => {
        setEditedNode(node);
    }, [node]);

    // Function to handle blocking
    function handleBlock() {
        console.log("Block node logic here");
        if (editedNode != null) {
            setEditedNode({
                ...editedNode!,
                blocked: !editedNode.blocked,
            });
        }
    }
    // Function to handle form submission
    function handleSubmit() {
        if (editedNode != null) {
            sendNodeOrder(editedNode);
        }
        setEditedNode(null);
        triggerRefresh(true);
    }

    // Function to handle cancel action
    function handleCancel() {
        console.log("Cancel node logic here");
        setEditedNode(null);
        triggerRefresh(true);
    }

    function handleDelete() {
        console.log("delete logic here");
        if (editedNode != null) {
            sendNodeDelOrder(editedNode);
        }
        setEditedNode(null);
    }

    // If no node is provided, return null
    if (!editedNode) return null;

    return (
        <div className="absolute bg-secondary rounded-lg p-5 space-y-2 z-50 top-[10vh] ml-10">
            <h3>Edit Node</h3>
            <div>
                <Label>Node ID: {editedNode.nodeID}</Label>
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
            <div className="space-x-2">
                <Button variant="destructive" onClick={handleBlock}>
                    {editedNode.blocked ? "Unblock" : "Block"}
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>{" "}
                <Button variant="destructive" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
