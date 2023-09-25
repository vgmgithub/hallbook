// actions.js
export const setLoggedIn = (isLoggedIn) => {
    return {
      type: 'SET_LOGGED_IN',
      payload: isLoggedIn,
    };
  };
  