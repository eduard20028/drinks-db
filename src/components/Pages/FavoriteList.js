import React from 'react';
import { withDrinkService } from '../HOC';
import DrinkItems from '../DrinkItems';
const FavoriteList = ({getData}) => {
    return (
        <DrinkItems getData={getData}/>
    );
}
const mapMethodsToProps = (drinkService) => {
    return{
        getData: drinkService.getFavorite
    }
}
export default withDrinkService(mapMethodsToProps)(FavoriteList);