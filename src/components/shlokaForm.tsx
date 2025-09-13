import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { database } from '../firebase';
import { ref, push } from 'firebase/database';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await push(ref(database, 'shlokas'), formData);
      alert("✅ Shloka saved successfully!");
      setFormData({
        shloka: "",
        meaning: "",
        date: "",
        source: "",
        comment: ""
      });
    } catch (error) {
      console.error("Error:", error);
      console.error("Error saving shloka:", error); // Log the error
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
