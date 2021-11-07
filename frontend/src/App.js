import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';

function App () {
  const user = useSelector(state => state.session);
  return (
    <div>
      <h1>Hello from App</h1>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/login">
          This is the home page.
        </Route>
      </Switch>
      <footer>
        The user is {user?.username}
      </footer>
    </div>
  );
}

export default App;
