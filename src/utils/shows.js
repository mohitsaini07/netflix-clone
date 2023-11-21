import {
  addDoc,
  and,
  collection,
  deleteDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const favoritesCollection = collection(db, "favorites");

export async function addShowToFavorites(email, showId) {
  const docRef = await addDoc(favoritesCollection, {
    email,
    showId,
  });

  return docRef;
}

export async function getUserFavourites(email) {
  const snapshot = await getDocs(
    favoritesCollection,
    where("email", "==", email)
  );

  const favorites = [];
  snapshot.forEach((doc) => {
    favorites.push(doc.data());
  });

  return favorites;
}

export async function removeFromFavorites(email, showId) {
  // const q = query(
  //   favoritesCollection,
  //   where("email", "==", email),
  //   where("showId", "==", showId)
  // );
  await deleteDoc(
    favoritesCollection,
    where("email", "==", email)
    // and(where("email", "==", email), where("showId", "==", showId))
  );
}
