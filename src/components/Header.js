import {useContext} from "react";
import { Navbar, Container, FormControl, Nav, Dropdown, Badge, Button } from "react-bootstrap"
import {BsCart4} from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import {CartContext} from "../context/Context";

const Header = () =>{
    // Taking values from store/ context
    const {state: {cart}, dispatch, productDispatch} = useContext(CartContext);
    return(
        <div>
            <Navbar bg="dark" variant="dark" style={{height:80}}>
            {/* Logo start*/}
                <div className="logo">
                    <Link className="linkColor siteName" to="/">Shopping Cart</Link>
                </div>
                {/* Logo end*/}
                <Container>
                    {/* Search bar */}
                    <Navbar.Text className="search">
                        <FormControl className="m-auto" style={{width:500}} placeholder="Search a product"
                            onChange={(e) => {
                                productDispatch({
                                    type: "FILTER_BY_SEARCH",
                                    payload: e.target.value
                                })
                            }}
                        />
                    </Navbar.Text>
                    {/* Cart Items */}
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="success">
                                <BsCart4 color="White" fontSize="25" />
                                <Badge bg="success">{cart.length}</Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{minWidth: 370}}  align="end">
                                {cart.length > 0 ? (
                                    <>
                                        {cart.map( (prod) => (
                                            <span className="cartitem" key={prod.id}>
                                                <img src={prod.image} className="cartItemImg" alt={prod.name} />
                                                <div className="cartItemDetail">
                                                    <span>{prod.name}</span>
                                                    <span>$ {prod.price}</span>
                                                </div>
                                                <AiFillDelete 
                                                    fontSize="20px"
                                                    style={{cursor: "pointer"}}
                                                    onClick={ () =>
                                                        dispatch({
                                                            type: "REMOVE_FROM_CART",
                                                            payload: prod
                                                        })
                                                    }
                                                />
                                            </span>
                                        ))
                                        }
                                        
                                        <Link to="/cart">
                                            <Button style={{widht: "95%", margin: "0 10px"}}>
                                                Go To Cart
                                            </Button>
                                        </Link>
                                      
                                        
                                    </>
                                ) : (
                                    <span style={{padding:10}} >Cart is EMpty!</span>
                                )}
                                
                            </Dropdown.Menu>

                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header;