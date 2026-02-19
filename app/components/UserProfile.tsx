// Bug-riddled component for testing
import React, { useState, useEffect } from 'react'

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserProfile = () => {
  const [user, setUser] = useState<User>(null); // Bug: wrong type, should be User | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Bug: missing dependency array
  useEffect(() => {
    fetchUser();
  }); // Will cause infinite re-renders

  const fetchUser = async () => {
    setLoading(true);
    
    try {
      // Bug: hardcoded URL that doesn't exist
      const response = await fetch('/api/user/123');
      
      // Bug: not checking if response is ok
      const userData = await response.json();
      
      setUser(userData);
    } catch (err) {
      // Bug: setting error object instead of message
      setError(err);
    } finally {
      // Bug: not setting loading to false in all cases
      if (user) {
        setLoading(false);
      }
    }
  };

  // Bug: not handling loading state properly
  if (loading) {
    <div>Loading...</div>; // Missing return statement
  }

  // Bug: accessing properties without null check
  return (
    <div className=\"user-profile\">
      <h2>User Profile</h2>
      <div>
        <p>Name: {user.name}</p> {/* Will throw error if user is null */}
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
      </div>
      
      {/* Bug: error might not be a string */}
      {error && <div className=\"error\">{error.message || error}</div>}
      
      {/* Bug: button with no onClick handler */}
      <button>Refresh User Data</button>
      
      {/* Bug: map without key prop */}
      <ul>
        {user && user.hobbies && user.hobbies.map(hobby => ( // Bug: hobbies not defined in interface
          <li>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;