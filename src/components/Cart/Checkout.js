import { useRef, useState } from "react";

import styles from "./Checkout.module.css";

const IsEmpty = (value) => value.trim() === "";
const IsValidPostalCode = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const isNameValid = !IsEmpty(nameRef.current.value);
    const isStreetValid = !IsEmpty(streetRef.current.value);
    const isCityValid = !IsEmpty(cityRef.current.value);
    const isPostalValid = IsValidPostalCode(postalRef.current.value);

    setFormValidity({
      name: isNameValid,
      city: isCityValid,
      street: isStreetValid,
      postalCode: isPostalValid,
    });

    const formIsValid =
      isNameValid || isStreetValid || isCityValid || isPostalValid;

    if (!formIsValid) {
      return;
    }
  };

  const nameClasses = `${styles.control} ${
    formValidity.name ? "" : styles.invalid
  }`;

  const cityClasses = `${styles.control} ${
    formValidity.city ? "" : styles.invalid
  }`;

  const postalClasses = `${styles.control} ${
    formValidity.postalCode ? "" : styles.invalid
  }`;

  const streetClasses = `${styles.control} ${
    formValidity.street ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formValidity.postalCode && <p>Please enter a valid post code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>Please enter a valid city name.</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;
