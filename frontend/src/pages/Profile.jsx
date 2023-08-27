import { useSelector } from "react-redux";
import { userDetails } from "../features/user/UserSlice";
import { useState } from "react";

const Profile = () => {
  const currentUser = useSelector(userDetails);
  const [loading, setLoading] = useState(false);
  // const [username, setUsername] = useState(currentUser?.username);
  // const [email, setEmail] = useState(currentUser?.email);
  // const [password, setPassword] = useState("");

  console.log(currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Profile</h1>
      <form className="flex flex-col space-y-6">
        <img
          width={100}
          src={currentUser.profilePicture}
          alt="profile-picture"
          className="rounded-full self-center cursor-pointer object-cover"
        />
        <input
          type="text"
          id="username"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          placeholder="username"
          // value={username}
          // onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          // value={email}
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          placeholder="email"
          // onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          placeholder="password"
          // onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-orange-600 p-2 uppercase text-white rounded-lg font-semibold disabled:opacity-70 hover:opacity-90  "
        >
          {loading ? "UPDATE..." : "UPDATE"}
        </button>
        <div className="flex justify-between text-red-600 font-semibold">
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
