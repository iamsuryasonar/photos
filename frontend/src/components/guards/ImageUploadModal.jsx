import React, { useState } from "react";

export default function ImageUploadModal({ isOpen, onClose, onUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }
       
        onUpload(selectedFile);
        setSelectedFile(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
                <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4 border-1 border-black p-1 rounded-md"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
