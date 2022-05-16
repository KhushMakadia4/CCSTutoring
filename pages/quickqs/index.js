import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import Meta from "../../components/Meta";
import { db } from "../../utils/Firebase";
import { useEffect, useState } from "react";

export default function QuickQs({ quicksnap }) {
  useEffect(() => {
    // alert("SLKDJ");
    // alert(quicksnap.length);
    // console.log("useeffect", quicksnap);
  });

  //! classify questions as resolved or not and have automated search bar
  return (
    <div className="accent-lime-200 ">
      <Meta title="Our Resources" />
      {quicksnap.map((question, i) => (
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
    </div>
  );
}

export async function getServerSideProps() {
  const quicksnap = [];
  await getDocs(collection(db, "quickqs")).then((docsnapshot) => {
    if (docsnapshot.size > 0) {
      docsnapshot.docs.forEach((question) => {
        const qfull = question.data();
        qfull.id = question.id.toString();
        quicksnap.push(qfull);
      });
    }
  });

  console.log("quicksnap", quicksnap);
  return {
    props: { quicksnap },
  };
}
