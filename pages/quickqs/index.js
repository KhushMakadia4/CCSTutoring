import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import Meta from "../../components/Meta";
import { db } from "../../utils/Firebase";
import { useEffect } from "react";

export default function QuickQs({ quicksnap }) {
  useEffect(() => {
    console.log("useeffect quicksnap", quicksnap);
  }, []);
  return (
    <div className="accent-lime-200 ">
      <Meta title="Our Resources" />
      {quicksnap.map((question, i) => (
        <div key={question.id}>
          <h1>Question {i + 1}</h1>
          <div className="flex-1 h-52 w-52">
            <Image
              src={question.data.image}
              height="10%"
              width="10%"
              layout="responsive"
            ></Image>
          </div>
          <h2>{question.data.title}</h2>
          <h3>By: {question.data.createdBy}</h3>
          <h3>Resolved: {question.data.resolved.toString()}</h3>
          <Link href={"/quickqs/" + question.id}>Click here for more</Link>
          <br></br>
          <div className="h-20 border-t-8 border-black border-double ml-48 mr-48" />
        </div>
      ))}
    </div>
    // )
  );
}

//TODO: This bullshit
//Hola
//!FUCK THIS SHIT

export async function getStaticProps() {
  const quicksnap = [];
  console.log(1);
  const snapshot = await getDocs(collection(db, "quickqs"));
  console.log(2);
  snapshot.forEach(async (question) => {
    console.log(3);
    const qdata = question.data();
    console.log("qdata", qdata);
    const usersnap = await getDoc(
      doc(db, "users", question.data().createdBy.toString())
    );

    console.log("usersnap", usersnap.data());
    qdata.createdBy =
      usersnap.data().firstName + " " + usersnap.data().lastName;

    console.log("6 qdata", qdata);
    quicksnap.push({ id: question.id.toString(), data: qdata });

    console.log("quicksnap", quicksnap[0].data.createdBy);
  });
  console.log("quisckqs index js", quicksnap);
  return {
    props: { quicksnap },
    revalidate: 10,
  };
}
