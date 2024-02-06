import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatting } from "../util/formatting.js";
import Button from "./Button";
import openModal from "../store/ModalContext";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { currentProgress, hideCart, showCheckout } = useContext(openModal);
  const totalCost = items.reduce(
    (totalCost, item) => totalCost + item.price.$numberDecimal * item.quantity,
    0
  );
  return (
    <Modal
      open={currentProgress === "cart"}
      className="cart"
      onClose={currentProgress === "cart" ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.quantity} x{" "}
                {currencyFormatting.format(item.price.$numberDecimal)}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => removeItem(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => addItem(item)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatting.format(totalCost)}</p>
      <p className="modal-actions">
        <button className="text-button" onClick={hideCart}>
          Close
        </button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
