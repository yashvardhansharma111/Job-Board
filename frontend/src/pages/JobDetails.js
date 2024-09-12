import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://testapi.getlokalapp.com/common/jobs/${id}`);
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {job && (
        <div>
          <h1>{job.title}</h1>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.phone}</p>
          <p>{job.description}</p>
          <p>{job.requirements}</p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
