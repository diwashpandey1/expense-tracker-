import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../backend/Firebase";
import toast from "react-hot-toast"; // Import toast
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon
import { motion } from "framer-motion"; // Import Framer Motion

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error("Error sending reset email:", err.message);
      let userFacingError = "Failed to send reset email. Please try again.";
      switch (err.code) {
        case "auth/invalid-email":
          userFacingError = "The email address is not valid.";
          break;
        case "auth/user-not-found":
          userFacingError = "No user found with this email.";
          break;
        default:
          userFacingError = "An unexpected error occurred. Please try again.";
      }
      toast.error(userFacingError);
    }
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
          to="/login"
          className="absolute text-xl text-gray-200 top-3 left-4 hover:text-white" // Changed to left-4 for consistency with Profile page
          title="Back to Login"
        >
          <ArrowLeft size={24} /> {/* Lucide ArrowLeft icon */}
        </Link>

        <h1 className="mb-6 text-3xl font-bold">
          Reset Password
        </h1>
        <p className="mb-6 text-gray-200">Enter your email to receive a reset link.</p>


        <form onSubmit={handlePasswordReset}>
          {/* Email Field */}
          <div className="mb-6"> {/* Increased bottom margin for input */}
            <label
              htmlFor="email"
              className="block mb-1 ml-1 text-sm font-medium text-left text-gray-200" // Align text left, adjust color
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]" // Glass effect styling
              placeholder="your@example.com"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#10b981] text-white py-2 rounded-lg hover:bg-[#0ea96b] transition font-semibold" // Adjusted hover color
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-gray-200">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#fbbf24] hover:underline" // Matching login page link color
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;