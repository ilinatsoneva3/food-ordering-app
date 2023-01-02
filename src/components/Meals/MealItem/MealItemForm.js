import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const totalAmountRef = useRef();
  const [isValidAmount, setIsValidAmount] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = totalAmountRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setIsValidAmount(false);
      return;
    }

    props.onAddToCart(enteredAmountNum);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={totalAmountRef}
        label="Amount"
        input={{
          id: "Amount_" + props.id,
          type: "number",
          min: "1",
          step: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!isValidAmount && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
