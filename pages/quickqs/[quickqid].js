import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../utils/Firebase";

export default function QuickQ({ qdata }) {
  const router = useRouter();
  const { quickqid } = router.query;
  const { user } = useAuth();

  // const [qdata, ] = useState(qdata)
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // onSnapshot()
    const tempComm = [];
    qdata.comments.forEach((comment) => {
      tempComm.push(comment);
    });
    setComments(tempComm);
    // console.log("useEffect", comments[1])
  }, []);

  return (
    <div className="flex flex-col">
      {qdata === undefined ? (
        <h1>
          No page for{" "}
          {process.env.NEXT_PUBLIC_HOST.substring(
            0,
            process.env.NEXT_PUBLIC_HOST.length - 2
          ) +
            process.env.NEXT_PUBLIC_HOSTNAME +
            ":" +
            process.env.NEXT_PUBLIC_PORT +
            "/quickid/" +
            quickqid}
        </h1>
      ) : (
        <>
          <div className="flex-1 h-52 w-52">
            <Image
              src={qdata.image}
              height="10%"
              width="10%"
              layout="responsive"
            ></Image>
          </div>
          <h1>{qdata.title}</h1>
          <h3>{qdata.description}</h3>
          <h4>{qdata.createdBy}</h4>
          <h5>resolved: {qdata.resolved.toString()}</h5>
          {qdata.resolved.toString() === "false" && user.tutor ? (
            <section id="app">
              <div className="max-w-2xl flex my-7 bg-white rounded-lg">
                <input
                  key={qdata.comments.length}
                  id="commentTBox"
                  className="flex object-contain w-fit"
                  type="text"
                  placeholder="Write a comment"
                ></input>
                <button
                  onClick={async () => {
                    await addDoc(
                      collection(
                        db,
                        "quickqs/" + quickqid.toString() + "/comments"
                      ),
                      {
                        // writtenBy: "Khushjeet Makadamian", //! change later to signed in user name
                        writtenBy: user.fullName,
                        text: document
                          .getElementById("commentTBox")
                          .value.toString(),
                        timestamp: serverTimestamp(),
                      }
                    ).then(async () => {
                      // setComments(comments=>[ {writtenBy: "Khushjeet Makadamian", text: document
                      setComments((comments) => [
                        {
                          writtenBy: user.fullName,
                          text: document
                            .getElementById("commentTBox")
                            .value.toString(),
                        },
                        ...comments,
                      ]); //!Change later to signed in user name

                      document.getElementById("commentTBox").value = "";
                    });
                  }}
                  className="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"
                >
                  Add comment
                </button>
              </div>
            </section>
          ) : (
            <></>
          )}
          <br></br>
          <h1>Comments</h1>
          {comments.map((comment, i) => (
            <div>
              <h3>
                {comment.writtenBy}: {comment.text}
              </h3>
              <div className="h-20 border-t-8 border-black border-double ml-48 mr-48" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const qsnap = await getDoc(doc(db, "quickqs", params.quickqid.toString()));
  if (qsnap.exists()) {
    const qdata = qsnap.data();
    qdata.id = params.quickqid.toString();

    // const usersnap = await getDoc(doc(db, "users", qdata.createdBy.toString()));
    // qdata.createdBy =
    //   usersnap.data().firstName + " " + usersnap.data().lastName;
    qdata.comments = [];
    const qtemp = query(
      collection(db, "quickqs/" + params.quickqid.toString() + "/comments"),
      orderBy("timestamp", "desc")
    );
    await getDocs(qtemp).then((comSnap) => {
      if (comSnap.size > 0) {
        comSnap.docs.forEach((comment) => {
          const commTemp = {
            text: comment.data().text,
            writtenBy: comment.data().writtenBy,
            //?dont really need timestamp here but can add here
          };
          qdata.comments.push(commTemp);
        });
      }
    });
    console.log(qdata);
    return {
      props: { qdata },
      revalidate: 10,
    };
  } else {
    const fallb = { title: "" };
    return {
      redirect: {
        destination: "/quickqs",
        permanent: false,
        // statusCode: 301
      },
    };
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, "quickqs"));
  let paths = [];
  snapshot.forEach((question) => {
    paths.push({ params: { quickqid: question.id.toString() } });
  });
  console.log("paths", paths);
  return {
    paths,
    fallback: true,
  };
}
