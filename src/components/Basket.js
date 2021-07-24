import React, { Component} from 'react';

class Basket extends Component {

    render() {
        return (
            <div>
                <h3>Basket</h3>
                <ul class="basket-items">
                    {this.props.Basket ? this.props.Basket.map( c => (<li class="list-group-item">{c}</li>)) : null}
                </ul>
                <h4>Total: £{this.props.total ? this.props.total : 0}</h4>
            </div>
        );
    }
}

export default Basket;