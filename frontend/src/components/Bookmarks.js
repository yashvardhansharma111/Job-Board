import React from 'react';

const Bookmarks = ({ bookmarkedJobs }) => {
  return (
    <div>
      {bookmarkedJobs.length === 0 && <p>No jobs bookmarked yet.</p>}
      {bookmarkedJobs.map(job => (
        <div key={job.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
