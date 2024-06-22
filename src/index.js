import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate, setUser]);

  console.log(currentUser); // Assuming you want to log the currentUser state

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
