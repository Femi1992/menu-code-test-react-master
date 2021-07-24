import React, { Component } from 'react';


class MenuItem extends Component {

    render () {
        return(
            <div>
                <button className={"menu-item btn btn-primary btn-lg btn-block"}
                        type="button" 
                        data-attribute={this.props.item}
                        onClick={() => this.props.addBasket(this.props.item, this.props.price)}
                        >{this.props.item}  £{this.props.price}
                </button>
            </div>
            
        );
    }
}

export default MenuItem;