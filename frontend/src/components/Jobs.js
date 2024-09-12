import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Jobs = ({ setBookmarkedJobs, bookmarkedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs`, 
        { params: { page } } // Add page parameter to API call
      );

      const data = response.data;
      console.log('API Response:', data); // Log the API response to inspect its structure

      // Check the structure of the response here and set jobs accordingly
      if (Array.isArray(data.jobs)) {
        setJobs(prevJobs => [...prevJobs, ...data.jobs]);
        // Check if there are more jobs to load
        if (data.jobs.length === 0) {
          setHasMore(false);
        }
      } else if (Array.isArray(data.results)) {
        // Handle if jobs are inside `results`
        setJobs(prevJobs => [...prevJobs, ...data.results]);
        if (data.results.length === 0) {
          setHasMore(false);
        }
      } else {
        setError('Invalid response structure');
      }

    } catch (err) {
      setError(`Failed to fetch jobs: ${err.message}`);
      console.error('Fetch error details:', err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight && hasMore
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  const handleBookmark = (job) => {
    setBookmarkedJobs(prevBookmarks => [...prevBookmarks, job]);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {jobs.length === 0 && !loading && !error && <p>No jobs available.</p>}
      <div>
        {jobs.map(job => (
          <div key={job.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{job.title || 'No title'}</h3>
            <p>{job.primary_details?.Place || 'No location provided'}</p>
            <p>{job.primary_details?.Salary || 'No salary info'}</p>
            <p>{job.contact_preference?.whatsapp_no || 'No contact info'}</p>
            <button onClick={() => handleBookmark(job)}>Bookmark</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
