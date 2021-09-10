import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from './LoginForm';

function Form() {
  return (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={SignupForm} />
        <Route exact path="/login" component={LoginForm}/>
        </Switch>
    </BrowserRouter>
  );
}

export default Form;
