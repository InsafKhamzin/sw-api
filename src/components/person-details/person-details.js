import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    personLoading: true
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (personId) {
      this.setState({
        personLoading: true
      });
      this.swapiService.getPerson(personId)
        .then((person) => {
          this.setState({
            person,
            personLoading: false
          });
        });
    }
  }

  render() {
    
    if (!this.state.person) {
      return <span>Select a person from the list</span>;
    }

    const { person, personLoading } = this.state;
    const content = personLoading ? <Spinner /> : <PersonView person={person}/>
    return (
      <div className="person-details card">
        {content}
      </div>
    )
  }
}

const PersonView = ({person}) => {
  return (
    <React.Fragment>
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
        alt="character" />

      <div className="card-body">
        <h4>{person.name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{person.gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{person.birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{person.eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
