import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { restoreUser } from './store/session';

function App () {
  const user = useSelector(state => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <h1>Hello from App</h1>
      <Switch>
        <Route exact path='/'>
          This is the home page.
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          This is the signup page.
          <SignupFormPage />
        </Route>
        <Route path="/test">
          This is a test page.
        </Route>
      </Switch>
      <footer>
        The user is {user?.username}
      </footer>
    </div>
  );
}

export default App;
