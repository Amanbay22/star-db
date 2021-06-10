import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import {PeoplePage, PlanetPage, StarshipPage} from '../pages';
import {SwapiServiceProvider} from '../swapi-service-context';


import './app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';
export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

  
  
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header />
              <RandomPlanet />      
              <Route path="/" render={()=><h2>Welcome to StarDB</h2>} exact/>      
              <Route path="/people" render={()=><h2>People :</h2>} exact/>        
              <Route path="/people/:id?" component={PeoplePage}/>

              <Route path="/planets" component={PlanetPage}/>

              <Route path="/starships" exact component={StarshipPage}/>

              <Route path="/starships/:id" exact
               render={({match})=>{
                 const {id} = match.params;
                 return <StarshipDetails itemId={id}/>
               }} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
