import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home.jsx'
import LoginSite from './components/Login.jsx'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Manage Your Password Here</h1>
          </header>
          <Switch>
            <Route exact path ="/" component = {Home}/>
            <Route exact path ="/login" component = {LoginSite}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
