import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalPrice.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler = () => {};
  const cartItemRemoveHandler = () => {};

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

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
