
import db from './firebase';
import { getDoc, doc } from 'firebase/firestore';



export default async function login(username, loginPassword){
    const docRef = doc(db, "Users", username);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        if (snapshot.data().password === loginPassword) {
            
            console.log("You are logged in");
            return [true, snapshot.data().tracks];
            
        }
        else {
            console.log("Incorrect password");
            return false;
        }
            
    } else {
        console.log("User does not exist");
        return false;
    }
}
 
