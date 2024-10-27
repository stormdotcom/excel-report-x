import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, auth, googleProvider, githubProvider } from "./firebase";
import { signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const fireStore = getFirestore(app);

const addUserToFirestore = async (user) => {
    const userDocRef = doc(fireStore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            apiEndPoint: "",
            imagesAnnotated: 0,
            subscribed: {
                endDate: null,
                startDate: null,
                status: false
            }
        });
    }
};

const handleExistingAccount = async (error, provider) => {
    const email = error.customData.email;
    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
        const result = await signInWithPopup(auth, googleProvider);
        await linkWithCredential(result.user, provider.credential);
        const user = result.user;
        await addUserToFirestore(user);
    } else if (methods.includes(GithubAuthProvider.PROVIDER_ID)) {
        const result = await signInWithPopup(auth, githubProvider);
        await linkWithCredential(result.user, provider.credential);
        const user = result.user;
        await addUserToFirestore(user);
    }
    // Add additional providers as needed
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await addUserToFirestore(user);
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.reload("/");
    } catch (error) {
        if (error.code === "auth/account-exists-with-different-credential") {
            await handleExistingAccount(error, googleProvider);
        } else {
            // eslint-disable-next-line no-console
            console.error("Error signing in with Google: ", error);
        }
    }
};

export const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        await addUserToFirestore(user);
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.reload("/");
    } catch (error) {
        if (error.code === "auth/account-exists-with-different-credential") {
            await handleExistingAccount(error, githubProvider);
        } else {
            // eslint-disable-next-line no-console
            console.error("Error signing in with GitHub: ", error);
        }
    }
};
