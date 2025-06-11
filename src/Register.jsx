// src/Register.jsx
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
      <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
