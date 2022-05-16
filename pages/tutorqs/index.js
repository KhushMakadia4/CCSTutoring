import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import Meta from "../../components/Meta";
import { db } from "../../utils/Firebase";
import { useEffect, useState } from "react";

export default function TutorQs({ tutorsnap }) {
  useEffect(() => {
    // alert("SLKDJ");
    // alert(tutorsnap.length);
    // console.log("useeffect", tutorsnap);
    // Object.keys(question.image).map((img) => {
    //   console.log(img);
    // });
  });

  //! classify questions as resolved or not and have automated search bar
  return (
    <div className="accent-lime-200 ">
      <Meta title="Our Resources" />
      {tutorsnap.map((question, i) => (
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
    </div>
  );
}

export async function getServerSideProps() {
  const tutorsnap = [];
  await getDocs(collection(db, "tutorqs")).then((docsnapshot) => {
    if (docsnapshot.size > 0) {
      docsnapshot.docs.forEach((question) => {
        const qfull = question.data();
        qfull.id = question.id.toString();
        console.log("image", question.data().image.toString());
        tutorsnap.push(qfull);
      });
    }
  });

  console.log("tutorsnap", tutorsnap);
  return {
    props: { tutorsnap },
  };
}
