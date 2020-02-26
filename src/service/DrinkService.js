import app from "../base";
export default class DrinkService{
    getResource = async (url) => {
        const res =  await fetch(`https://www.thecocktaildb.com/api/json/v1/1${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch url ${url} received ${res.status}`)
        }       
        return res.json();
    }
    
    getDrinks = async() => {
        let drinks = [];

        while(drinks.length < 9){
            let cocktail = await this.getResource('/random.php');
            drinks.push(cocktail.drinks[0]);
        }
        let snapshot = await app.database().ref('users/user_' + app.auth().currentUser.uid + '/favorite/').once('value');
        if(snapshot.val){
            let favorite = snapshot.val();
                for(let [, id] of Object.entries(favorite)){
                    drinks.forEach((item) => {
                        if(item.idDrink === id){
                            item["favorite"] = true;
                        }
                        else{
                            item["favorite"] = false;
                        }
                    })
                }
        }
        return drinks;
    }

    getFavorite = async() => {
        let drinks = [];

        let snapshot = await app.database().ref('users/user_' + app.auth().currentUser.uid + '/favorite/').once('value');
        if(snapshot.val){
            let favorite = snapshot.val();
            for(let [, id] of Object.entries(favorite)){
                let cocktail = await this.getResource(`/lookup.php?i=${id}`);
                cocktail.drinks[0]["favorite"] = true;
                drinks.push(cocktail.drinks[0]);
            }
        }
        return drinks;
    }
}