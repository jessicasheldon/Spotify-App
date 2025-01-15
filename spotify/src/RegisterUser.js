
import { doc, setDoc} from 'firebase/firestore';
import db from './firebase'
import login from './Login'

export default async function register(username, loginPassword) {
    const docRef = doc(db, "Users", username);
    const payload = {password: loginPassword};


    await setDoc(docRef, payload);
    console.log("User registered");

    
    return await login(username, loginPassword);
    
}