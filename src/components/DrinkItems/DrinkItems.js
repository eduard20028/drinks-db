import React from 'react';
import {Link} from 'react-router-dom';
import "./DrinkItems.css";

const DrinkItems = ({items, refresh, addToFavorite, pageTitle}) => {
   let title;
    if(pageTitle === 'favorite'&&items.length > 0){
        title = "Your Favorite";
    }
    else if(pageTitle === 'drink'&&items.length){
        title = "Random Drinks"
    }
    else title = "You can add your favorite in Random Drinks";
    return (
        <div className="drink-items">
                <h3 className="text-center">
                    {title}
                </h3>
                <div className="d-flex justify-content-center">
                <button type="button" className="refresh btn" onClick={refresh}><i id="icon" className="fas fa-redo"></i></button>
                </div>
                <div className="row justify-content-center">
                {
                    items.map((item)=>{
                        return (
                            <div id={item.idDrink} className="card col-md-4 id-drink" with="2px" key={item.idDrink}>
                                <img src={item.strDrinkThumb} className="card-img-top" alt="..."/>

                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <button type="button" onClick={addToFavorite} className="btn toggle-btn">
                                        <i className={item.favorite?"fa fa-star icon":"far fa-star icon"}></i>
                                    </button>
                                    <Link to={`/drinks/${item.idDrink}`} type="button" className="btn">
                                        <i className="fas fa-exclamation"></i>
                                    </Link>
                                </div>

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

export default DrinkItems;