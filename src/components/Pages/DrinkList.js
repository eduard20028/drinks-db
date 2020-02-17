import React from 'react';
import { withDrinkService } from '../HOC';
import DrinkItems from '../DrinkItems';
const DrinkList = ({getData}) => {
    return (
        <DrinkItems getData={getData}/>
    );
}
const mapMethodsToProps = (drinkService) => {
    return{
        getData: drinkService.getDrinks
    }
}
export default withDrinkService(mapMethodsToProps)(DrinkList);