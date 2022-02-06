import { firestore } from "./Firebase";

const getUsers = async () => {
  const snapshot = await firestore.collection("users").get();
  snapshot.docs.forEach((doc) => console.log(doc.data()));
};

export { getUsers };
