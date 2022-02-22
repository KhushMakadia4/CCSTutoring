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
  });

  //! classify questions as resolved or not and have automated search bar
  return (
    <div className="accent-lime-200 ">
      <Meta title="Our Resources" />
      {tutorsnap.map((question, i) => (
        <div key={question.id}>
          <h1>Question {i + 1}</h1>
          <div className="flex-1 h-52 w-52">
            <Image
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
        tutorsnap.push(qfull);
      });
    }
  });

  console.log("tutorsnap", tutorsnap);
  return {
    props: { tutorsnap },
  };
}
