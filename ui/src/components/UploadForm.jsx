import React, { useState } from "react";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.endsWith(".glb")) {
      setFile(selected);
      setMessage("");
    } else {
      setMessage("Please select a valid .glb file");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a .glb file first!");

    const formData = new FormData();
    formData.append("model", file);

    try {
      setUploading(true);
      setMessage("Uploading...");

      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("File upload successfully!");
        setFile(null);
        e.target.reset();

        // Refresh the model list after upload
        if (onUploadSuccess) onUploadSuccess();
      } else {
        setMessage(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-500 p-6 rounded-xl shadow-lg text-center mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload a 3D Model (.glb)</h2>

      <form onSubmit={handleUpload} className="flex flex-col items-center gap-3">
        <input
          type="file"
          accept=".glb"
          onChange={handleFileChange}
          className="text-gray-300 file:mr-3 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 file:bg-green-600 
                     file:text-white hover:file:bg-green-500"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`px-6 py-2 rounded-lg font-medium transition 
            ${uploading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
            }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
    </div>
  );
}