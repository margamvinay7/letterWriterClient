import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ViewAndEditLetter from "../components/ViewAndEditLetter";

const Letters = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="flex w-screen max-h-screen text-black">
      {/* Sidebar */}
      <Sidebar onFileSelect={setSelectedFile} />

      {/* Text Editor */}
      <ViewAndEditLetter selectedFile={selectedFile} />
    </div>
  );
};

export default Letters;
