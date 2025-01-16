import db from './firebase';
import { getDoc, doc } from 'firebase/firestore';



export default async function login(username, loginPassword){
    const docRef = doc(db, "Users", username);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        if (snapshot.data().password === loginPassword) {
            
            return [true, snapshot.data().tracks];
            
        }
        else {
            alert("Incorrect Password");
            return false;
        }
            
    } else {
        alert("User does not exist");
        return false;
    }
}
 
