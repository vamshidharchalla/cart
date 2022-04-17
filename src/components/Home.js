import {useContext} from "react";
import {CartContext} from "../context/Context";
import Product from "./Product";
import Filters from "./Filters";
import "./styles.css";

const Home = () => {
    // Taking values from store/ context
    const {
        state: { products},
        productState: {byStock, sort, searchQuery, category}
        } = useContext(CartContext);
    
    const transformProducts = () => {
        let sortedProducts = products;
        // Sort products based on price
        if(sort){
            sortedProducts = sortedProducts.sort((a,b) => (
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            ))
        }
        // Show results based on stock availability
        if(!byStock){
            sortedProducts = sortedProducts.filter((prod) => prod.inStock);
        }
        // Filter prodcuts based on user selection
        if(category.length){
            sortedProducts = sortedProducts.filter( (prod) => category.indexOf(prod.category) >= 0 );
        }
        // Filter products based on user given input
        if( searchQuery.trim() !== ""){
            let query = searchQuery.trim();
            sortedProducts = sortedProducts.filter( (prod) =>
                prod.name.toLowerCase().includes(query.toLowerCase())
            );
        }
        return sortedProducts;
    };
    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
                {transformProducts().map( (prod) => {
                    return <Product prod={prod} key={prod.id} />
                })}
            </div>
        </div>
    )
}
export default Home;