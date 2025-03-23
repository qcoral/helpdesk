import React, { useEffect, useState } from 'react';
import { fetchRequests, updateRequestStatus } from './api/airtable';

const App = () => {
  const [requests, setRequests] = useState([]);

  // Fetch pending requests on component mount
  useEffect(() => {
    const loadRequests = async () => {
      const data = await fetchRequests();
      setRequests(data);
    };
    loadRequests();
  }, []);

  // Handle updating the status of a request
  const handleUpdateStatus = async (id, status) => {
    await updateRequestStatus(id, status);
    // Refresh the list of requests after updating
    const updatedRequests = await fetchRequests();
    setRequests(updatedRequests);
  };

  return (
    <div>
      <h2>the help desk</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <strong>{request.slack_username}</strong>
            <p>{request.description}</p>
            <small>{new Date(request.created_at).toLocaleString()}</small>
            <div>
              <button onClick={() => handleUpdateStatus(request.id, 'Completed')}>
                Done!
              </button>
              <button onClick={() => handleUpdateStatus(request.id, 'Rejected')}>
                lol no what
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;