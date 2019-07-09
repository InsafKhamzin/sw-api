import React, { Component } from 'react';

import Header from '../header';

import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorBoundry from '../error-boundry/error-boundry';
import RandomPlanet from '../random-planet'
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService()
  };


  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    };

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <div>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />

            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
