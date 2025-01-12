import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <div
        id="container"
        className="w-full h-screen z-[999] backdrop-blur-[10px] bg-opacity-50 bg-black top-0 left-0 flex justify-center items-center"
      >
        <div
          className="bg-white p-6 rounded-[0px ] md:rounded-lg shadow-md w-full h-screen sm:h-auto sm:w-96 relative"
        >
          <Link to="/"
            className="absolute top-2 right-3 text-[1.4em] text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faClose} />
          </Link>
          <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
          <form>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-[#58bc82] block text-sm font-medium mb-1 ml-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-[#58bc82] block text-sm font-medium mb-1 ml-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                placeholder="Enter your password"
              />
            </div>

            {/* Forget Password */}
            <div className="text-left mb-4 ml-1 text-[#58bc82]">
              <a href="#" className="text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#10b981] text-white py-2 rounded-lg hover:bg-[#10d981] transition"
            >
              Log In
            </button>

            {/* Divider */}
            <div className="my-4 text-center text-sm text-gray-500">or</div>

            {/* Sign in with Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition mb-4"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>

            {/* Sign in with Facebook */}
            <button
              type="button"
              className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/183607/facebook.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Sign in with Facebook
            </button>

            <div className="my-4 text-center text-sm text-gray-500">or</div>

            {/* Create Account */}
            <div className="text-center mb-4">
              Don't have an account? &nbsp;
              <Link to="/signup" className="text-sm text-[#c164c1] hover:underline">
                Create one now.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
