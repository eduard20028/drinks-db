import React from 'react';
import {DrinkServiceConsumer} from '../DrinkServiceContext';

const withDrinkService = (mapMethodsToProps) => (Wrapped) => {
    return(props) => {
        return(
            <DrinkServiceConsumer>
                {
                    (drinkService) => {
                        const serviceProps = mapMethodsToProps(drinkService);
                        return(
                            <Wrapped {...props} {...serviceProps}/>
                        )
                    }
                }
            </DrinkServiceConsumer>
        )
    };
}

export default withDrinkService;