import { useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import { restoreUser } from './store/session';

function App () {
  const user = useSelector(state => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Hello from App</h1>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/test'>Test</NavLink>
      <Switch>
        <Route exact path='/'>
          This is the home page.
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/login">
          This is the home page.
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
