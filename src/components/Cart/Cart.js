import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${ctx.totalPrice.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userdata) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-order-app-b6f62-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userdata, orderedItems: ctx.items }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((ci) => (
        <CartItem
          key={ci.id}
          name={ci.name}
          price={ci.price}
          amount={ci.amount}
          onAdd={cartItemAddHandler.bind(null, ci)}
          onRemove={cartItemRemoveHandler.bind(null, ci.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const orderModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const submittingModalContent = (
    <p>Please wait while we are sending your order...</p>
  );

  const orderSubmittedModalContent = (
    <React.Fragment>
      <p>Your order was submitted successfully!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && orderModalContent}
      {isSubmitting && !didSubmit && submittingModalContent}
      {didSubmit && !isSubmitting && orderSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
