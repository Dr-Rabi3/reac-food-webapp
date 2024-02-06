import Meal from "./Meal";
import useHttp from "../Hook/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:5000/meals', requestConfig,[]);

  if (isLoading) {
    return <p className="center">fetching data ...</p>;
  }
  if (error) {
    return <Error title={"Failed to get meals"} massage={error} />;
  }
  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <Meal key={meal.id} item={meal} />
      ))}
    </ul>
  );
}
