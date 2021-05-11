import React, { Component } from 'react';
import './css/App.css';
import './css/Products.css'
import Navigation from './Components/Navigation';
import Products from './Components/Products';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import ProductsDetails from './Components/ProductsDetails';


export default class App extends Component {
  render() {
    return (
      <div className="App"> 
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/products-details/:id" component={ProductsDetails} />
        </Switch>
      </Router>
      </div>
    )
  }
}
