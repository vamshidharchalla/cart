import {useState, useEffect, useContext} from "react"
import {Button, ListGroup, Row, Col, Form, Image, ProgressBar} from "react-bootstrap";
import {AiFillDelete} from "react-icons/ai";
import {Navigate} from "react-router-dom";
import Loader from "./Loader";
import {CartContext} from "../context/Context";

const Cart = () => {
    // Taking values from store/ context
    const {state: {cart}, dispatch} = useContext(CartContext);
    const [total, setTotal] = useState();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [showPageLoader, setPageLoader] = useState(false);
    useEffect(() => {
        // calculating amount and discounts
        let tmpTotal = cart.reduce( (a,c) => a+Number(c.price)*c.qty, 0);
        let tmpDiscount = 0;
        // If total amount is more than 50, giving flat 10% discount on total
        if(tmpTotal > 50) {
            tmpDiscount = (tmpTotal*0.1).toFixed(2);
        }
        setDiscountAmount(tmpDiscount);
        setTotal( (tmpTotal).toFixed(2) );
    }, [cart])

    const doCheckOut = () => {
        // Payment processing code.
        setPageLoader(true)
        setTimeout(() => {setPageLoader(false); setRedirect(true)}, 1000 )
        
    }
    if(redirect){
        // After payment success redirect to invoice details
        return <Navigate to="/invoice" />
    }
    return (
        <div className="home">
        {showPageLoader ? <Loader /> : ""}
            <div className="productContainer">
                <ListGroup>
                <ListGroup.Item key={"header"}>
                        <Row>
                            <Col md={4}>
                                Product
                            </Col>
                            <Col md={2}>
                                Price
                            </Col>
                            <Col md={2}>
                                Category
                            </Col>
                            <Col md={2}>
                                Quantity
                            </Col>
                            <Col md={2}>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    {cart.map( (prod) => (
                        <ListGroup.Item key={prod.id}>
                        <Row>
                            <Col md={2}>
                                <Image src={prod.image} alt={prod.name} fluid rounded />
                            </Col>
                            <Col md={2}>
                                <span>{prod.name}</span>
                            </Col>
                            <Col md={2}>
                                $ {prod.price}
                            </Col>
                            <Col md={2}>
                                {prod.category}
                            </Col>
                            <Col md={2}>
                                <Form.Control as="select" value={prod.qty}
                                    onChange={ (e) => 
                                        dispatch({
                                            type: "CHANGE_CART_QTY",
                                            payload: {
                                                id: prod.id,
                                                qty: e.target.value
                                            }
                                        })
                                    }
                                >
                                    {[...Array(prod.inStock).keys()].map( (x) => (
                                        <option key={x+1}>{x+1}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button
                                type="button"
                                variant="light"
                                onClick={ () =>
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: prod
                                    })
                                }
                                >
                                    <AiFillDelete  fontSize="20px" />             
                                </Button>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        
                    ))}
                </ListGroup>
            </div>
            <div className="filters summary">
                <span className="title"> Subtotal ({cart.length}) items</span>
                <span style={{ fontWeight: 700, fontSize: 20}}>Total: $ {total}</span>
                
                {discountAmount > 0 ? (
                    <>
                    <span style={{ fontWeight: 700, fontSize: 20}}>Discount: $ {discountAmount}</span>
                    <span style={{ fontWeight: 700, fontSize: 20}}>Final amount: $ {(total-discountAmount).toFixed(2)}</span>
                    <span>Hurrah...! Your shopping amount is exceeded $ 50, We are giving you falt 10% discount</span> 
                    </>
                    ): "" }
                
                <Button type="button" disabled={cart.length === 0} onClick={() => doCheckOut()}>
                        Proceed to Checkout
                </Button>
                
                
            </div>
        </div>
    )
}
export default Cart;