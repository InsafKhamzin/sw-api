import React, { Component } from 'react';
import './people-page.css';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class PeoplePage extends Component {

    state = {
        selectedPerson: 3,
        hasError: false
    };

    swapiService = new SwapiService();

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>

                {(i) => (
                    `${i.name}, (${i.birthYear})`
                )}

            </ItemList>
        );

        const itemDetails = (<ItemDetails itemId={this.state.selectedPerson} />);

        return (
            <ErrorBoundry>
                <Row left={itemList} right={itemDetails} />
            </ErrorBoundry>
        );
    }
}