import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-6">Sign Up</h1>
      <form className="flex flex-col space-y-6">
        <input
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200  rounded-lg py-2 px-3 outline-blue-200 hover:outline-blue-500"
        />
        <button className="bg-orange-600 p-2 uppercase text-white rounded-lg font-semibold hover:opacity-90">
          Sign Up
        </button>
      </form>
      <div className='flex space-x-3 my-3'>
        <p>Have An Account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-800">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp