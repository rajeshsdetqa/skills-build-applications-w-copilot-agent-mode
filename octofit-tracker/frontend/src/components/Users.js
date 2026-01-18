import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users API endpoint:', apiUrl);
        console.log('Fetched users:', results);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name} - {u.email} ({u.is_superhero ? 'Superhero' : 'User'})</li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
