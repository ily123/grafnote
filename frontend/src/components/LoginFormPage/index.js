import './LoginForm.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/session';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return (
      <Redirect to="/" />
    );
  }

  const submit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(credential, password));
    } catch (response) { // the error object is the response
      const { errors } = await response.json();
      setErrors(errors);
    }
  };

  return (
    <div className="user-login-form">
      <form onSubmit={submit}>
        <label>
          Username or email
          <input
            type="text"
            placeholder="Enter e-mail or username"
            required
            value={credential}
            onChange={(e) => setCredential(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log In</button>
      </form>
      <ul className="user-login-errors">
        {errors.map(errorMsg => <li key={errorMsg}>{errorMsg}</li>)}
      </ul>
    </div>
  );
};

export default LoginFormPage;
