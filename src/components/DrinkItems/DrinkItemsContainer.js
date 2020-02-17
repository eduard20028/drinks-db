import React, {Component} from 'react';
import Spinner from '../Spinner';
import app from "../../base";
import DrinkItems from './DrinkItems';

export class DrinkItemsContainer extends Component {
    state = { 
        items:[],
        user: false,
        loading:true
    }
    componentDidMount(){
        this.loadItems();
    }
    loadItems(){
        const {getData} = this.props;
        
        getData()
            .then((items) => {
                this.setState({
                    items: items,
                    user: app.auth().currentUser,
                    loading: false
                })
            }) 
    }
    addToFavorite = (e) => {
        const {user} = this.state;
        const targetDrink = e.target.closest("div");
        const Drink = app.database().ref('users/user_' + user.uid + '/favorite/drink_' + targetDrink.id);
        Drink.once('value', (snapshot) => {
                if(snapshot.val()){
                    Drink.set({});
                    this.toggleClass(targetDrink);
                }
                else if(!snapshot.val()){
                    Drink.set(targetDrink.id);
                    this.toggleClass(targetDrink);
                }
          });
    }
    toggleClass = (parentNode) => {
        const classes = parentNode.querySelector('#icon').classList;
        if(classes.contains("far")){
            classes.remove('far');
            classes.add('fa');
        }
        else if(classes.contains("fa")){
            classes.remove('fa');
            classes.add('far');
        }
    }
    refresh = () => {
        this.setState({loading:true})
        this.loadItems();
    }
    render() {
        const {loading,items} = this.state;
        if(loading){
            return (
                <div className="d-flex justify-content-center"><Spinner/></div>
            )
        }
        return (
            <DrinkItems items={items} refresh={this.refresh} addToFavorite={this.addToFavorite}/>
        );
    }
}

export default DrinkItemsContainer;
