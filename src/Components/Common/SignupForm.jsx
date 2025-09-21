import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState, useContext} from "react";
import {Link, Navigate} from "react-router-dom";
import toast from "react-hot-toast";
import {auth, googleProvider, firestore} from "../../backend/Firebase";
import {
   signInWithPopup,
   createUserWithEmailAndPassword,
   updateProfile,
} from "firebase/auth";
import {AuthContext} from "../../backend/AuthContext";
import {doc, setDoc, serverTimestamp} from "firebase/firestore";
import { motion } from "framer-motion";

function SignupForm() {
   const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData((prev) => ({...prev, [name]: value}));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
         toast.error("Passwords do not match!");
         return;
      } else if (formData.password.length < 8) {
         toast.error("Password must be at least 8 characters long!");
         return;
      } else if (!/\d/.test(formData.password)) {
         toast.error("Password must contain at least one number!");
         return;
      } else if (!/[!@#$%^&*]/.test(formData.password)) {
         toast.error("Password must contain at least one special character!");
         return;
      } else if (formData.fullName.trim().split(" ").length < 2) {
         toast.error("Please enter your full name (first and last).");
         return;
      }

      try {
         // Create user with email/password
         const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
         );
         const user = userCredential.user;

         // Update display name
         await updateProfile(user, {
            displayName: formData.fullName,
         });

         // Save user to Firestore
         await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            name: formData.fullName,
            email: user.email,
            password: formData.password, // ⚠️ Optional, not recommended
            imageURL: user.photoURL || null,
            createdAt: serverTimestamp(),
         });

         toast.success("Sign-up successful!");
      } catch (error) {
         console.error("Signup error:", error);

         let msg = "Failed to create account. Please try again.";
         if (error.code === "auth/email-already-in-use")
            msg = "Email already in use.";
         if (error.code === "auth/weak-password")
            msg = "Password should be at least 6 characters.";
         if (error.code === "auth/invalid-email")
            msg = "Invalid email address.";
         toast.error(msg);
      }
   };

   const handleGoogleSignIn = async () => {
      try {
         const result = await signInWithPopup(auth, googleProvider);
         const user = result.user;

         // Save Google user to Firestore
         await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            name: user.displayName || "Google User",
            email: user.email,
            password: null, // No password for Google login
            imageURL: user.photoURL || null,
            provider: "google",
            createdAt: serverTimestamp(),
         });

         toast.success("Google Sign-In Successful!");
      } catch (error) {
         console.error("Google Sign-In error:", error);
         toast.error("Failed to sign in with Google. Please try again.");
      }
   };

   const {user} = useContext(AuthContext);
   if (user) return <Navigate to="/" replace />;

   return (
      <div
         className="flex items-center justify-center w-full h-screen bg-center bg-cover"
         style={{
            backgroundImage:
               "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1950&q=80')",
         }}>
         <motion.div 
         initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl 
             p-6 sm:p-8 rounded-none sm:rounded-2xl 
             w-full h-full sm:h-auto sm:w-[400px] 
             text-center text-white relative">
            <Link
               to="/"
               className="absolute text-xl text-gray-200 top-3 right-4 hover:text-white">
               <FontAwesomeIcon icon={faClose} />
            </Link>

            <h1 className="mb-2 text-3xl font-bold">Sign Up</h1>
            <p className="mb-6 text-gray-200">Create your account below</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
               {/* Full Name */}
               <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                  required
               />

               {/* Email */}
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                  required
               />

               {/* Password */}
               <div className="relative">
                  <input
                     type={showPassword ? "text" : "password"}
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Password"
                     className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                     required
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute text-gray-200 right-3 top-2 hover:text-white">
                     <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                     />
                  </button>
               </div>

               {/* Confirm Password */}
               <div className="relative">
                  <input
                     type={showPassword ? "text" : "password"}
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder="Confirm Password"
                     className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                     required
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute text-gray-200 right-3 top-2 hover:text-white">
                     <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                     />
                  </button>
               </div>

               {/* Submit */}
               <button
                  type="submit"
                  className="w-full py-2 bg-[#10b981] hover:bg-[#0ea96b] transition rounded-lg font-semibold">
                  Sign Up
               </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-6 text-gray-200">
               <span className="w-1/4 border-t border-gray-400"></span>
               <span className="px-2">Or Sign Up With</span>
               <span className="w-1/4 border-t border-gray-400"></span>
            </div>

            {/* Social Login */}
            <div className="flex gap-4">
               <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center flex-1 gap-2 py-2 text-gray-700 transition bg-white rounded-lg hover:bg-gray-100">
                  <img
                     src="https://www.svgrepo.com/show/355037/google.svg"
                     alt="Google"
                     className="w-5 h-5"
                  />
                  Google
               </button>
               <button
                  className="flex items-center justify-center flex-1 gap-2 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() =>
                     toast.error("Facebook Sign-In not implemented yet.")
                  }>
                  <img
                     src="https://www.svgrepo.com/show/183607/facebook.svg"
                     alt="Facebook"
                     className="w-5 h-5"
                  />
                  Facebook
               </button>
            </div>

            {/* Already have account */}
            <p className="mt-6 text-gray-200">
               Already have an account?{" "}
               <Link to="/login" className="text-[#fbbf24] hover:underline">
                  Log In
               </Link>
            </p>
         </motion.div>
      </div>
   );
}

export default SignupForm;
