import React, { useState, useEffect } from "react";
import { DBNode } from "common/src/types";
import { Button } from "@/components/ui/button.tsx";
import axios from "axios";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

interface EdgeEditorProps {
    startNode: DBNode | null;
    endNode: DBNode | null;
    edgeID: string; // New prop for the edge ID
    handleClose: () => void; // handleClose prop as a function
    triggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

// async function sendEdgeOrder(editedEdge: {
//     startNode: DBNode | null;
//     endNode: DBNode | null;
//     edgeID: string;
// }) {
//     axios.post("/api/mapeditor/edges", editedEdge).then((res) => {
//         console.log(res);
//     });
// }

async function sendEdgeDelOrder(editedEdge: {
    startNode: DBNode | null;
    endNode: DBNode | null;
    edgeID: string;
}) {
    axios.post("/api/mapeditordel/edges", editedEdge).then((res) => {
        console.log(res);
    });
}

const EdgeEditor: React.FC<EdgeEditorProps> = ({
    startNode,
    endNode,
    edgeID,
    handleClose,
    triggerRefresh,
}) => {
    // State for the editable edge, initialized with the existing edge
    const [editedEdge, setEditedEdge] = useState<{
        startNode: DBNode | null;
        endNode: DBNode | null;
        edgeID: string;
    }>({ startNode, endNode, edgeID });

    // Sync state when the edge ID prop changes
    useEffect(() => {
        setEditedEdge({ startNode, endNode, edgeID });
    }, [startNode, endNode, edgeID]);

    // // Function to handle form submission
    // function handleSubmit() {
    //     if (editedEdge != null) {
    //         sendEdgeOrder(editedEdge);
    //     }
    //     handleClose();
    // }

    // Function to handle cancel action
    function handleCancel() {
        handleClose();
        triggerRefresh(true);
    }

    function handleDelete() {
        sendEdgeDelOrder(editedEdge);
        handleClose();
        triggerRefresh(true);
    }

    return (
        <div className="absolute bg-secondary rounded-lg p-5 space-y-2 z-50 top-[10vh] ml-10">
            <h3>Edit Edge</h3>
            <div>
                <Label>
                    Edge ID:
                    <Input
                        type="text"
                        name="start"
                        value={editedEdge?.edgeID}
                    />
                </Label>
                <Label>
                    Start Node ID:
                    <Input type="text" name="start" value={startNode?.nodeID} />
                </Label>
                <Label>
                    End Node ID:
                    <Input type="text" name="start" value={endNode?.nodeID} />
                </Label>
            </div>
            <div className="space-x-2">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default EdgeEditor;
