import React, { useState, useEffect, useCallback } from 'react';

const Jobs = ({ setBookmarkedJobs, bookmarkedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    try {
      // Dummy data for jobs
      const dummyData = [
        {
          id: 631160,
          title: 'Telecallers wanted',
          primary_details: {
            Place: 'Ameerpet, Hyderabad',
            Salary: '₹12000 - ₹16000',
            Job_Type: 'ఆఫీస్ జాబ్ ',
            Experience: 'Any Experience',
            Qualification: 'Graduate'
          },
          contact_preference: {
            whatsapp_no: '8465809861'
          },
          // Add other properties as needed
        },
        {
          id: 631010,
          title: 'Wanted female secretary',
          primary_details: {
            Place: 'Kondapur, Hyderabad',
            Salary: '₹15000 - ₹25000',
            Job_Type: 'ఆఫీస్ జాబ్ ',
            Experience: '1-3 Years',
            Qualification: 'Graduate'
          },
          contact_preference: {
            whatsapp_no: '9052051923'
          },
          // Add other properties as needed
        }
      ];

      // Simulate a delay to mimic API call
      setTimeout(() => {
        setJobs(prevJobs => [...prevJobs, ...dummyData]);
        if (dummyData.length === 0) {
          setHasMore(false);
        }
        setLoading(false);
      }, 1000); // Adjust delay as needed

    } catch (err) {
      setError(`Failed to fetch jobs: ${err.message}`);
      console.error('Fetch error details:', err);
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
