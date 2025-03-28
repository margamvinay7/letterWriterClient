// import React, { useContext, useEffect, useRef, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const LetterEditor = () => {
//   const [title, setTitle] = useState("");
//   const quillRef = useRef(null);
//   const quillInstance = useRef(null);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (quillInstance.current || !quillRef.current) return; // ✅ Prevent re-initialization

//     quillInstance.current = new Quill(quillRef.current, {
//       theme: "snow",
//       modules: {
//         toolbar: [
//           [{ header: [1, 2, 3, false] }],
//           ["bold", "italic", "underline", "strike"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["blockquote", "code-block"],
//           [{ align: [] }],
//           ["link", "image"],
//           ["clean"],
//         ],
//       },
//     });
//   }, []);

//   const handleSaveLetter = async () => {
//     if (!quillInstance.current) return;
//     const content = quillInstance.current.root.innerHTML; // Get HTML content

//     try {
//       const token = localStorage.getItem("token");
//       const userAccessToken = localStorage.getItem("userAccessToken");
//       await axios.post(
//         "http://localhost:5000/letter/saveLetter",
//         { title, content, userAccessToken },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Letter saved to Google Drive!");
//     } catch (error) {
//       console.error("Error saving letter", error);
//     }
//   };

//   return (
//     <div className="w-screen  mx-auto  p-6 bg-white shadow-lg rounded-b-lg border border-gray-200 text-black">
//       <input
//         type="text"
//         placeholder="Letter Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full p-2 border rounded-md mb-4 text-lg focus:ring focus:ring-blue-300"
//       />

//       <div
//         ref={quillRef}
//         className="mb-4 min-h-[calc(100vh-300px)] bg-white border rounded-md shadow-sm"
//       />

//       <button
//         onClick={handleSaveLetter}
//         className="w-full  bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
//       >
//         Save to Google Drive
//       </button>
//     </div>
//   );
// };

// export default LetterEditor;

import React, { useState } from "react";
import DraftSidebar from "../components/DraftSidebar";
import CreateLetter from "../components/CreateLetter";

const LetterEditor = () => {
  const [selectedDraft, setSelectedDraft] = useState(null);

  return (
    <div className="flex w-screen max-h-screen text-black">
      {/* Sidebar */}
      <DraftSidebar onDraftSelect={setSelectedDraft} />

      {/* Text Editor */}
      <CreateLetter selectedDraft={selectedDraft} />
    </div>
  );
};

export default LetterEditor;
