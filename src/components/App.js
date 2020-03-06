import React, { Component } from 'react';
import Header from './Header/';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import { AuthProvider, PrivateRoute } from './Firebase';
import {DrinkList, FavoriteList, ItemPage} from './Pages';

export default class App extends Component {
  render(){
    return (
      <AuthProvider>
        <Router>
        <Header/>
          <div className="container">
            <div className="app">
                <Route path="/" component={Home} exact/>
                <PrivateRoute path="/drinks" component={DrinkList} exact/>
                <PrivateRoute path="/favorite" component={FavoriteList} exact/>
                <Route path="/drinks/:id" render={({match}) => {
                        const {id} = match.params;
                        return <ItemPage itemId={id}/>
                    }} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/sign-up" component={SignUp} exact/>
                <Redirect to='/'/>
            </div>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

