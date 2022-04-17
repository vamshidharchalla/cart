import {useState, useEffect, useContext} from "react"
import {CartContext} from "../context/Context";
import {ListGroup, Row, Col, Image} from "react-bootstrap";

const Invoice = () => {
    const {state: {cart}, dispatch} = useContext(CartContext);
    // Initializing the products
    const [products, setProducts] = useState(cart);
    const [total, setTotal] = useState();
    const [discountAmount, setDiscountAmount] = useState(0);
    const date = new Date()
    // Method to generate random number for invoice
    const getRandomId = (min = 1000, max = 5000) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const num =  Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
      };

    useEffect(() => {
        let tmpTotal = cart.reduce( (a,c) => a+Number(c.price)*c.qty, 0);
        let tmpDiscount = 0;
        // If total amount is more than 50, giving flat 10% discount on total
        if(tmpTotal > 50) {
            tmpDiscount = (tmpTotal*0.1).toFixed(2);
        }
        setDiscountAmount(tmpDiscount);
        setTotal( (tmpTotal).toFixed(2) );
        // Clearing the cart
        dispatch({ type: "CLEAR_CART" })
    }, [])
    if( !products.length  ){
        // If products are empty show some message 
        return <div></div>
    }else{

        return (
            <div className="home">
                <div className="productContainer">
                    <ListGroup>
                    <ListGroup.Item key={"header"}>
                            <Row>
                                <Col md={6}>
                                    Product
                                </Col>
                                <Col md={2}>
                                    Price
                                </Col>
                                
                                <Col md={2}>
                                    Quantity
                                </Col>
                                <Col md={2}>
                                    Total
                                </Col>
                                
                            </Row>
                            </ListGroup.Item>
                        {products.map( (prod) => (
                            <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={prod.image} alt={prod.name} fluid rounded />
                                </Col>
                                <Col md={4}>
                                    <span>{prod.name}</span>
                                </Col>
                                <Col md={2}>
                                    $ {prod.price}
                                </Col>
                                
                                <Col md={2}>
                                    {prod.qty}
                                </Col>
                                
                                <Col md={2}>
                                    $ {prod.qty*prod.price}
                                </Col>
                            </Row>
                            </ListGroup.Item>
                            
                        ))}
                        <ListGroup.Item key={"footer"}>
                            <Row>
                                <Col md={10}>
                                <Row>
                                    <Col md={3}>Order Number: </Col>
                                    <Col md={9}>{getRandomId()+'-'+getRandomId()+'-'+getRandomId()}</Col>
                                </Row>
                                <Row>
                                    <Col md={3}>Order Date: </Col>
                                    <Col md={9}>{date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+date.getDate()}</Col>
                                </Row>
                                </Col>
                                <Col md={2}>
                                <Row>
                                    <Col md={6}>Total: </Col>
                                    <Col md={6}>${total}</Col>
                                </Row>
                                <Row>
                                    <Col md={6}>Discount: </Col>
                                    <Col md={6}>$ {discountAmount}</Col>
                                </Row>
                                <Row>
                                    <Col md={6}>Paid: </Col>
                                    <Col md={6}>${(total-discountAmount).toFixed(2)}</Col>
                                </Row>
                                   
                                    
                                </Col>
                                
                            </Row>
                            </ListGroup.Item>
                    </ListGroup>
                    
                </div>
                
            </div>
        )
    }
    
}
export default Invoice;