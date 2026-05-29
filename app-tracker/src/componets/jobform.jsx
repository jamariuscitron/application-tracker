import { useState } from "react";

function JobForm() {
  // STATE FOR APPLICATIONS
  const [applications, setApplications] = useState([]);

  // STATE FOR FORM INPUTS
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  // TRACK WHICH JOB IS BEING EDITED
  const [editingId, setEditingId] = useState(null);

  // HANDLE FORM SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      company,
      position,
      status,
      notes,
    };

    // EDIT EXISTING JOB
    if (editingId !== null) {
      const updatedApplications = applications.map((application) => {
        if (application.id === editingId) {
          return {
            ...application,
            company,
            position,
            status,
            notes,
          };
        }

        return application;
      });

      setApplications(updatedApplications);

      setEditingId(null);
    } else {
      // ADD NEW JOB
      setApplications([...applications, newApplication]);
    }

    // CLEAR INPUTS
    setCompany("");
    setPosition("");
    setStatus("");
    setNotes("");
  }

  // DELETE JOB
 function handleDelete(idToDelete) {
  setApplications((prev) =>
    prev.filter((app) => app.id !== idToDelete)
  );
}
  // EDIT JOB
  function handleEdit(application) {
    setCompany(application.company);
    setPosition(application.position);
    setStatus(application.status);
    setNotes(application.notes);

    setEditingId(application.id);
  }

  return (
    <>
      <div className="job-form">
        <form onSubmit={handleSubmit}>
          {/* COMPANY */}
          <label htmlFor="company">Company Name:</label>

          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          {/* POSITION */}
          <label htmlFor="position">Position:</label>

          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          {/* STATUS */}
          <label htmlFor="status">Application Status:</label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* NOTES */}
          <label htmlFor="notes">Notes:</label>

          <textarea
            id="notes"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>

          <button type="submit" className="submit-btn">
            {editingId !== null ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>

      {/* DISPLAY APPLICATIONS */}
      <div className="applications-list">
        {applications.map((application) => (
          <div key={application.id} className="job-card">
            <h2>{application.company}</h2>

            <p>
              <strong>Position:</strong>{" "}
              {application.position}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {application.status}
            </p>

            <p>
              <strong>Notes:</strong>{" "}
              {application.notes}
            </p>

            {/* EDIT BUTTON */}
            <button
              className="edit-btn"
              onClick={() => handleEdit(application)}
            >
              Edit
            </button>

            {/* DELETE BUTTON */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(application.id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default JobForm;