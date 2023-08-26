import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";

const Oauth = () => {
  const googleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      className=" bg-blue-700 p-2 uppercase text-white rounded-lg font-semibold disabled:opacity-70"
      onClick={googleClick}
    >
      Continue with Google
    </button>
  );
};

export default Oauth;
