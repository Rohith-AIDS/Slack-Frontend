import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './components/Auth/Register/RegisterComponent';
import Login from './components/Auth/Login/LoginComponent';
import { auth } from './server/firebase'; // Adjust the path as needed
import { rootReducer } from './store/reducer'; // Correct import of rootReducer
import { setUser } from './store/actioncreator'; // Adjust the path as needed

import "semantic-ui-css/semantic.min.css";

// Create the Redux store
const store = createStore(rootReducer);

const Index = ({ setUser, currentUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        setUser(null);
        navigate("/register");
      }
      setLoading(false); // Set loading to false after the authentication state is checked
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication state
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={currentUser ? <App /> : <Navigate to="/register" />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

// Connect Index component to Redux store
const ConnectedIndex = connect(mapStateToProps, mapDispatchToProps)(Index);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ConnectedIndex />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
