import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "./Firebase";

const getProviderId = (user) => user?.providerData?.[0]?.providerId || "password";

export async function ensureUserDocument(user, overrides = {}) {
  if (!user) return null;

  const userDocRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  const existingData = userDoc.exists() ? userDoc.data() : {};

  const profileData = {
    uid: user.uid,
    name:
      overrides.name ??
      existingData.name ??
      user.displayName ??
      user.email?.split("@")[0] ??
      "User",
    email: overrides.email ?? user.email ?? existingData.email ?? "",
    imageURL:
      overrides.imageURL !== undefined
        ? overrides.imageURL
        : existingData.imageURL ?? user.photoURL ?? null,
    provider: overrides.provider ?? existingData.provider ?? getProviderId(user),
    updatedAt: serverTimestamp(),
  };

  if (!userDoc.exists()) {
    profileData.createdAt = serverTimestamp();
  }

  await setDoc(userDocRef, profileData, { merge: true });

  return {
    ...existingData,
    ...profileData,
  };
}
