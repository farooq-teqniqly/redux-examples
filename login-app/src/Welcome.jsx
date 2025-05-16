import { useSelector } from "react-redux";
import { getUser } from "./auth/authSlice";
import { useDispatch } from "react-redux";
import { getCategories, getProductCategories } from "./products/productsSlice";

export const Welcome = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getProductCategories());
  };
  const user = useSelector(getUser);
  const categories = useSelector(getCategories);

  return (
    <div>
      Welcome {user.username}
      <br />
      <button onClick={handleClick}>Get Product Categories</button>
      <ul>
        {categories?.map((category) => (
          <li key={category.slug}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
