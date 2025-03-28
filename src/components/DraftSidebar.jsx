import React, { useEffect, useState } from "react";
import axios from "axios";

const DraftSidebar = ({ onDraftSelect }) => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    fetchDrafts();
  }, []);

  // 🔹 Fetch list of drafts
  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem("token");
      const userAccessToken = localStorage.getItem("userAccessToken");

      const response = await axios.post(
        "http://localhost:5000/draft/getListDrafts",
        { userAccessToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDrafts(response.data.files);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  return (
    <div className="w-64  bg-white p-4 border-r rounded-bl-lg">
      <h3 className="text-lg font-semibold mb-4">Saved Drafts</h3>
      <ul>
        {drafts.length === 0 ? (
          <p>No drafts found.</p>
        ) : (
          drafts.map((draft) => (
            <li
              key={draft.id}
              className="cursor-pointer text-blue-500 hover:underline mb-2"
              onClick={() => onDraftSelect(draft)}
            >
              📄 {draft.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DraftSidebar;
