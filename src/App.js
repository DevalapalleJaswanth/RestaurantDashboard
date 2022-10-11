import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import LoginPage from './Login';
import { getUsers } from './Services';
import HomePage from './Home';
import { MapProvider, MapContext } from './Store';
import BookMarkPage from './BookMark';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
export default function App() {
  const [maps, setMaps] = useContext(MapContext);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path={`/${maps.user}/HomePage`} element={<HomePage />} />
          <Route
            path={`/${maps.user}/BookMarkPage`}
            element={<BookMarkPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}
