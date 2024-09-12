import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav>
      <Link to="/" onClick={() => setActiveTab('jobs')} className={activeTab === 'jobs' ? 'active' : ''}>Jobs</Link>
      <Link to="/bookmarks" onClick={() => setActiveTab('bookmarks')} className={activeTab === 'bookmarks' ? 'active' : ''}>Bookmarks</Link>
    </nav>
  );
};

export default BottomNav;
