import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "../features/user/UserSlice";

const Header = () => {
  const currentUser = useSelector(userDetails);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Authentication</h1>
        <ul className="flex space-x-6">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"about"}>
            <li>About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                width={35}
                className="rounded-full object-cover"
                src={currentUser.profilePicture}
                alt="profile"
              />
            ) : (
              <li>Login</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
