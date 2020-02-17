import app from "../base";
export default class DrinkService{
    getResource = async (url) => {
        const res =  await fetch(`https://www.thecocktaildb.com/api/json/v1/1${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch url ${url} received ${res.status}`)
        }       
        return await res.json();
    }
    
    getDrinks = async() => {
        let drinks = [];
        while(drinks.length < 9){
            let cocktail = await this.getResource('/random.php');
            drinks.push(cocktail.drinks[0]);
        }
        const result = new Promise((resolve) => {drinks.forEach((item) => {
                app.database().ref('users/user_' + app.auth().currentUser.uid + '/favorite/drink_' + item.idDrink)
                    .once('value', (snapshot) => {
                        if(snapshot.val()){
                            item["favorite"] = true;
                            resolve(drinks);
                        }
                        else{
                            item["favorite"] = false;
                            resolve(drinks);
                        }
                    })
            })
        })
        return result.then((value) => {
            return value;
        });
    }
    getFavorite = async() => {
        let drinks = [];
        await app.database().ref('users/user_' + app.auth().currentUser.uid + '/favorite/')
                .once('value').then(async (snapshot) => {
                    if(snapshot.val){
                        let children = snapshot.val();
                        for(let child in children){
                            let id = child.replace(/\D+/g,"");
                            let cocktail = await this.getResource(`/lookup.php?i=${id}`);
                            cocktail.drinks[0]["favorite"] = true;
                            drinks.push(cocktail.drinks[0]);
                        }
                    }
                })
        return drinks;
    }
}