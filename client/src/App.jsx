import Cart from "./Components/Cart.jsx";
import CheckoutForm from "./Components/ChechoutForm.jsx";
import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { ModalProvider } from "./store/ModalContext.jsx";


function App() {
  return (
    <ModalProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckoutForm />
      </CartContextProvider>
    </ModalProvider>
  );
}

export default App;