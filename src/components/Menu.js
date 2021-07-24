import React, { Component} from 'react';
import MenuItem from '../components/MenuItem';

class Menu extends Component {

   render() {
    return (      
        <div>
            <h2>Starters</h2>
                <div>
                    {
                        this.props.starters ? this.props.starters.map(c => ( <MenuItem key={c.id} item={c.name} price={c.price} addBasket={this.props.addBasket}/> )) : null
                    }
                </div>
                
            <h2>Mains</h2>
                <div>
                    {
                        this.props.mains ? this.props.mains.map(c => ( <MenuItem key={c.id} item={c.name} price={c.price} addBasket={this.props.addBasket}/> )) : null
                    }
                </div>
            <h2>Desserts</h2>
                <div>
                    {
                        this.props.desserts ? this.props.desserts.map(c => ( <MenuItem key={c.id} item={c.name} price={c.price} addBasket={this.props.addBasket}/> )) : null
                    }
                </div>
        </div>
    );
  }
}
export default Menu;
