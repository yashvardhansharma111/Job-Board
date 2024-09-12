import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push(job);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.phone}</p>
      <button onClick={handleBookmark}>Bookmark</button>
      <Link to={`/job/${job.id}`}>View Details</Link>
    </div>
  );
};

export default JobCard;
