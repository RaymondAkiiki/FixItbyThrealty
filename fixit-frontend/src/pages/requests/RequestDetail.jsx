import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RequestDetailPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("role");

  // New: Vendor state
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");

  // New: Feedback state
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`/api/requests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchVendors = async () => {
      try {
        const res = await axios.get("/api/vendors");
        setVendors(res.data);
      } catch (err) {
        console.error("Failed to fetch vendors", err);
      }
    };

    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`/api/requests/${id}/feedback`);
        setFeedback(res.data);
      } catch (err) {
        console.error("Failed to fetch feedback", err);
      }
    };

    fetchRequest();
    if (userRole === "landlord" || userRole === "manager") {
      fetchVendors();
    }
    fetchFeedback();
  }, [id, userRole]);

  const handleAddComment = async () => {
    if (!comment) return;
    const newComment = {
      text: comment,
      sender: "Me",
      timestamp: new Date().toISOString(),
    };
    try {
      await axios.post(`/api/requests/${id}/comments`, newComment);
      setRequest((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`/api/requests/${id}/status`, { status: newStatus });
      setRequest((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignVendor = async () => {
    try {
      await axios.put(`/api/requests/${id}/assign`, {
        vendorId: selectedVendor,
      });
      alert("Vendor assigned!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign vendor");
    }
  };

  const handleSubmitFeedback = async (rating, comment) => {
    try {
      await axios.post(`/api/requests/${id}/feedback`, { rating, comment });
      setFeedback({ rating, comment });
      alert("Feedback submitted!");
    } catch (err) {
      console.error("Failed to submit feedback", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!request) return <p>Not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{request.title}</h2>
      <p className="mb-2">{request.description}</p>
      <p className="mb-2">
        <strong>Status:</strong> {request.status}
      </p>
      <p className="mb-2">
        <strong>Priority:</strong> {request.priority}
      </p>

      {(userRole === "landlord" || userRole === "manager") && (
        <div className="mb-4">
          <button
            className="btn bg-green-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleStatusChange("In Progress")}
          >
            Mark In Progress
          </button>
          <button
            className="btn bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleStatusChange("Completed")}
          >
            Mark Completed
          </button>
        </div>
      )}

      {/* New: Vendor Assignment UI */}
      {(userRole === "landlord" || userRole === "manager") && (
        <div className="mb-4">
          <label className="block mb-1">Assign Vendor:</label>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="">Select vendor</option>
            {vendors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handleAssignVendor}
          >
            Assign
          </button>
        </div>
      )}

      {userRole === "tenant" && request.status !== "Completed" && (
        <div className="mb-4">
          <button
            className="btn bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={() => handleStatusChange("Resolved")}
          >
            Mark as Resolved
          </button>
        </div>
      )}

      {/* Comments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="mb-2 max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
          {request.comments?.length > 0 ? (
            request.comments.map((c, i) => (
              <div key={i} className="mb-1">
                <strong>{c.sender}</strong>: {c.text}{" "}
                <span className="text-sm text-gray-500">
                  ({new Date(c.timestamp).toLocaleString()})
                </span>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment..."
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Comment
        </button>
      </div>

      {/* New: Feedback Form for Tenants */}
      {request.status === "Completed" && request.createdBy === currentUser._id && !request.feedback && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Submit Feedback</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitFeedback(e.target.rating.value, e.target.comment.value);
            }}
          >
            <div className="mb-2">
              <label htmlFor="rating" className="block mb-1">Rating (1-5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                required
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="comment" className="block mb-1">Comment</label>
              <textarea
                id="comment"
                name="comment"
                required
                className="border p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestDetailPage;
