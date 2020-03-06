import { withDrinkService } from '../HOC';
import DrinkItemsContainer from '../DrinkItems/';

const mapFavoriteMethodsToProps = (drinkService) => {
    return{
        getData: drinkService.getFavorite,
        pageTitle: "favorite"
    }
}
const mapDrinkMethodsToProps = (drinkService) => {
    return{
        getData: drinkService.getDrinks,
        pageTitle: "drink"
    }
}

const FavoriteList = withDrinkService(mapFavoriteMethodsToProps)(DrinkItemsContainer);
const DrinkList = withDrinkService(mapDrinkMethodsToProps)(DrinkItemsContainer);
export {
    FavoriteList,
    DrinkList
}