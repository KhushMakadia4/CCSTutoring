import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../utils/Firebase";



export default function TutorQ({ tdata }) {
  const router = useRouter();
  const { tutorqid } = router.query;
  //   alert(id);

  const [comments, setComments] = useState([])


  useEffect(()=>{
    // onSnapshot()
    const tempComm = []
    tdata.comments.forEach((comment)=>{
      tempComm.push(comment)
    })
    setComments(tempComm)
    // console.log("useEffect", comments[1])
  }, [])

  return (
    <div className="flex flex-col">
      {tdata === undefined ? (
        <h1>
          No page for{" "}
          {process.env.NEXT_PUBLIC_HOST.substring(
            0,
            process.env.NEXT_PUBLIC_HOST.length - 2
          ) +
            process.env.NEXT_PUBLIC_HOSTNAME +
            ":" +
            process.env.NEXT_PUBLIC_PORT +
            "/tutorqs/" +
            tutorqid}
        </h1>
      ) : (
        <>
          <div className="flex-1 h-52 w-52">
            <Image
              src={tdata.image}
              height="10%"
              width="10%"
              layout="responsive"
            ></Image>
          </div>
          <h1>{tdata.title}</h1>
          <h3>{tdata.description}</h3>
          <h4>{tdata.createdBy}</h4>
          <h5>resolved: {tdata.resolved.toString()}</h5>
          {tdata.resolved.toString() === "false" ? (
            <section id="app">
              <div className="max-w-2xl flex my-7 bg-white rounded-lg">
                <input
                  id="commentTBox"
                  type="text"
                  placeholder="Write a comment"
                ></input>
                <button
                  onClick={async () => {
                    // await addDoc(
                    //   collection(
                    //     db,
                    //     "tutorqs/" + tutorqid.toString() + "/comments"
                    //   ),
                    //   {
                    //     writtenBy: "Khushjeet Makadamian", //! change later to signed in user name
                    //     text: document
                    //       .getElementById("commentTBox")
                    //       .value.toString(),
                    //   }
                    // ).then(async () => {
                    //   tdata.comments = [];
                    //   await getDocs(
                    //     collection(
                    //       db,
                    //       "tutorqs/" + tutorqid.toString() + "/comments"
                    //     )
                    //   ).then((comSnap) => {
                    //     if (comSnap.size > 0) {
                    //       comSnap.docs.forEach((comment) => {
                    //         tdata.comments.push(comment.data());
                    //       });
                    //     }
                    //   });
                    // });
                    await addDoc(
                      collection(
                        db,
                        "tutorqs/" + tutorqid.toString() + "/comments"
                      ),
                      {
                        writtenBy: "Khushjeet Makadamian", //! change later to signed in user name
                        text: document
                          .getElementById("commentTBox")
                          .value.toString(),
                        timestamp: serverTimestamp()
                      }
                    ).then(async () => {
                      setComments(comments=>[ {writtenBy: "Khushjeet Makadamian", text: document
                      .getElementById("commentTBox") 
                      .value.toString()}, ...comments])//!Change later to signed in user name


                      document.getElementById("commentTBox").value = ""
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
  const tsnap = await getDoc(doc(db, "tutorqs", params.tutorqid.toString()));
  if (tsnap.exists()) {
    const tdata = tsnap.data();
    tdata.id = params.tutorqid.toString();
    // const usersnap = await getDoc(doc(db, "users", tdata.createdBy.toString()));
    // tdata.createdBy =
    //   usersnap.data().firstName + " " + usersnap.data().lastName;
    tdata.comments = [];
    // await getDocs(
    //   collection(db, "tutorqs/" + params.tutorqid.toString() + "/comments")
    // ).then((comSnap) => {
    //   if (comSnap.size > 0) {
    //     comSnap.docs.forEach((comment) => {
    //       tdata.comments.push(comment.data());
    //     });
    //   }
    // });
    const ttemp = query(collection(db, "tutorqs/"+params.tutorqid.toString()+"/comments"), orderBy("timestamp", "desc"))
    await getDocs(ttemp).then((comSnap) =>{
      if (comSnap.size>0) {
        comSnap.docs.forEach((comment) => {
          const commTemp = {
            text: comment.data().text,
            writtenBy: comment.data().writtenBy,
            //?dont really need timestamp here but can add here
          }
          tdata.comments.push(commTemp)
        })
      }
    })
    return {
      props: { tdata },
      revalidate: 10,
    };
  } else {
    const fallb = { title: "" };
    return {
      redirect: {
        destination: "/tutorqs",
        permanent: false,
        // statusCode: 301
      },
    };
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, "tutorqs"));
  let paths = [];
  snapshot.forEach((question) => {
    paths.push({ params: { tutorqid: question.id.toString() } });
  });
  console.log("paths", paths);
  return {
    paths,
    fallback: true,
  };
}
