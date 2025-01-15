import db from './firebase';
import { doc, updateDoc, arrayRemove, getDoc } from "firebase/firestore";


export default async function removeSong(username, song) {
    const docRef = doc(db, "Users", username); 

    
    try {
      await updateDoc(docRef, {
        tracks: arrayRemove(song),
      });
  
      
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        
        const updatedSongs = docSnap.data().tracks;
        console.log("Song removed successfully! Updated songs:", updatedSongs);
        return updatedSongs;
      } else {
        console.log("No such document!");
        return [];
      }
    } catch (error) {
      console.error("Error removing song: ", error);
      return false;
    }
  }
