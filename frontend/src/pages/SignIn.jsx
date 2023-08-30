import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  showError,
  showLoading,
  showSuccess,
  showErrorMessage,
} from "../features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../Components/Oauth";
import { BASE_URL } from "../../Config";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const loading = useSelector(showLoading);
  const error = useSelector(showError);
  const errorMsg = useSelector(showErrorMessage);
  const success = useSelector(showSuccess);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(signInStart());

      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
         withCredentials: true ,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        dispatch(signInFailure(error.message));

        throw new Error(error.message || "Something went wrong");
      }

      if (response.ok) {
        const data = await response.json();
        
        dispatch(signInSuccess(data));
        navigate("/profile");
        setFormData({});
      
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        dispatch(
          signInFailure(
            "Network error. Please check your connection and try again."
          )
        );
      } else {
        dispatch(signInFailure(error.message));
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Sign In</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-orange-600 p-2 uppercase text-white rounded-lg font-semibold disabled:opacity-70"
        >
          {loading ? "Signing In...." : "Sign In"}
        </button>
        <Oauth />
      </form>
      <div className="flex space-x-3 my-3">
        <p>Don&#39;t Have An Account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-800">Sign Up</span>
        </Link>
      </div>
      <div>
        {error ? (
          <div className={`p-3 ${errorMsg ? "bg-red-200" : ""}`}>
            {errorMsg}
          </div>
        ) : null}

        {success ? (
          <div className={`p-3 bg-green-200`}>SignIn Successful</div>
        ) : null}
      </div>
    </div>
  );
};

export default SignIn;
