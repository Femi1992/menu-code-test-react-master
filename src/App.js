import React from 'react';
import { render } from 'react-dom';
import Menu from "./components/Menu";
import Basket from './components/Basket';

class App extends React.Component {

    state = {
        basket: [],
        waiters: ["Pierre", "Thanos", "Thor", "Iron Man"],
        servingWaiter: "",
        orderTotal: 0,
        dinerOne: [],
        dinerTwo: [],
        dinerOneHasMain: false,
        dinerTwoHasMain: false,
        cheesecakeOrdered: false,
        basketHidden: true,
        currDiner: 1
    };

    componentDidMount() {
        let randomIndex = Math.floor(Math.random()*this.state.waiters.length);
        fetch("menu-data.json")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    starters: result["starters"],
                    mains: result["mains"],
                    desserts: result["desserts"],
                    servingWaiter: this.state.waiters[randomIndex],
                    startersLs: result["starters"].map(x => (x.name)),
                    mainsLs: result["mains"].map(x => (x.name)),
                    dessertsLs:  result["desserts"].map(x => (x.name))
                })
        });
    }

    addMenuItemBasket = (item, price) => {
        let currentBasket = this.state.basket
        let currentTotal = this.state.orderTotal

        if(!this.checkWaiter(item) && !this.checkCourseSelection(item) && this.canOrderCheesecake){
            currentBasket.push(item)
            let newTotal = currentTotal += price
            this.setState({
                basket: currentBasket, 
                orderTotal: newTotal,
                basketHidden: false
            })
            this.addToDinerOrder(item)
        }
        this.canContinueOrder()
    }

    continueDinerOrder = () => {
        //TODO - logic here not functioniong properly as per rules
        let currentDiner = this.state.currDiner
        let continueOrder = confirm("Would you like to order more for Diner" + currentDiner)
        if(continueOrder && currentDiner == 1 && this.state.dinerOne.length == 3){
            alert("Diner", currentDiner, "has ordered the maximum courses")
            this.setState({
                currDiner : 2
            })
        } else if(continueOrder && this.state.dinerTwo.length == 3){
            alert("Diner", currentDiner, "has ordered the maximum courses")
        } else if(!continueOrder && this.state.dinerOne.length < 2 || !continueOrder && this.state.dinerTwo.length < 2) {
            alert("Each Diner must select at least two courses, please chooose another")
        } else if(!continueOrder && this.state.dinerOne.length == 2 || !continueOrder && this.state.dinerTwo.length == 2) {
           this.checkCourseMain()
        } 
    }

    canContinueOrder = () => {
        if(this.state.currDiner == 1 && this.state.dinerOne.length < 3) {
            this.continueDinerOrder()
        } else if (this.state.dinerTwo.length < 3) {
            this.continueDinerOrder()
        } else {
            alert("You have reached the maximum orders for this diner!")
        }
    }

    checkCourseSelection = (item) => {
        let dinerOneCourses = this.state.dinerOne;
        let dinerTwoCourses = this.state.dinerTwo;

        if (this.state.currDiner == 1 && dinerOneCourses.indexOf(item) != -1) {
            alert("This course has already been selected for this diner, choose another please!")
            return true
        } else if (dinerTwoCourses.indexOf(item) != -1) {
            alert("This course has already been selected for this diner, choose another please!")
            return true
        } else {
            this.addToDinerOrder(item);
            return false
        }
    }

    checkCourseMain = () => {
        let mains = this.state.mainsLs ? this.state.mainsLs : null;
        if(this.state.currDiner == 1){
            if(!this.state.dinerOne.some(item => mains.includes(item))){
                alert("You have not selected a main meal for Diner One!")
                return true
            }
        } else if (this.state.currDiner == 2) {
            if(!this.state.dinerTwo.some(item => mains.includes(item))){
                alert("You have not selected a main meal for Diner Two!")
                return true
            }
        } else {
            return false
        }
    }

    canOrderCheesecake = (item) => {
        if(item == "Cheesecake" && !this.state.cheesecakeOrdered){
            this.setState({
                cheesecakeOrdered: true
            })
            return true
        } else {
            alert("Sorry, no cheesecake left")
            return false
        }
    }

    checkWaiter = (item) => {
        let dinerOne = this.state.dinerOne
        let dinerTwo = this.state.dinerTwo
        let PierreLs = ["Salmon fillet", "Prawn cocktail"]
        if(this.state.servingWaiter == "Pierre" && PierreLs.includes(item)){
            if(dinerOne.includes("Salmon fillet") || (dinerOne.includes("Prawn cocktail")) || (dinerTwo.includes("Prawn cocktail")) || (dinerTwo.includes("Prawn cocktail"))) {
                alert("Pierre does not like salmon mixed with Prawn cocktail")
                return true
            } else {
                return false
            }
        }
    }

    addToDinerOrder = (item) => {
        if (this.state.currDiner == 1){
            let currOrder = this.state.dinerOne;
            currOrder.push(item)
            this.setState({
                dinerOne: currOrder
            })
        } else {
            let currOrder = this.state.dinerTwo;
            currOrder.push(item)
            this.setState({
                dinerTwo: currOrder
            })
        }
    }

    render() {
        return (
            <div> 
                <h1>OpenTable Restaurant</h1>
                <Menu   
                    starters={this.state.starters} 
                    mains={this.state.mains} 
                    desserts={this.state.desserts}
                    addBasket={this.addMenuItemBasket}
                />    

                {this.state.basketHidden ? null : <Basket isHidden={true}
                    total={this.state.orderTotal}
                    Basket={this.state.basket}
                />}
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));
