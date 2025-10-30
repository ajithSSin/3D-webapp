import React from 'react'
import { useState, useEffect } from 'react';
import ModelViewer from './ModelViewer';
import Navbar from './Navbar';

const View = () => {

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch file list from backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/list");
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error("Error fetching file list:", err);
      }
    };
    fetchFiles();
  }, []);

  return (
    // <div>View</div>
    <>
    <Navbar/>
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>3D Model Dashboard</h1>

      {/* List of Uploaded Models */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">

        {files.length > 0 ? (files.map((file) => (
            <div
              key={file._id}
              onClick={() => setSelectedFile(file.filename)}
              
              className={`px-6 py-4 border border-gray-300 rounded-lg 
                  cursor-pointer transition-all duration-200 ease-in-out
                  ${selectedFile === file.filename? "bg-blue-500 text-white"
                                                  : "bg-gray-100 text-gray-800"}`}>
              {file.filename}
            </div>
          ))
        ) : (<p>No files uploaded yet.</p>)}
      </div>

      {/* 3D Model Viewer */}
      <div className="w-80 h-80">
        {selectedFile && <ModelViewer filename={selectedFile} />}
      </div>
    </div>
    </>
  )
}

export default View