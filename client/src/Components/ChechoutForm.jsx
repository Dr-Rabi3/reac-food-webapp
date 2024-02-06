import { useContext } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import openModal from "../store/ModalContext";
import CartContext from "../store/CartContext";
import { currencyFormatting } from "../util/formatting.js";
import useHttp from "../Hook/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckoutForm() {
  const { currentProgress, hideCart, hideCheckout } =
    useContext(openModal);
  const { items , clearCart} = useContext(CartContext);
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:5000/orders",
    requestConfig
  );
  const totalCost = items.reduce(
    (totalCost, item) => totalCost + item.price * item.quantity,
    0
  );
  const onSendData = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: formData,
        },
      })
    );
  };

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }
  
  let actions = (
    <>
      <button className="text-button" onClick={hideCart}>
        Close
      </button>
      <Button>Submit Order</Button>
    </>
  );


  if (isLoading) {
    actions = <span>Sending ordered data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={currentProgress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes
        </p>
        <p className="modal-action">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={currentProgress === "checkout"} onClose={hideCheckout}>
      <form onSubmit={onSendData}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatting.format(totalCost)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title={"Failed to submit order"} massage={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
