import React, { useEffect, useState } from "react";
import { Edge } from "common/src/types";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function sendEdgeCreateOrder(editedEdge: Edge) {
    axios.post("/api/mapeditorcreate/edges", editedEdge).then((res) => {
        console.log(res);
    });
}

interface EdgeCreatorProps {
    edgeID: string;
    startNodeID: string;
    endNodeID: string;
    handleClose: () => void; // handleClose prop as a function
    triggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const EdgeCreator: React.FC<EdgeCreatorProps> = ({
    edgeID,
    startNodeID,
    endNodeID,
    handleClose,
    triggerRefresh,
}) => {
    const [editedEdge, setEditedEdge] = useState<Edge>({
        edgeID: edgeID,
        start: startNodeID,
        end: endNodeID,
    });

    // Update edgeID whenever startNodeID or endNodeID changes
    useEffect(() => {
        if (startNodeID && endNodeID) {
            const generatedEdgeID = `${startNodeID}_${endNodeID}`;
            setEditedEdge((prevEdge) => ({
                ...prevEdge,
                edgeID: generatedEdgeID,
                start: startNodeID,
                end: endNodeID,
            }));
        }
    }, [startNodeID, endNodeID]);

    // Log the start and end node IDs when the component renders or when they change
    useEffect(() => {
        console.log("Start Node ID:", startNodeID);
        console.log("End Node ID:", endNodeID);
    }, [startNodeID, endNodeID]);

    // Function to handle form submission
    function handleSubmit() {
        if (editedEdge != null) {
            console.log("Submitting edge creation with data:", editedEdge); // Log the editedEdge object
            sendEdgeCreateOrder(editedEdge); // Call the function with editedEdge
        }
        handleClose();
        triggerRefresh(true);
    }

    // Function to handle cancel action
    function handleCancel() {
        console.log("Cancel Edge");
        handleClose();
        triggerRefresh(true);
    }

    return (
        <div className="absolute bg-secondary rounded-lg p-5 space-y-2 z-50 top-[10vh] ml-10">
            <h3>Create Edge</h3>
            <div>
                <Label>
                    Edge ID:
                    <Input
                        type="text"
                        name="edgeID"
                        value={editedEdge.edgeID}
                        readOnly
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Start Node ID:
                    <Input type="text" name="start" value={startNodeID} />
                </Label>
            </div>
            <div>
                <Label>
                    End Node ID:
                    <Input type="text" name="end" value={endNodeID} />
                </Label>
            </div>

            <div className="space-x-2">
                <Button onClick={handleSubmit}>Save</Button>
                <Button variant="destructive" onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default EdgeCreator;
