import React, { useState, useEffect } from 'react';
import './style.css';
import LoginPage from './Login';
import { getUsers } from './Services';
export default function App() {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <LoginPage />
    </div>
  );
}
