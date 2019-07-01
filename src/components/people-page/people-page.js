import React, { Component } from 'react';
import './people-page.css';
import PersonDetails from '../person-details';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

export default class PeoplePage extends Component {

    state = {
        selectedPerson: 3,
        hasError: false
    };

    swapiService = new SwapiService();

    componentDidCatch(){
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

        if(this.state.hasError){
            return <ErrorIndicator/>
        }

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected={this.onPersonSelected}
                                getData={this.swapiService.getAllPeople}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        );
    }
}