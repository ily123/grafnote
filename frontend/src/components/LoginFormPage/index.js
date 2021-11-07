import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/session';

const LoginFormPage = () => {
  const sessionUser = useSelector(state => state.session);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(sessionUser);

  useEffect(() => {
    // maybe put front-end validators here TODO
  }, []);

  if (sessionUser) history.push('/');

  const submit = async (event) => {
    event.preventDefault();
    console.log('got to this line!!');
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
      <ul className="user-login-errors">
        {errors.map(errorMsg => <li key={errorMsg}>{errorMsg}</li>)}
      </ul>
    </div>
  );
};

export default LoginFormPage;
