import { useState, useEffect } from 'react';

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // do nothing
    console.log('this should trigger after first render');
  }, []);

  const submit = (event) => {
    event.preventDefault();
    console.log('This the log-in form submission.');
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
