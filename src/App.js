import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';

import Home from './components/home';
import EmployeeList from './components/employee-list';
import CreateEmployee from './components/create-employee';
import Login from './components/login';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <div className="nav-link">
                    <Link to="/">Home</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to="/employees">Employees</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to="/create">Create</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <AuthLink />
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <Redirect exact from="/" to="/home" />
            <PrivateRoute path="/employees">
              <EmployeeList />
            </PrivateRoute>
            <PrivateRoute path="/create">
              <CreateEmployee />
            </PrivateRoute>
            <PrivateRoute path="/edit/:id">
              <CreateEmployee />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*" render={() => "Oops! page not found."} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

const AuthLink = () => {
  let history = useHistory();

  if (localStorage.getItem('userDetails')) {
    let user = JSON.parse(localStorage.getItem('userDetails'));
    return (
      <div>
        <span style={{ paddingRight: 20 }}>Hello, {user.name}</span>
        <Link to="/login" onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}>Logout</Link>
      </div>
    );
  }

  return <Link to="/login">Login</Link>;
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('userDetails') ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
