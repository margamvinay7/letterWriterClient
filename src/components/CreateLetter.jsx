import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

const CreateLetter = ({ selectedDraft }) => {
  const [title, setTitle] = useState("");
  const [draftId, setDraftId] = useState(null);
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillInstance.current || !quillRef.current) return; // ✅ Prevent re-initialization

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

  useEffect(() => {
    console.log("sel draft", selectedDraft);
    if (!selectedDraft || !quillInstance.current) return;

    const fetchDraftContent = async () => {
      try {
        const userAccessToken = localStorage.getItem("userAccessToken");

        const response = await axios.post(
          "http://localhost:5000/draft/getDraftDetails",
          {
            fileId: selectedDraft.id,
            userAccessToken,
          }
        );

        setTitle(selectedDraft.name);
        setDraftId(selectedDraft.id);

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

    fetchDraftContent();
  }, [selectedDraft]);

  const handleSaveLetter = async () => {
    if (!quillInstance.current) return;
    const content = quillInstance.current.root.innerHTML; // Get HTML content

    try {
      const token = localStorage.getItem("token");
      const userAccessToken = localStorage.getItem("userAccessToken");
      await axios.post(
        "http://localhost:5000/letter/saveLetter",
        { title, content, userAccessToken, draftId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Letter saved to Google Drive!");
    } catch (error) {
      console.error("Error saving letter", error);
    }
  };
  const handleSaveDraft = async () => {
    if (!quillInstance.current) return;
    const content = quillInstance.current.root.innerHTML; // Get HTML content

    try {
      const token = localStorage.getItem("token");
      const userAccessToken = localStorage.getItem("userAccessToken");
      await axios.post(
        "http://localhost:5000/draft/saveDraft",
        { title, content, userAccessToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Draft saved to Google Drive!");
    } catch (error) {
      console.error("Error saving letter", error);
    }
  };

  return (
    <div className="p-6 w-full bg-white shadow-lg rounded-br-lg border border-gray-200 text-black">
      <input
        type="text"
        placeholder="Letter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-md mb-4 text-lg focus:ring focus:ring-blue-300"
      />

      <div className="w-full h-[calc(100vh-300px)] mb-14">
        <div
          ref={quillRef}
          className="w-full h-full overflow-auto   bg-white border rounded-md shadow-sm"
        />
      </div>
      <div className="flex gap-x-5">
        <button
          onClick={handleSaveLetter}
          className="w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Save to Google Drive
        </button>
        <button
          onClick={handleSaveDraft}
          className="w-full  bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Save as Draft
        </button>
      </div>
    </div>
  );
};

export default CreateLetter;
