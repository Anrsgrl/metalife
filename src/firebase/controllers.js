import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

//* Remove item
export const removeItem = async (collectionRef, docId) => {
  try {
    const itemRef = doc(collectionRef, docId);

    await deleteDoc(itemRef);
    toast.success("Succesfully Deleted.");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    toast.error("Error: " + error.message); // Hata mesajını düzgün bir şekilde görüntülemek için "+" kullanmalısınız.
    console.error("Error: " + error.message); // Hata mesajını konsola da yazdırın.
  }
};

//* Check user availability
const checkUsernameAvailability = async (username) => {
  const userssCollectionRef = collection(db, "users");
  const q = query(userssCollectionRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

//* Check email is existing
const checkEmailExisting = async (email) => {
  const userssCollectionRef = collection(db, "users");
  const q = query(userssCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

//* Sign up
export const handleSignUp = async (
  e,
  name,
  surname,
  username,
  mobile,
  email,
  password
) => {
  e.preventDefault();
  const userssCollectionRef = collection(db, "users");
  const usernameAvailable = await checkUsernameAvailability(username);

  if (!usernameAvailable) {
    toast.error("Bu istifadəçi adı artıq mövcuddur.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Profil uğurla yaradıldı.");
    addDoc(userssCollectionRef, {
      name,
      surname,
      username,
      email,
      mobile,
      password,
    });
    updateProfile(auth.currentUser, {
      displayName: username,
    });
    window.location.href("/");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("Bu emaildən istifadə olunmuşdur.");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Yanlış e-poçt ünvanı.");
    } else if (error.code === "auth/operation-not-allowed") {
      toast.error("Əməliyyat qadağandır.");
    } else if (error.code === "auth/weak-password") {
      toast.error("Şifrəniz çox zəifdir.");
    } else {
      console.log("An error occurred:", error);
    }
  }
};

//* Sign in
export const handleSignIn = async (e, email, password) => {
  e.preventDefault();
  try {
    if (checkEmailExisting(email)) {
      await signInWithEmailAndPassword(auth, email, password);
      toast(`Xoş gəldiniz ${auth?.currentUser?.displayName}!`, {
        icon: "👋",
      });
    } else {
      toast.error("Qeyd etdiyiniz məlumatlar heç bir istifadəçi ilə uymur.");
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      toast.error("İstifadəçi tapılmadı.");
    } else if (error.code === "auth/invalid-email") {
      alert("Yanlış e-poçt ünvanı.");
    } else if (error.code === "auth/wrong-password") {
      toast.error("Şifrəniz yanlışdır.");
    } else if (error.code === "auth/too-many-requests") {
      toast.error(
        "Çox yanlış kod girdiyiniz üçün, profiliniz keçici olaraq bloklanmışdır."
      );
    } else {
      console.log("An error occurred:", error);
    }
  }
};

//* Password reset
export const handlePasswordReset = async (e, resetEmail) => {
  e.preventDefault();
  try {
    await sendPasswordResetEmail(auth, resetEmail);
    toast.success("Şifrə sıfırlama e-poçtu göndərildi.");
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      toast.error("Yanlış e-poçt ünvanı.");
    } else if (error.code === "auth/user-not-found") {
      toast.error("İstifadəçi emaili tapılmadı.");
    } else {
      console.log("Şifrə sıfırlama xətası:", error);
    }
  }
};

//* Email verification
export const sendVerification = () => {
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("E-poçt göndərildi.");
      })
      .catch((error) => {
        toast.erro("E-poçt göndəriləmmədi.");
        console.log("E-poçt göndərmə xətası:", error);
      });
  }
};
