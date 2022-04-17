import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import Header from './components/Header';
import Home from "./components/Home";
import Cart from "./components/Cart";
import Invoice from "./components/Invoice";
function App() {
  return (
   <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/"  element={ <Home /> } />
        <Route path="/cart"  element={<Cart />} />
        <Route path="/invoice"  element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
