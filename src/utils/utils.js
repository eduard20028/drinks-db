import app from "../base";
const addToFavorite = (e) => {
    const user = app.auth().currentUser;
    const targetDrink = e.target.closest(".id-drink");
    const Drink = app.database().ref('users/user_' + user.uid + '/favorite/drink_' + targetDrink.id);
    Drink.once('value', (snapshot) => {
            if(snapshot.val()){
                Drink.set({});
                toggleClass(targetDrink);
            }
            else if(!snapshot.val()){
                Drink.set(targetDrink.id);
                toggleClass(targetDrink);
            }
      });
}
const addComment = (e) => {
    const user = app.auth().currentUser;
    const targetDrink = e.target.closest(".id-drink");
    const Drink = app.database().ref('users/user_' + user.uid + '/favorite/drink_' + targetDrink.id);
    Drink.once('value', (snapshot) => {
            if(snapshot.val()){
                Drink.set({});
                toggleClass(targetDrink);
            }
            else if(!snapshot.val()){
                Drink.set(targetDrink.id);
                toggleClass(targetDrink);
            }
      });
}
const toggleClass = (parentNode) => {
    const classes = parentNode.querySelector('.icon').classList;
    if(classes.contains("far")){
        classes.remove('far');
        classes.add('fa');
    }
    else if(classes.contains("fa")){
        classes.remove('fa');
        classes.add('far');
    }
}
export {
    toggleClass,
    addToFavorite,
    addComment
}