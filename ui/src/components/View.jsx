import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ModelViewer from "./ModelViewer";
import UploadForm from "./UploadForm";

export default function View() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/list");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10 text-center">
        {/* Upload section */}
        {/* <UploadForm onUploadSuccess={fetchFiles} /> */}

        <h2 className="text-2xl mb-6 font-semibold">Available 3D Models</h2>

        {/* File list */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {files.length > 0 ? (
            files.map((file) => (
              <button
                key={file._id}
                onClick={() => setSelectedFile(file.filename)}
                className={`px-5 py-2 rounded-lg border transition-all duration-200 ${
                  selectedFile === file.filename
                    ? "bg-blue-600 border-blue-600"
                    : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                }`}
              >
                {file.filename}
              </button>
            ))
          ) : (
            <p className="text-gray-400">No files uploaded yet.</p>
          )}
        </div>

        {/* 3D Model Viewer */}
        <ModelViewer filename={selectedFile} />
      </div>
    </>
  );
}