import { useSelector } from "react-redux";
import { getUser } from "./auth/authSlice";

export const Welcome = () => {
  const user = useSelector(getUser);
  return <>Welcome {user.username}</>;
};
