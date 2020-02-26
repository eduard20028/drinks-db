import React from 'react';

const DrinkItems = ({items, refresh, addToFavorite, page}) => {
   let title;
    if(page === 'favorite'&&items.length > 0){
        title = "Your Favorite";
    }
    else if(page === 'drink'&&items.length){
        title = "Random Drinks"
    }
    else title = "You can add your favorite in Random Drinks";

    return (
        <div className="drink-items">
                <h3 className="text-center">
                    {title}
                </h3>
                <div className="d-flex justify-content-center">
                <button type="button" className="refresh btn btn-danger" onClick={refresh}><i id="icon" className="fas fa-redo"></i></button>
                </div>
                <div className="row justify-content-center">
                {
                    items.map((item)=>{
                        return (
                            <div id={item.idDrink} className="card col-md-4" with="2px" key={item.idDrink}>
                                <img src={item.strDrinkThumb} className="card-img-top" alt="..."/>
                                <button type="button" onClick={addToFavorite} className="btn btn-danger btn-sm">
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

export default DrinkItems;