/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../features/user/UserSlice";
import { useState, useRef, useEffect } from "react";
import app from "../Firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  signOut,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  showLoading,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  resetMessages,
  showError,
} from "../features/user/UserSlice";
import { BASE_URL } from "../../Config";

const Profile = () => {
  const currentUser = useSelector(userDetails);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);

  const loading = useSelector(showLoading);
  const error = useSelector(showError);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture,
  });

  useEffect(() => {
    let errorTimeout, successTimeout;

    if (error) {
      errorTimeout = setTimeout(() => {
        dispatch(resetMessages());
      }, 5000);
    }

    if (updateSuccess) {
      successTimeout = setTimeout(() => {
        setUpdateSuccess(false);
      }, 5000);
    }

    // Clear the timeouts when the component is unmounted
    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [error, updateSuccess]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

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
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
        setShowUploadSuccess(true);
        setTimeout(() => {
          setShowUploadSuccess(false);
        }, [10000]);
      }
    );
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(
          `${BASE_URL}/user/${currentUser._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            withCredentials: true,
          }
        );
        const data = await res.json();

        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(deleteUserFailure(error));
      }
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${BASE_URL}/user/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data));
        throw new Error("Network response was not ok");
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch( `${BASE_URL}/auth/signout`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
      });
      await response.json();

      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Profile</h1>
      <form className="flex flex-col space-y-6" onSubmit={handleUpdate}>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(event) => setImage(event.target.files[0])}
        />

        <img
          width={100}
          src={
            formData.profilePicture
              ? formData.profilePicture
              : currentUser.profilePicture
          }
          alt="profile-picture"
          className="rounded-full self-center object-cover"
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : showUploadSuccess ? (
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
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          placeholder="email"
          onChange={handleChange}
          disabled
        />
        <input
          type="password"
          id="password"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
          placeholder="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-orange-600 p-2 uppercase text-white rounded-lg font-semibold disabled:opacity-70 hover:opacity-90  "
        >
          {loading ? "UPDATE..." : "UPDATE"}
        </button>
      </form>
      <div className="flex justify-between text-red-600 my-3 font-semibold">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <div>
        {error && <p className="text-red-700 mt-5">Something went wrong!</p>}
        {updateSuccess && (
          <p className="text-green-700 mt-5">User is updated successfully!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
