import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      setErrorMsg(null);
      const response = await fetch("http://localhost:3500/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setLoading(false);
        setError(true);
        const result = await response.json();
        throw new Error(result.message || "Something went wrong");
      }

      if (response.ok) {
        await response.json();

        setLoading(false);
        setError(false);
        setSuccess(true);
        navigate('/')
      }
    } catch (error) {
      setErrorMsg(error.message);
      console.error("Login Error:", error.message);
      setLoading(false);
      setError(true);
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
