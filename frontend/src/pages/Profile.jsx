/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { userDetails } from "../features/user/UserSlice";
import { useState, useRef, useEffect } from "react";
import app from "../Firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const currentUser = useSelector(userDetails);
  const [loading, setLoading] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  // console.log(image);
  // console.log(currentUser);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Profile</h1>
      <form className="flex flex-col space-y-6">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(event) => setImage(event.target.files[0])}
        />

        <img
          width={100}
          src={currentUser.profilePicture}
          alt="profile-picture"
          className="rounded-full self-center object-cover"
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <div
          className="text-red-800 self-center cursor-pointer hover:underline"
          onClick={() => fileRef.current.click()}
        >
          update profile picture
        </div>
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
