import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css'

import LandingWindow from './components/LandingWindow';
import TodoList from './components/TodoList';

function App() {


  return (
    <div className="App">
      <Switch>
        <Route path="/landingscreen" exact={true} component={LandingWindow} /> 
        <Route path="./" exact={true} component={TodoList} /> 
      </Switch>
      {/* <LandingWindow />
      <TodoList /> */}
    </div>
  );
}

export default App;
