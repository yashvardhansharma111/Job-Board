import React, { useState, useCallback } from 'react';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';

const App = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('jobs')}>Jobs</button>
        <button onClick={() => setActiveTab('bookmarks')}>Bookmarks</button>
      </nav>
      <main>
        {activeTab === 'jobs' && <Jobs setBookmarkedJobs={setBookmarkedJobs} bookmarkedJobs={bookmarkedJobs} />}
        {activeTab === 'bookmarks' && <Bookmarks bookmarkedJobs={bookmarkedJobs} />}
      </main>
    </div>
  );
};

export default App;
