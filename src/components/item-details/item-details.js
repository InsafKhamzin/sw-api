import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

const Record = ({ item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}: </span>
      <span>{item[field]}</span>
    </li>
  );
};

export {
 Record
};


export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    itemLoading: true,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (itemId) {
      this.setState({
        itemLoading: true
      });
      getData(itemId)
        .then((item) => {
          this.setState({
            item,
            itemLoading: false,
            image: getImageUrl(item)
          });
        });
    }
  }

  render() {

    if (!this.state.item) {
      return <span>Select a item from the list</span>;
    }

    const { item, itemLoading, image } = this.state;
    const records = React.Children.map(this.props.children, (child)=>{
      return React.cloneElement(child, { item });
    });

    const content = itemLoading ? <Spinner /> : <ItemView item={item} image={image} records={records} />
    return (
      <div className="item-details card">
        {content}
      </div>
    )
  }
}

const ItemView = ({ item, image, records }) => {
  return (
    <React.Fragment>
      <img className="item-image"
        src={image}
        alt="character" />

      <div className="card-body">
        <h4>{item.name}</h4>
        <ul className="list-group list-group-flush">
          {records}
        </ul>
      </div>
    </React.Fragment>
  );
}
