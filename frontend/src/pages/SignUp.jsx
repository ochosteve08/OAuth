import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData) return;
    try {
      setLoading(true);
      setError(false)
      const response = await fetch("http://localhost:3500/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setLoading(false);
        setError(true);
        const errorData = await response.json();
        setErrorMsg(errorData.message);
        throw new Error(errorData.message || "Something went wrong");
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setFormData({});
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Sign Up</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          onChange={handleChange}
        />
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
        <button disabled={loading} className="bg-orange-600 p-2 uppercase text-white rounded-lg font-semibold disabled:opacity-70">
          {loading ? "Sign Up...." : "Sign Up"}
        </button>
      </form>
      <div className="flex space-x-3 my-3">
        <p>Have An Account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-800">Sign In</span>
        </Link>
      </div>
      <p className={`p-3 ${errorMsg ? "bg-red-200" : ""}`}>
        {error && <p>something went wrong</p>}
      </p>
    </div>
  );
};

export default SignUp;
