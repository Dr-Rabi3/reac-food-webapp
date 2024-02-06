import { createContext, useState } from "react";

const openModal = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function ModalProvider({ children }) {
  const [progress, setProgress] = useState("");

  function showCart() {
    setProgress("cart");
  }
  function hideCart() {
    setProgress("");
  }
  function showCheckout() {
    setProgress("checkout");
  }
  function hideCheckout() {
    setProgress("");
  }

  const userProgress = {
    currentProgress: progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <openModal.Provider value={userProgress}>{children}</openModal.Provider>
  );
}

export default openModal;
