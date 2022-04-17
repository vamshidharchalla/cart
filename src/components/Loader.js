import {Spinner} from "react-bootstrap";
const Loader = () => {
    return (
    <div className="bg-box">
        <div className="Loader-Container">
        <Spinner animation="border" className="loader" variant="primary" />
        </div>
    </div>
    );
    
  }
  export default Loader;