import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  firestore, // Import firestore to add user to 'users' collection
} from "../../backend/Firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../backend/AuthContext";
import toast from "react-hot-toast"; // Import toast
import { X, Eye, EyeOff } from "lucide-react"; // Import Lucide icons
import { motion } from "framer-motion"; // Import Framer Motion
import { doc, setDoc } from "firebase/firestore"; // Import doc and setDoc for Firestore

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password toggle

  const { user } = useContext(AuthContext);

  // Redirect if user is already logged in
  if (user) return <Navigate to="/" replace />;

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore, if not, create a document
      const userDocRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(userDocRef); // Use getDoc here

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          imageURL: user.photoURL,
          createdAt: new Date(),
        });
      }
      toast.success("Signed in with Google successfully!");
    } catch (error) {
      console.error("Error with Google Sign-In", error.message);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Error with Email/Password Sign-In:", error.message);
      let userFacingError = "Failed to log in. Please check your credentials.";
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/user-not-found":
          userFacingError = "Invalid email or password.";
          break;
        case "auth/invalid-email":
          userFacingError = "The email address is not valid.";
          break;
        case "auth/too-many-requests":
          userFacingError = "Too many failed attempts. Try again later.";
          break;
        default:
          userFacingError = "An unexpected error occurred. Please try again.";
      }
      toast.error(userFacingError);
    }
  };

  const handleFacebookSignIn = () => {
    toast("Facebook login is not yet implemented.", { icon: "🚧" });
  };

  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1950&q=80')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl 
             p-6 sm:p-8 rounded-none sm:rounded-2xl 
             w-full h-full sm:h-auto sm:w-[400px] 
             text-center text-white relative"
      >
        <Link
          to="/"
          className="absolute text-xl text-gray-200 top-3 right-4 hover:text-white"
        >
          <X size={24} /> {/* Lucide X icon */}
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Login</h1>
        <p className="mb-6 text-gray-200">Have an account? Sign in below</p>

        <form onSubmit={handleEmailPasswordSignIn}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            required
          />

          {/* Password with Toggle */}
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981] pr-10" // Added pr-10 for eye icon spacing
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-200 hover:text-white focus:outline-none"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between mb-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#10b981]" /> Remember Me
            </label>
            <Link to="/forget-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-[#10b981] hover:bg-[#0ea96b] transition rounded-lg font-semibold"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-6 text-gray-200">
            <span className="w-1/4 border-t border-gray-400"></span>
            <span className="px-2">Or Sign In With</span>
            <span className="w-1/4 border-t border-gray-400"></span>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-4 md:flex-row">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center flex-1 gap-2 py-2 text-gray-700 transition bg-white rounded-lg hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button
              type="button"
              onClick={handleFacebookSignIn} // Call the new handler
              className="flex items-center justify-center flex-1 gap-2 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <img
                src="https://www.svgrepo.com/show/183607/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>
          </div>
        </form>

        {/* Create Account */}
        <p className="mt-6 text-gray-200">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#fbbf24] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginForm;