import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/Firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // const [userQPosts, setUserQPosts] = useState([]);
  // const [userTPosts, setUserTPosts] = useState([]);
  // const [loaded, setLoaded] = useState(false);

  // console.log("user", user);

  // useEffect(async () => {
  //   const userQPosts = [];
  //   const userTPosts = [];
  //   await getDocs(collection(db, "users/" + user.email + "/posts")).then(
  //     (docsnapshot) => {
  //       if (docsnapshot.size > 0) {
  //         docsnapshot.docs.forEach(async (questionInfo) => {
  //           const qInfo = questionInfo.data();
  //           if (qInfo.postType == "quickq") {
  //             const postRef = await getDoc(doc(db, "quickqs/" + qInfo.postId));
  //             // userQPosts.push(postRef.data());
  //             setUserQPosts([postRef.data(), ...userQPosts]);
  //           } else {
  //             const postRef = await getDoc(doc(db, "tutorqs/" + qInfo.postId));
  //             // userTPosts.push(postRef.data());
  //             setUserTPosts([postRef.data(), ...userTPosts]);
  //           }
  //         });

  //         setLoaded(true);
  //       }
  //     }
  //   );
  //   console.log("Dashboard Quick Qs", userQPosts);
  //   console.log("Dashboard Tutor Qs", userTPosts);
  // }, []);

  return (
    <div className="bg-gray-300 h-screen">
      <Meta />
      <h1>{user.fullName}</h1>
      <h1>{user.tutor ? <>Hours: {user.hours} </> : null}</h1>
      <h1 id="userEmail">{user.email}</h1>
      <h1>Your Posts: </h1>
      {/* {loaded ? (
        <>
          <h1>{user.fullName}</h1>
          <h1>{user.tutor ? <>Hours: {user.hours} </> : null}</h1>
          <h1 id="userEmail">{user.email}</h1>
          <h1>Your Posts: </h1>
          <h1>Quick Questions:</h1>
          {userQPosts.map((question, i) => (
            <div key={question.id}>
              <h1>Question {i + 1}</h1>
              <div className="flex-1 h-52 w-52">
                <Image
                  key={question.image + i}
                  priority={true}
                  src={question.image}
                  height="10%"
                  width="10%"
                  layout="responsive"
                ></Image>
              </div>
              <h2>{question.title}</h2>
              <h3>By: {question.createdBy}</h3>
              <h3>Resolved: {question.resolved.toString()}</h3>
              <Link href={"/quickqs/" + question.id}>Click here for more</Link>
              <br></br>
              <div className="h-20 border-t-8 border-black border-double ml-48 mr-48" />
            </div>
          ))}
          <h1>Tutor Questions:</h1>
          {userTPosts.map((question, i) => (
            <div key={question.id}>
              <h1>Question {i + 1}</h1>
              <div className="flex-wrap h-156 w-52">
                {question.image
                  .toString()
                  .split(",")
                  .map((img, i) => (
                    <>
                      <Image
                        key={img + i}
                        priority={true}
                        src={img}
                        height="10%"
                        width="10%"
                        layout="responsive"
                      ></Image>

                      <div className="h-5 border-t-8 border-black  border-double ml-48 mr-48" />
                    </>
                  ))}
              </div>
              <h2>{question.title}</h2>
              <h3>By: {question.createdBy}</h3>
              <h3>Resolved: {question.resolved.toString()}</h3>
              <Link href={"/tutorqs/" + question.id}>Click here for more</Link>
              <br></br>
              <div className="h-20 border-t-8 border-black border-double ml-48 mr-48" />
            </div>
          ))}
        </>
      ) : (
        <h1>Loading...</h1>
      )} */}

      <Link href="/create">
        <a className="text-3xl font-bold underline">create</a>
      </Link>

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
    // )
  );
}

// export async function getServerSideProps(context) {
//   const { user } = useAuth();
//   // const user = document.getElementById("userEmail").value;
//   console.log(context);
//   const userQPosts = [];
//   const userTPosts = [];
//   await getDocs(collection(db, "users/" + user.email + "/posts")).then(
//     (docsnapshot) => {
//       if (docsnapshot.size > 0) {
//         docsnapshot.docs.forEach(async (questionInfo) => {
//           const qInfo = questionInfo.data();
//           if (qInfo.postType == "quickq") {
//             const postRef = await getDoc(doc(db, "quickqs/" + qInfo.postId));
//             userQPosts.push(postRef.data());
//           } else {
//             const postRef = await getDoc(doc(db, "tutorqs/" + qInfo.postId));
//             userTPosts.push(postRef.data());
//           }
//         });
//       }
//     }
//   );
//   console.log("Dashboard Quick Qs", userQPosts);
//   console.log("Dashboard Tutor Qs", userTPosts);
//   return {
//     props: { userQPosts, userTPosts },
//   };
// }
