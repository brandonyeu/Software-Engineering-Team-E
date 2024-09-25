import React from "react";

// Define the properties expected for the NodeEditorButton component
interface NodeEditorButtonProps {
    openNodeEditor: () => void;
}

// NodeEditorButton component function
export default function NodeEditorButton({
    openNodeEditor,
}: NodeEditorButtonProps) {
    return (
        // Create a button element that triggers the openNodeEditor function when clicked
        <button
            onClick={openNodeEditor}
            style={{
                position: "fixed",
                top: "50%", // You can adjust the top value as needed
                right: "0", // Position the button on the right side of the screen
                transform: "translateY(-50%)", // Center the button vertically
                padding: "10px 20px",
                backgroundColor: "#007BFF", // Button background color (you can customize it)
                color: "white", // Button text color
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
            }}
        >
            Open Node Editor
        </button>
    );
}
