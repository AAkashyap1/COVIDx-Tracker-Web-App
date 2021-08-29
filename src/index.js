import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import Landing from './pages/landing'
import reportWebVitals from './reportWebVitals';
import SignInRoute from './routes/SignInRoute'
import PrivateRoute from './routes/PrivateRoute'
import SignIn from './pages/sign-in'
import Profile from './pages/profile'
import Update from './pages/update'
import Symptoms from './pages/symptoms'
import Screening from './pages/screening'
import Vaccinations from './pages/vaccinations'
import Cases from './pages/cases'
import Testing from './pages/testing'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <SignInRoute path="/sign-in" component={SignIn} />
                    <SignInRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/update" component={Update} />
                    <PrivateRoute path="/testing" component={Testing} />
                    <PrivateRoute path="/vaccinations" component={Vaccinations} />
                    <PrivateRoute path="/cases" component={Cases} />
                    <PrivateRoute path="/symptoms" component={Symptoms} />
                    <PrivateRoute path="/screening" component={Screening} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();