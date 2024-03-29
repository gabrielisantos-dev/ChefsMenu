import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import validator from 'validator';
import tomate from '../images/tomate.png';
import logo from '../images/logo.svg';
import '../index.css';
import { auth } from '../services/firebaseConfig';

function Login() {
  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  const recarregarAPagina = () => {
    window.location.reload();
  };

  const validateEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);

    if (validator.isEmail(value)) {
      setEmailError('');
      setEmailValid(false);
    } else {
      setEmailError('Digite um e-mail válido!');
      setEmailValid(true);
    }
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setPassword(
      value,
    );
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
            <button type="button" onClick={ recarregarAPagina }>
              Voltar para Login!
            </button>
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
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
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
          Login
        </h1>

        <div>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              data-testid="email-input"
              className="input-login"
              onChange={ (e) => validateEmail(e) }
            />
            <p
              className="text-red text-xs font-semibold italic"
            >
              {emailError}
            </p>

            <input
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              className="input-login my-2"
              onChange={ handleChange }
            />

            <button
              type="submit"
              data-testid="login-submit-btn"
              className="button-login bg-yellow"
              disabled={ emailValid || password.length <= numberPass }
              onClick={ handleLogin }
            >
              Enter
            </button>

            <Link
              className="button-register"
              to="/register"
            >
              Create your account
            </Link>
          </form>
        </div>
      </div>
    </main>

  );
}

export default Login;
