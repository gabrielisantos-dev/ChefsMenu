import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import tomate from '../images/tomate.png';
import logo from '../images/logo.svg';
import '../index.css';
import { auth } from '../services/firebaseConfig';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };

  if (error) {
    return (
      <main className="flex flex-col items-center h-screen bg-img">

        <div className="flex flex-col items-center z-[1]">
          <div className="mt-14">
            <img src={ logo } alt="logo" className="w-[200px] md:w-[250px]" />
          </div>

          <div className="md:flex md:flex-start md:w-screen">
            <div className="my-1">
              <img src={ tomate } alt="logo" className="w-[458px] md:w-[600px]" />
            </div>
          </div>
        </div>

        <div className="login-container">
          <div>
            <p>
              Erro:
              {error.message}
            </p>
            <Link to="/">Sign in again</Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex flex-col items-center h-screen bg-img">

        <div className="flex flex-col items-center z-[1]">
          <div className="mt-14">
            <img src={ logo } alt="logo" className="w-[200px] md:w-[250px]" />
          </div>

          <div className="md:flex md:flex-start md:w-screen">
            <div className="my-1">
              <img src={ tomate } alt="logo" className="w-[458px] md:w-[600px]" />
            </div>
          </div>
        </div>

        <div className="login-container">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (user) {
    return (
      <main className="flex flex-col items-center h-screen bg-img">

        <div className="flex flex-col items-center z-[1]">
          <div className="mt-14">
            <img src={ logo } alt="logo" className="w-[200px] md:w-[250px]" />
          </div>

          <div className="md:flex md:flex-start md:w-screen">
            <div className="my-1">
              <img src={ tomate } alt="logo" className="w-[458px] md:w-[600px]" />
            </div>
          </div>
        </div>

        <div className="login-container">
          <p>
            User registered successfully!:
            <br />
            {user.user.email}
          </p>

          <Link to="/">Access your account here!</Link>
        </div>
      </main>
    );
  }

  const numberPass = 6;

  return (
    <main className="flex flex-col items-center h-screen bg-img">

      <div className="flex flex-col items-center z-[1]">
        <div className="mt-14">
          <img src={ logo } alt="logo" className="w-[200px] md:w-[250px]" />
        </div>

        <div className="md:flex md:flex-start md:w-screen">
          <div className="my-1">
            <img src={ tomate } alt="logo" className="w-[458px] md:w-[600px]" />
          </div>
        </div>
      </div>

      <div className="login-container">

        <h1 className="title-login">
          Create your account
        </h1>

        <form className="flex flex-col">
          <input
            type="email"
            placeholder="Enter your email address"
            className="input-login"
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="input-login my-2"
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button
            type="submit"
            className="button-login bg-yellow"
            disabled={ password.length <= numberPass }
            onClick={ handleRegister }
          >
            Register
          </button>
          <p>Do you already have an account?</p>
          <Link to="/">Access your account here</Link>
        </form>
      </div>
    </main>

  );
}

export default Register;
