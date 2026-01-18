import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts API endpoint:', apiUrl);
        console.log('Fetched workouts:', results);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((w, i) => (
          <li key={i}>{w.name} - {w.description}</li>
        ))}
      </ul>
    </div>
  );
};
export default Workouts;
