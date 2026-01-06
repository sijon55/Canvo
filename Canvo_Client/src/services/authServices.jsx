import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase/firebase";

// -------------------------------
// CREATE EMAIL ACCOUNT
// -------------------------------
export async function createAccount(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// -------------------------------
// UPDATE PROFILE + FORCE REFRESH
// -------------------------------
export async function updateUserProfile(user, name, photoURL) {
  await updateProfile(user, {
    displayName: name,
    photoURL,
  });

  // 🔥 IMPORTANT FIX: force Firebase to refresh user profile
  await user.reload();

  // return freshest version
  return auth.currentUser;
}

// -------------------------------
// EMAIL LOGIN
// -------------------------------
export async function loginAccount(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// -------------------------------
// PASSWORD RESET
// -------------------------------
export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

// -------------------------------
// GOOGLE LOGIN + FORCE REFRESH
// -------------------------------
export async function googleLogin() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // 🔥 FIX: refresh Google logged-in profile too
  await user.reload();

  return auth.currentUser;
}
