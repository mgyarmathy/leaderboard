import React from 'react';

import { API_URL } from 'config';
import LeaderboardTable from 'components/leaderboard/LeaderboardTable';

function App() {
  return (
    <div>
      <main className="my-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold my-2">Leaderboard</h1>
            <div className="text-sm">
              Created By <a className="text-blue-500 hover:text-blue-800" href="https://michael.gyarmathy.me">Michael Gyarmathy</a>
            </div>
            <div className="text-sm">
              <a className="text-blue-500 hover:text-blue-800" href="https://github.com/mgyarmathy/leaderboard">GitHub Repo</a> &middot; <a className="text-blue-500 hover:text-blue-800" href={`${API_URL}/docs`}> API Docs</a>
            </div>
            <hr className="w-1/3 my-4"/>
          </div>
          <div className="flex justify-center">
            <LeaderboardTable/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
