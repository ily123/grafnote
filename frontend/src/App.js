import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import LandingPage from './components/HomePage';
// import Footer from './components/Footer';
import NotePage from './components/NotePage';
import { restoreUser } from './store/session';

function App () {
  const user = useSelector(state => state.session);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <div className="main-container">
      <Navigation />
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          This is the signup page.
          <SignupFormPage />
        </Route>
        <Route path="/test">
          <NotePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
