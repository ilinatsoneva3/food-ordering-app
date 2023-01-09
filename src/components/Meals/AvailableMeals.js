import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-order-app-b6f62-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const parsedResponse = await response.json();
      const loadedMeals = [];

      for (const meal in parsedResponse) {
        loadedMeals.push({
          id: meal,
          name: parsedResponse[meal].name,
          description: parsedResponse[meal].description,
          price: parsedResponse[meal].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals().catch((e) => {
      setIsLoading(false);
      setHttpError(e.message);
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealList = meals.map((m) => (
    <MealItem
      id={m.id}
      key={m.id}
      name={m.name}
      price={m.price}
      description={m.description}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
