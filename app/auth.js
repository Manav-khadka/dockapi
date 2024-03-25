import { GithubAuthProvider, signInWithPopup, } from "firebase/auth";
import { auth } from "./firebase.js";
import { onAuthStateChanged as _onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged from firebase/auth

export function onAuthStateChanged(cb) {
    return _onAuthStateChanged(auth, cb);
}

export async function signInWithGithub() {
    const provider = new GithubAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const userCredential = result;
        // const accessToken = userCredential.credential.accessToken;

        // console.log("Access Token: ", accessToken);
        console.log("User: ", userCredential);


    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}