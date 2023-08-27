import { useSelector } from "react-redux";
import { userDetails } from "../features/user/UserSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const currentUser = useSelector(userDetails);
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
