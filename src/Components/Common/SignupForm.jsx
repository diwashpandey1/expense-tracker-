import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import { Link } from "react-router-dom";

function SignupForm() {
   const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
         alert("Passwords do not match!");
         return;
      }
      console.log("Sign-Up Successful:", formData);
   };

   return (
      <div className="w-full min-h-screen h-full flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-[0px] md:rounded-lg shadow-md w-full h-full md:h- md:w-96 relative">
            <Link to="/" className="absolute right-3 top-2"><FontAwesomeIcon icon={faClose}/></Link>
            <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
               {/* Full Name */}
               <div>
                  <label
                     htmlFor="fullName"
                     className="block text-sm font-medium text-gray-600">
                     Full Name
                  </label>
                  <input
                     type="text"
                     id="fullName"
                     name="fullName"
                     value={formData.fullName}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                     placeholder="Enter your full name"
                     required
                  />
               </div>

               {/* Email */}
               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-600">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                     placeholder="Enter your email"
                     required
                  />
               </div>

               {/* Password */}
               <div className="relative">
                  <label
                     htmlFor="password"
                     className="block text-sm font-medium text-gray-600">
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                     placeholder="Enter your password"
                     required
                  />
                  <button className="absolute top-8 right-2"><FontAwesomeIcon icon={faEye} /></button>
               </div>

               {/* Confirm Password */}
               <div className="relative">
                  <label
                     htmlFor="confirmPassword"
                     className="block text-sm font-medium text-gray-600">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     id="confirmPassword"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                     placeholder="Confirm your password"
                     required
                  />
                  <button className="absolute top-8 right-2"><FontAwesomeIcon icon={faEye} /></button>
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                  Sign In
               </button>
            </form>

            {/* Social Login */}
            <div className="mt-6 text-center">
               <p className="text-sm text-gray-500 mb-4">or sign in with</p>
               <div className="flex justify-center flex-col items-center gap-5">
                  <button className="px-4 py-2 w-full border rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3">
                     <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google Logo"
                        className="w-5"
                     />
                     Login with Google
                  </button>
                  <button className="px-4 py-2 w-full border rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3">
                     <img
                        src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
                        alt="Facebook Logo"
                        className="w-5"
                     />
                     Login with Facebook
                  </button>
               </div>
            </div>

            {/* Already Have Account */}
            <div className="mt-4 text-center">
               <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-500 hover:underline">
                     Log In
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

export default SignupForm;
