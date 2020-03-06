import React, { Component } from 'react';
import { withDrinkService } from '../HOC';
import { addToFavorite } from '../../utils/utils';
import "./ItemPage.css";
import Spinner from '../Spinner';

class ItemPage extends Component {
    state = { 
        item: [],
        loading: true
     }

    componentDidMount(){
        this.loadItem();
    }

    loadItem(){
        const {getDrink, itemId} = this.props;
        getDrink(itemId)
        .then((item) => {
            this.setState({
                item,
                loading: false
            })
        })
    }

    createDescriptionDiv = () => {
        const {item} = this.state;
        let itemKeys = Object.keys(item);
        let div = [];

        itemKeys.forEach((cur, i) => {
            if(cur.match('strIngredient')&&item[cur]){
                div.push(<dt className="col-sm-4" key={cur}>{item[cur]}</dt>);
                div.push(<dd className="col-sm-8" key={i}>{item[itemKeys[i+15]]||"To your taste"}</dd>)
            }
        });
  
        return div;
    }

    render() {
        const {item, loading} = this.state;
        console.log(item.favorite);

        if(loading){
            return (
                <div className="d-flex justify-content-center"><Spinner/></div>
            )
        }

        return (
            <div id={item.idDrink} className="drink-page id-drink">

                <div className="row">
                    <div className="col-md-6 drink-poster d-flex align-items-center">
                        <h2>{item.strDrink}</h2>
                        <div className="poster-cont">
                        <button type="button" onClick={addToFavorite} className="btn toggle-btn">
                            <i className={item.favorite?"fa fa-star icon":"far fa-star icon"}></i>
                        </button>
                            <img src={item.strDrinkThumb} className="poster-img rounded" alt=""/>
                        </div>
                    </div>

                    <div className="col-md-6 drink-info">
                        <dl className="row">

                            <dt className="col-sm-3">Ingredients</dt>
                            <dd className="col-sm-9">
                                <dl className="row">
                                    {this.createDescriptionDiv()}
                                </dl>
                            </dd>

                            <dt className="col-md-3">Instruction</dt>
                            <dd className="col-md-9">{item.strInstructions}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (drinkService) => {
    return {
        getDrink: drinkService.getDrinkById,
    }
}
export default withDrinkService(mapMethodsToProps)(ItemPage);