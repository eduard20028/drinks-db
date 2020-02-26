import React from 'react';
import { withDrinkService } from '../HOC';
import DrinkItemsContainer from '../DrinkItems/';

const FavoriteList = ({getData}) => {
    return (
        <DrinkItemsContainer getData={getData} page="favorite"/>
    );
}
const mapMethodsToProps = (drinkService) => {
    return{
        getData: drinkService.getFavorite
    }
}
export default withDrinkService(mapMethodsToProps)(FavoriteList);