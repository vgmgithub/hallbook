// SessionContext.js
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const initialUserSessionState = {
    logstatus: false,
    username: '',
    userData: '',
  };

    const [user, setUser] = useState(initialUserSessionState);
 
  const login = (logstatus,username,userdata) => {
    // Set user data in the session
   
    setUser({ ...user, logstatus: logstatus,username:username,userData:userdata });
  };

 

  const logout = () => {
      setUser(initialUserSessionState);
      
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

 
export function useSession() {
  return useContext(SessionContext);
}


////

const BookSessionContext = createContext();

export const BookingSessionProvider = ({ children }) => {
 
    const [bookingsession, setBookingSession] = useState('');
 

  const UnSetBook = () => {
      setBookingSession('');
      
  };

  return (
    <BookSessionContext.Provider value={{ bookingsession,setBookingSession, UnSetBook }}>
      {children}
    </BookSessionContext.Provider>
  );
};


export function useBookSession() {
  return useContext(BookSessionContext);
}