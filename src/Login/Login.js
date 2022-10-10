import React, { useState, useEffect } from 'react';
import { getUsers } from '../Services';

export default function Login() {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const [error, setError] = useState({
    name: '',
    password: '',
  });

  const [usersData, setUsersData] = useState('');
  useEffect(() => {
    getUsers()
      .then((userData) => userData.json())
      .then((userData) => {
        console.log(userData);
        setUsersData(userData.records);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let errKeys = Object.keys(user).filter((key) => {
      if (user[key] === '') {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert('Please fill all fields');
    } else {
      console.log(user, error);
      let verification =
        usersData &&
        usersData.filter((record, i) => {
          if (
            record.fields.username === user.name &&
            record.fields.password === user.password
          ) {
            return record;
          }
        });
      console.log(verification);
    }
  };

  const handleChange = (e) => {
    if (e.target.value === '') {
      setError({ ...error, [e.target.name]: `${e.target.name} is Required` });
    } else {
      setError({ ...error, [e.target.name]: '' });
    }

    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label for="name">User Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="error">{error && error.name}</div>
        </div>

        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="error">{error && error.password}</div>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
