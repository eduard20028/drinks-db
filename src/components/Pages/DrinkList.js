import React from 'react';
import { withDrinkService } from '../HOC';
import DrinkItemsContainer from '../DrinkItems/';
const DrinkList = ({getData}) => {
    return (
        <DrinkItemsContainer getData={getData}/>
    );
}
const mapMethodsToProps = (drinkService) => {
    return{
        getData: drinkService.getDrinks
    }
}
export default withDrinkService(mapMethodsToProps)(DrinkList);