import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  // 🔹 Fetch list of files
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const userAccessToken = localStorage.getItem("userAccessToken");

      const response = await axios.post(
        "http://localhost:5000/letter/getListFiles",
        { userAccessToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return (
    <div className="w-64  bg-white p-4 border-r rounded-bl-lg">
      <h3 className="text-lg font-semibold mb-4">Saved Letters</h3>
      <ul>
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          files.map((file) => (
            <li
              key={file.id}
              className="cursor-pointer text-blue-500 hover:underline mb-2"
              onClick={() => onFileSelect(file)}
            >
              📄 {file.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
