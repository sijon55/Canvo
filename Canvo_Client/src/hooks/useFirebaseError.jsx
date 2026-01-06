export default function useFirebaseError() {
  const mapError = (code) => {
    const errors = {
      "auth/email-already-in-use": "This email already exists",
      "auth/invalid-credential": "Invalid email or password",
      "auth/popup-closed-by-user": "Google login failed. Please try again.",
    };

    return errors[code] || "Something went wrong.";
  };

  return { mapError };
}
