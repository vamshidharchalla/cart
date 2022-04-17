export const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return {...state, cart: [...state.cart, {...action.payload, qty: 1}] };
        case 'REMOVE_FROM_CART':
            return {...state, cart:state.cart.filter(c => c.id != action.payload.id) };
        case "CHANGE_CART_QTY":
            return {...state, cart: state.cart.filter( (c) => 
                c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty)};
        case 'CLEAR_CART':
            return {...state, cart: [] };
        default: return state; 
    }
}


export const productReducer = (state, action) => {
    switch(action.type){
        case 'FILTER_BY_CATEGORY':
            let temp = [...state.category];
            let catIndex = temp.indexOf(action.payload);
            if( catIndex >= 0){
                temp.splice(catIndex, 1)
            }else{
                temp.push(action.payload)
            }
            console.log(temp);
            return {...state, category: temp };
        case 'SORT_BY_PRICE':
            return {...state, sort:action.payload };
        case 'FILTER_BY_STOCK':
            return {...state, byStock: !state.byStock };
        case "FILTER_BY_SEARCH":
            return {...state, searchQuery: action.payload };
        case "CLAER_FILTER" :
            return{
                byStock: false,
                searchQuery: "",
                category: []
            }
        default: return state; 
    }
}
