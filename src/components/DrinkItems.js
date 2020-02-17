import React, {Component} from 'react';
import Spinner from './Spinner';
import app from "../base";

export class DrinkItems extends Component {
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
            <div className="drink-items">
                <h3 className="text-center">
                {!items.length&&"You can add your favorite in Random Drinks"}
                {window.location.href.includes('drinks')&&"Random drinks"}
                {window.location.href.includes('profile')&&items.length > 0&&"Your Favorite"}
                </h3>
                <div className="d-flex justify-content-center">
                {window.location.href.includes('drinks')&&
                <button type="button" className="refresh btn btn-danger" onClick={this.refresh}><i id="icon" className="fas fa-redo"></i></button>}
                </div>
                <div className="row justify-content-center">
                {
                    items.map((item)=>{
                        return (
                            <div id={item.idDrink} className="card col-md-4" with="2px" key={item.idDrink}>
                                <img src={item.strDrinkThumb} className="card-img-top" alt="..."/>
                                <button type="button" onClick={this.addToFavorite} className="btn btn-danger btn-sm">
                                    {!item.favorite&&"Add to Favorite"}
                                    {item.favorite&&"Delete from Favorite"}
                                    <i id="icon" className={item.favorite?"fa fa-star":"far fa-star"}></i>
                                </button>
                                <div className="card-body">
                                    <h5 className="card-title">{item.strDrink}</h5>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}

export default DrinkItems;
