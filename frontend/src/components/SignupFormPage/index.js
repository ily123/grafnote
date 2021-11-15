import './SignupFormPage.css';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/session';

function SignupFormPage () {
  const sessionUser = useSelector(state => state.session);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);// backend errors
  const [valid, setValid] = useState({
    email: false,
    username: false,
    password: false,
    passwordMatch: false
  });

  useEffect(() => {
    setValid(state => ({ ...state, email: email.includes('@') }));
    setValid(state => ({ ...state, username: username.length >= 4 }));
    setValid(state => ({ ...state, password: password.length >= 6 }));
    setValid(state => ({
      ...state,
      passwordMatch: password === confirmPassword && state.password
    }));
  }, [email, username, password, confirmPassword]);

  if (sessionUser) {
    return (
      <Redirect to="/notes" />
    );
  }

  const submit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(signupUser(email, username, password));
    } catch (response) {
      const { errors } = await response.json();
      setErrors(errors);
    }
  };

  const check = (input) => input ? 'input valid' : 'input invalid';
  return (
    <div className="user-signup-form">
      <div className="signup-validation">
        <ul>
          <li className={check(valid.email)}>Enter valid email</li>
          <li className={check(valid.username)}>Enter user name with at least 4 characters</li>
          <li className={check(valid.password)}>Password has at least 6 characters</li>
          <li className={check(valid.passwordMatch)}>Passwords must match</li>
        </ul>
      </div>
      <form onSubmit={submit}>
        <label> Email
          <input
            type="email"
            value={email}
            placeholder="Enter e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label> Username
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label> Password
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label> Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul className="user-signup-errors">
        {errors?.map(errorMsg => <li key={errorMsg}>{errorMsg}</li>)}
      </ul>
    </div>
  );
};

export default SignupFormPage;
