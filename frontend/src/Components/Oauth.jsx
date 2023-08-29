import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../features/user/UserSlice";
import { FcGoogle } from "react-icons/fc";

const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await fetch("http://localhost:3500/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      if (response.ok) {
        const data = await response.json();
       
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      className=" bg-blue-700 px-2 py-1 uppercase text-white rounded-lg font-semibold disabled:opacity-70 hover:opacity-90 flex justify-center items-center gap-3"
      onClick={googleClick}
    >
      <FcGoogle className="text-3xl " /> Continue with Google
    </button>
  );
};

export default Oauth;
