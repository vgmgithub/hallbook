import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Registerform from './components/Registerform';
import { BookingSessionProvider, SessionProvider } from './components/SessionContext';
import NotFound from './components/NotFound';
import Venueform from './components/Venueform';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import MyBookings from './components/MyBookings';
import VenueList from './components/VenueList';
import UserList from './components/UserList';
import BookingList from './components/BookingList';
// import MyComponent from './components/MyComponent';
import VenueEdit from './components/VenueEdit';
import BookingPage from './components/BookingPage';

function App() {
  return (
    
    <SessionProvider>
      <BookingSessionProvider>
        <Router>
          <div className="App">
          <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/bat" element={<MyComponent/>} /> */}
              <Route path="/register" element={<Registerform />} />
              <Route path="/venue-reg" element={<Venueform/>} />
              <Route path="/venue/edit/:id" element={<VenueEdit/>} />
              <Route path="/book/:id" element={<BookingPage/>} />
              <Route path="/about-us" element={<About/>} />
              <Route path="/contact-us" element={<Contact/>} />
              <Route path="/services" element={<Services/>} />
              <Route path="/bookings" element={<BookingList/>} />
              <Route path="/my-bookings/:id" element={<MyBookings/>} />
              <Route path="/venue-info" element={<VenueList/>} />
              <Route path="/user-info" element={<UserList/>} />
              <Route path="*" element={<NotFound/>} /> 
          </Routes>
          </div>
        </Router>
      </BookingSessionProvider>
    </SessionProvider>
  );
}

export default App;


