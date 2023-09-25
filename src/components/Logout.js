import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    // Perform logout actions here (e.g., clear authentication token, reset user state, etc.)
    // You can also redirect the user to the login page after logout

    // Call the provided logout callback to inform the parent component
    onLogout();
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}

export default Logout;
