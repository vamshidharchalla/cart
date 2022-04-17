import {createContext, useReducer, useContext} from "react";
// To get random data for static site we are using Fake API
import {faker} from "@faker-js/faker";
import {cartReducer, productReducer} from "./Reducers";

export const CartContext = createContext();

faker.seed(1);
const Context = ({children}) => {
    let categories = ['Men Accessories', 'Women Accessories', 'Children Accessories', 'Sports Accessories'];
    // Setting initial products
    const products = [...Array(20)].map( () => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Math.floor(Math.random() * 30),
        image: faker.image.image(),
        inStock: faker.random.arrayElement([0,1,2,3,4,5,6,7]),
        category: categories[Math.floor(Math.random() * (categories.length-1))]

    }));
    
    // Initializing cart context
    const [state, dispatch] = useReducer(cartReducer, { products: products, cart: [], categories:  categories})

    // Initializing products context
    const [productState, productDispatch] = useReducer( productReducer, { 
        byStock: false,
        searchQuery: "",
        category: []
    });

    return <CartContext.Provider value={{ state, dispatch, productState, productDispatch}}>
                {children}
            </CartContext.Provider>

}
export default Context;
