import React, { useState } from "react";
import axios from "../utils/axiosInstance";

const FeedbackForm = ({ requestId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/request/${requestId}/feedback`, { rating, comment });
      onSuccess(); // notify parent
    } catch (err) {
      alert("Feedback submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <label className="block mb-2 font-semibold">Rate the Service</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setRating(num)}
            className={`p-1 ${rating >= num ? "text-yellow-500" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded mb-3"
        placeholder="Leave a comment (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
