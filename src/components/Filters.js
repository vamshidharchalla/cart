import {useContext} from "react"
import { Form, Button }  from "react-bootstrap";
import {CartContext} from "../context/Context";

const Filters = () =>{
    const { state: { categories}, productState: {byStock, sort, category},  productDispatch  } = useContext(CartContext);

    return(
        <div className="filters">
            <span className="title">Filter Products</span>
            <span>Srot by:</span>
            <span>
                <Form.Check 
                    inline
                    label="Price: low to high"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: 'lowToHigh'
                        })
                    }
                    checked={sort === 'lowToHigh'}
                />
            </span>
            <span>
                <Form.Check 
                    inline
                    label="Price: high to low"
                    name="group1"
                    type="radio"
                    id={`inline-2`}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: 'highToLow'
                        })
                    }
                    checked={sort === 'highToLow'}
                />
            </span> 
            <hr />
            <span>
                <Form.Check 
                    inline
                    label="Include Out of Stock"
                    name="group1"
                    type="checkbox"
                    id={`inline-3`}
                    onChange={() =>
                        productDispatch({
                            type: "FILTER_BY_STOCK"
                        })
                    }
                    checked={byStock}
                />
            </span>
            <hr />
            <span>Category:</span>
            {categories.map( (cat, i) => (
                <span key={i}>
                <Form.Check 
                    inline
                    label={cat}
                    name="group1"
                    type="checkbox"
                    id={`inline-${cat}`}
                    onChange={() =>
                        productDispatch({
                            type: "FILTER_BY_CATEGORY",
                            payload: cat
                        })
                    }
                    checked={category.indexOf(cat) >= 0 ? true : false}
                />
            </span>
            ))}
            <hr />
          <Button variant="light" onClick={() =>
                        productDispatch({
                            type: "CLAER_FILTER"
                        })
                    }
            >Clear Filters</Button>
        </div>
    )
}

export default Filters;