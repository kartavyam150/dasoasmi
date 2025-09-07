import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface ShlokaData {
  shloka: string;
  meaning: string;
  date: string;
  source: string;
  comment: string;
}

const ShlokaForm: React.FC = () => {
  const [formData, setFormData] = useState<ShlokaData>({
    shloka: "",
    meaning: "",
    date: "",
    source: "",
    comment: ""
  });

  const API_URL =
    "https://script.google.com/macros/s/AKfycbylYV1HT_wTHUB7ZYNsfkWKhVDbhMVIX8V7LWHCpLe7GxXUA90iV5ctJPldO91w_89N-Q/exec";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8" // 👈 magic line
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log("Response from Google Sheets:", result);

      if (result.status === "success") {
        alert("✅ Shloka saved successfully!");
        setFormData({
          shloka: "",
          meaning: "",
          date: "",
          source: "",
          comment: ""
        });
      } else {
        alert("⚠️ Failed to save. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error while saving. Check console.");
    }
  };

  return (
    <div className="shloka-form-container">
      <h2>📜 Add New Shloka</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="shloka">🕉️ Shloka:</label>
          <textarea
            id="shloka"
            name="shloka"
            value={formData.shloka}
            onChange={handleChange}
            rows={3}
            placeholder="shloka"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="meaning">🔍 Meaning/Translation:</label>
          <textarea
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            rows={3}
            placeholder="meaning"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">📅 Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="source">📚 Source (Puran/Granth):</label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="source"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">🗣️ Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={3}
            placeholder="comment"
          />
        </div>
        <div className="form-actions">
          <button type="submit">
            🚀 Submit
          </button>
          <button type="button" onClick={() => setFormData({ shloka: "", meaning: "", date: "", source: "", comment: "" })} className="clear-button">
            🗑️ Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShlokaForm;
