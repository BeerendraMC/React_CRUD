import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import './index.css';

import App from './App';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';

//using react-router-dom
const routing = (
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
                        </li><li className="nav-item">
                            <div className="nav-link">
                                <Link to="/create">Create</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <Route exact path="/" component={App} />
            <Route path="/employees" component={EmployeeList} />
            <Route path="/create" component={CreateEmployee} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
