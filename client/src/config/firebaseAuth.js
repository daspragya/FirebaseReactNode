const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { app } = require("./firebaseConfig");
const auth = getAuth(app);

const signin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const accessToken = await userCredential.user.getIdToken();
    localStorage.setItem("user", JSON.stringify(accessToken));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    console.log("User signed out successfully.");
  } catch (err) {
    console.log(err);
  }
};

export { signin, signUp, signOutUser };
