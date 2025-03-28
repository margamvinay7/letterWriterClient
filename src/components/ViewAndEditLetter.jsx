import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

const ViewAndEditLetter = ({ selectedFile }) => {
  const [title, setTitle] = useState("");
  const [fileId, setFileId] = useState(null);
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (!quillRef.current || quillInstance.current) return;

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });
  }, []);

  // 🔹 Load selected file into editor
  useEffect(() => {
    if (!selectedFile || !quillInstance.current) return;

    const fetchFileContent = async () => {
      try {
        const userAccessToken = localStorage.getItem("userAccessToken");

        const response = await axios.post(
          "http://localhost:5000/letter/getFileDetails",
          {
            fileId: selectedFile.id,
            userAccessToken,
          }
        );

        setTitle(selectedFile.name);
        setFileId(selectedFile.id);

        // ✅ Use Quill API instead of innerHTML to prevent formatting issues
        if (quillInstance.current) {
          quillInstance.current.clipboard.dangerouslyPasteHTML(
            response.data.file.content
          );
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    fetchFileContent();
  }, [selectedFile]);

  // 🔹 Update file in Google Drive
  const handleUpdateFile = async () => {
    if (!fileId) {
      alert("Please select a file to update.");
      return;
    }

    try {
      const userAccessToken = localStorage.getItem("userAccessToken");
      const updatedContent = quillInstance.current.root.innerHTML;

      await axios.post("http://localhost:5000/letter/updateFile", {
        fileId,
        content: updatedContent,
        userAccessToken,
      });

      alert("File updated successfully!");
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-br-lg border border-gray-200 text-black">
      {/* 🔹 Title */}
      <input
        type="text"
        value={title}
        readOnly
        className="w-full p-2 border rounded-md mb-4 bg-gray-100"
      />

      {/* 🔹 Quill Editor */}
      <div className="w-full h-[calc(100vh-300px)] mb-14">
        <div
          ref={quillRef}
          className="w-full h-full bg-white border rounded-md shadow-sm"
        />
      </div>

      {/* 🔹 Update Button */}
      <button
        onClick={handleUpdateFile}
        className={`w-full py-2 rounded-md font-semibold transition duration-300 ${
          fileId
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!fileId}
      >
        Update Google Doc
      </button>
    </div>
  );
};

export default ViewAndEditLetter;
