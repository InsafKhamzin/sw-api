import React, { Component } from 'react';

import Header from '../header';
import ItemDetails, { Record } from '../item-details/item-details';

import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ItemList from '../item-list';
import { PersonList, StarshipList, PlanetList, PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components';

import {SwapiServiceProvider} from '../swapi-service-context';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class App extends Component {

  state = {
    hasError: false
  };

  swapiService = new SwapiService();

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
        <SwapiServiceProvider value={this.swapiService} >
        <div>
          <Header />

          <PersonDetails itemId={11} />
          <PlanetDetails itemId={5} />
          <StarshipDetails itemId={9} />

          <PersonList />
          <StarshipList />
          <PlanetList />

        </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
