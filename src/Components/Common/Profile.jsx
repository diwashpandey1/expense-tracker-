import { useContext, useState, useEffect, useRef } from "react";
import { signOut, updateProfile } from "firebase/auth"; // Import updateProfile
import { AuthContext } from "../../backend/AuthContext";
import { Navigate, Link } from "react-router-dom";
import profilePlaceholder from "../../assets/images/profile.webp";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, auth, storage } from "../../backend/Firebase";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);

  const fetchUserData = async () => {
    try {
      if (!user) {
        console.log("No user logged in yet.");
        return;
      }

      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load profile data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out.");
    }
  };

  const handleUpdateProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    if (file.size > 1024 * 1024) {
      toast.error("Image size must be less than 1MB.");
      return;
    }

    try {
      toast.loading("Uploading image...", { id: "uploadToast" });

      const storageRef = ref(storage, `profile_pictures/${user.uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // ✅ **Update Firebase Auth user profile**
      // This updates the user's photoURL in their authentication metadata.
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      // Update Firestore user document with new imageURL
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        imageURL: downloadURL,
      });

      setUserData((prev) => ({ ...prev, imageURL: downloadURL }));
      toast.success("Profile picture updated!", { id: "uploadToast" });

    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload image. Please try again.", { id: "uploadToast" });
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  let formattedDate = "N/A";
  if (user?.metadata?.creationTime) {
    const creationTime = user.metadata.creationTime;
    const date = new Date(creationTime);
    formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Back Button */}
      <motion.div
        initial={{ width: 44, borderRadius: 9999 }}
        whileHover={{ width: 160, borderRadius: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute overflow-hidden text-white bg-gray-800 top-4 left-4"
      >
        <Link
          to="/"
          className="flex items-center px-2 transition-colors rounded-lg h-11 hover:bg-gray-900"
        >
          <ArrowLeft size={24} className="flex-shrink-0" />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2 whitespace-nowrap"
          >
            Back to Home
          </motion.span>
        </Link>
      </motion.div>

      <div className="w-full max-w-lg space-y-8">
        {/* Profile Details Card */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
            Profile Details
          </h2>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <img
                    src={
                        userData?.imageURL ||
                        user?.photoURL ||
                        profilePlaceholder
                    }
                    alt="Profile"
                    className="object-cover w-24 h-24 border-4 border-gray-200 rounded-full"
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    onClick={handleUpdateProfilePictureClick}
                    className="absolute bottom-0 right-0 p-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title="Update Profile Picture"
                >
                    <UploadCloud size={20} />
                </button>
            </div>

            <p className="mt-4 text-xl font-bold text-gray-800">
              {userData?.name || user?.displayName || "Name not available"}
            </p>
            <p className="text-base text-gray-600">
              {userData?.email || user?.email || "Email not available"}
            </p>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
            Account Details
          </h2>
          <div className="space-y-2 text-center">
            <p className="text-gray-600">Member Since</p>
            <p className="font-medium text-gray-800">{formattedDate}</p>

            <button
              onClick={handleSignOut}
              className="w-full py-2 mt-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;