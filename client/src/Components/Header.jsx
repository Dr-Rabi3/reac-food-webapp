import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import openModal from '../store/ModalContext';

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(openModal);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACT FOOD</h1>
      </div>
      <button className="text-button" onClick={showCart}>
        Cart ({totalItems})
      </button>
    </div>
  );
}