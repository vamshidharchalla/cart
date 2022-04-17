import {useContext} from "react";
import {Card, Button} from "react-bootstrap";
import {CartContext} from "../context/Context";

const Product = ({prod}) => {
    const {state: {cart}, dispatch} = useContext(CartContext);
    return(
        <div className="products"> 
            <Card>
                <Card.Img variant="top" src={prod.image} alt={prod.name} />
                <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10}}>
                        <span>$ {prod.price}</span>
                        <div>{prod.category}</div>
                        
                    </Card.Subtitle>
                    {
                        cart.some(p => p.id === prod.id) ? (
                            <Button 
                            onClick={() => {dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod
                                })
                            }}
                            variant='danger'>Remove from cart</Button>
                        ) : (
                            <Button 
                            onClick={() => {dispatch({
                                type: "ADD_TO_CART",
                                payload: prod
                                })
                            }}
                            disabled={!prod.inStock}>{prod.inStock ? "Add to Cart" : "Out of Stock" }</Button>
                        )
                    }
                    
                    
                </Card.Body>

            </Card>
         </div>
    ) 
}

export default Product;