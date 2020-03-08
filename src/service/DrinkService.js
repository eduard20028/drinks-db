import app from "../base";
export default class DrinkService{
    getResource = async (url) => {
        const res =  await fetch(`https://www.thecocktaildb.com/api/json/v1/1${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch url ${url} received ${res.status}`)
        }       
        return res.json();
    }
    
    snapshot = async() => {
        return await app.database().ref('users/user_' + app.auth().currentUser.uid + '/favorite/').once('value');
    }
    getDrinks = async() => {
        let drinks = [];
        let map = new Map();

        while(map.size < 9){
            let cocktail = await this.getResource('/random.php');
            map.set(cocktail.drinks[0].idDrink,cocktail.drinks[0]);
        }
        let snapshot = await this.snapshot();
        if(snapshot.val()){
            let favorite = snapshot.val();
                for(let [, id] of Object.entries(favorite)){
                    for(let item of map.values()){
                        if(item.idDrink === id){
                            item["favorite"] = true;
                        }
                        else{
                            item["favorite"] = false;
                        }
                    }
                }
        }
        for (let item of map.values()){ drinks.push(item); };
        return drinks;
    }

    getFavorite = async() => {
        let drinks = [];

        let snapshot = await this.snapshot();
        if(snapshot.val()){
            let favorite = snapshot.val();
            for(let [, id] of Object.entries(favorite)){
                let cocktail = await this.getResource(`/lookup.php?i=${id}`);
                cocktail.drinks[0]["favorite"] = true;
                drinks.push(cocktail.drinks[0]);
            }
        }
        
        return drinks;
    }

    getDrinkById = async(itemId) => {
        let item = await this.getResource(`/lookup.php?i=${itemId}`);
        let snapshot = await this.snapshot();
        let drink = [];

        item.drinks[0]["favorite"] = false;
        if(snapshot.val()){
            let favorite = snapshot.val();
            drink.push(item.drinks[0]);
                for(let [, id] of Object.entries(favorite)){
                        if(item.drinks[0].idDrink === id){
                            item.drinks[0]["favorite"] = true;
                            break;
                        }
                }
        }
        drink.push(item.drinks[0]);
        
        return drink[0];
    }
}