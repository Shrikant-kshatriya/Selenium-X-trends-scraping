import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [trends, setTrends] = useState([]);
  const [viewMode, setViewMode] = useState(''); 
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 180000, 
  });

  const fetchTrends = async (endpoint, mode) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(endpoint);
      setViewMode(mode);
      setTrends(response.data || []);
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentTrends = () => {
    fetchTrends('/trend', 'current');
  };

  const fetchAllTrends = () => {
    fetchTrends('/all-trends', 'all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white flex flex-col items-center">
      <header className="w-full py-6 bg-purple-800 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Twitter Trends</h1>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <div className="text-center mb-6 space-x-4">
          <button
            onClick={fetchCurrentTrends}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-all"
            disabled={loading}
          >
            {loading && viewMode === 'current' ? 'Loading...' : 'Show Current Trends'}
          </button>
          <button
            onClick={fetchAllTrends}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-all"
            disabled={loading}
          >
            {loading && viewMode === 'all' ? 'Loading...' : 'Show All Trends'}
          </button>
        </div>
        {viewMode === 'current' && (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <p className="text-lg font-bold mb-4">
              These are the most happening topics as on{' '}
              {new Date(trends.timestamp).toLocaleString()}:
            </p>
            <ul className="mb-4 list-disc list-inside">
              {trends.trends.map((trend, index) => (
                <li key={index}>
                  <strong>Trend {index + 1}:</strong> {trend || 'N/A'}
                </li>
              ))}
            </ul>
            <p className="mb-4">
              The IP address used for this query was <strong>{trends.ip}</strong>.
            </p>

            <p className='font-semibold'>Here’s a JSON extract of this record from the MongoDB:</p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(trends, null, 2)}
            </pre>
          </div>
        )}
        {viewMode === 'all' && trends.length > 0 && (
          <table className="table-auto w-full bg-white text-black rounded-lg shadow-lg text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Run #</th>
                <th className="px-4 py-2">Trends</th>
                <th className="px-4 py-2">IP Address</th>
                <th className="px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {trends.map((trend, index) => (
                <tr key={trend._id || index} className="border-t">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">
                    {trend.trends.join(', ') || 'N/A'}
                  </td>
                  <td className="px-4 py-2">{trend.ip || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {new Date(trend.timestamp).toLocaleString() || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {trends.length === 0 && !loading && (
          <p className="text-center text-lg font-medium">
            No data to display. Click a button above.
          </p>
        )}
      </main>
      <footer className="py-4 bg-purple-800 text-center text-sm w-full">
        Made with ❤️ for Twitter Trends
      </footer>
    </div>
  );
};

export default App;
