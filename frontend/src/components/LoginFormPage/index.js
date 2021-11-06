import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/session';

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // maybe put validators here TODO
  }, []);

  const submit = (event) => {
    event.preventDefault();
    dispatch(loginUser(credential, password));
  };

  return (
    <div className="user-login-form">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter e-mail or username"
          required
          value={credential}
          onChange={(e) => setCredential(e.target.value)} />
        <input
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
    </div>

  );
};

export default LoginFormPage;
