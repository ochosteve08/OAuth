import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "../features/user/UserSlice";

const Header = () => {
  const currentUser = useSelector(userDetails);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold">CyberDev</h1>
        </Link>
        <ul className="flex space-x-6 items-center">
          <Link to={"/"}>
            <li className="hover:opacity-50">Home</li>
          </Link>
          <Link to={"about"}>
            <li className="hover:opacity-50">About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
              
                className="rounded-full object-cover h-8 w-8"
                src={currentUser.profilePicture}
                alt="profile"
              />
            ) : (
              <li className="hover:opacity-50">Login</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
