import Button from "./Button";
import { currencyFormatting } from "../util/formatting";
import { useContext } from "react";
import CartContext from "../store/CartContext";
export default function Meal({ item }) {

  const { addItem } = useContext(CartContext);
  const imgUrl = "../../../backend/images" + item.image;
  console.log(imgUrl);
  const priceFormat = currencyFormatting.format(item.price);

  return (
    <li className="meal-item">
      <article>
        <img src={imgUrl} alt={item.name} />
        <div>
          <h3>{item.name}</h3>
          <p className="meal-item-price">{priceFormat}</p>
          <p className="meal-item-description">{item.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItem(item)}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
}
