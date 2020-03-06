import React, {Component} from 'react';
import Spinner from '../Spinner';
import app from "../../base";
import DrinkItems from './DrinkItems';
import {addToFavorite} from '../../utils/utils';

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
    
    refresh = () => {
        this.setState({loading:true})
        this.loadItems();
    }
    render() {
        const {loading,items} = this.state;
        const {pageTitle} = this.props;
        if(loading){
            return (
                <div className="d-flex justify-content-center"><Spinner/></div>
            )
        }
        return (
            <DrinkItems items={items} refresh={this.refresh} addToFavorite={addToFavorite} pageTitle={pageTitle}/>
        );
    }
}

export default DrinkItemsContainer;
