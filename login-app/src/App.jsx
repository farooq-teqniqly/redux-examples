import { useSelector } from "react-redux";
import { Login } from "./Login";
import { Welcome } from "./Welcome";
import { getUser, getStatus, getError } from "./auth/authSlice";

export default function App() {
  const user = useSelector(getUser);
  const status = useSelector(getStatus);
  const error = useSelector(getError);

  return (
    <div>
      {status === "pending" && <p>Logging in...</p>}
      {status === "failed" && <p>Login failed - {error}</p>}
      {!user && <Login />}
      {user && <Welcome />}
    </div>
  );
}
