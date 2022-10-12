import React, { useState, useEffect, useContext } from 'react';
import { getUsers } from '../Services';
import { useNavigate } from 'react-router-dom';
import { MapContext } from '../Store';
import { CgProfile, CgKey } from 'react-icons/cg';
export default function Login(props) {
  const [maps, setMaps] = useContext(MapContext);
  const navigate = useNavigate();
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
      if (verification.length == 1) {
        setMaps({
          user: user.name,
          addedMaps: maps.addedMaps,
          bookMarkedMaps: maps.bookMarkedMaps,
        });

        navigate(`/HomePage/${user.name}`);
      } else {
        alert('Entered credentials were wrong');
      }
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
    <div className="display-flex" style={{ height: '100%', width: '100%' }}>
      <div className="stylepage display-flex" style={{ marginRight: '30px' }}>
        Restaurant <br /> Maps
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="login-box">
        <div className="display-flex">
          <div className="input-box display-center icon">
            <label htmlFor="name">
              <CgProfile />
            </label>
          </div>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={(e) => {
              handleChange(e);
            }}
            className="input"
          />
          <div className="error">{error && error.name}</div>
        </div>
        <br />
        <div className="display-flex ">
          <div className="input-box display-center icon">
            <label htmlFor="password">
              <CgKey />
            </label>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              handleChange(e);
            }}
            className="input"
          />
          <div className="error">{error && error.password}</div>
        </div>
        <br />
        <div>
          <button type="submit" className="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
