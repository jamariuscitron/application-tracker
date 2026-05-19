import { useState } from "react";

function JobForm() {
   // State to hold the list of job applications 
   const [applications, setApplications] = useState([]);
   
   // State to hold the form input values
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("");

    // Function to handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        const newApplication = {
          company: company,
          position: position,
          status: status,
        };
    // add new application to array
   setApplications([...applications, newApplication]);

    //clear inputs
    setCompany("");
    setPosition("");
    setStatus("");
    };
    
    
    
    return(
       <>
     <div className="job-form">
      <form onSubmit={handleSubmit}>
        <label for="company">Company Name:</label>
        <input type="text" id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />

        <label for="position">Position:</label>
        <input type="text" id="position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} />

        <label for="status">Application Status:</label>
        <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <button type="submit">Add Job</button>
      </form>
     {/* DISPLAY APPLICATIONS */}
     </div>
     {applications.map((application,index) => (
      <div key={index}>
            <h2>{application.company}</h2>

            <p>
              <strong>Position:</strong>{" "}
              {application.position}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {application.status}
            </p>

            <hr />
          </div>
     ))}
     <div>

     </div>
       </>
    );
}

export default JobForm;