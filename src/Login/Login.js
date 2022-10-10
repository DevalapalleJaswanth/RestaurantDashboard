import React, { useState, useEffect } from 'react';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <form>
        <input type="text" />
        <input type="password" />
      </form>
    </div>
  );
}
