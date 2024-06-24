// Index.js

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import App from './App'; // Adjust path as needed
import Login from './components/Auth/Login/LoginComponent'; // Adjust path as needed
import Register from './components/Auth/Register/RegisterComponent'; // Adjust path as needed
import { auth } from './server/firebase'; // Adjust path as needed
import { rootReducer } from './store/reducer'; // Adjust path as needed
import { setUser } from './store/actioncreator'; // Adjust path as needed

import "semantic-ui-css/semantic.min.css";

// Create the Redux store
const store = createStore(rootReducer);

const Index = ({ setUser, currentUser }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={currentUser ? <App /> : <Navigate to="/login" />} />
        </Routes>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
});

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

export default ConnectedIndex;
