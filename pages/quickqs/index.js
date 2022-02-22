import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import Meta from "../../components/Meta";
import { db } from "../../utils/Firebase";

export default function QuickQs({ quicksnap }) {

  const logger = () => {
    // alert(quicksnap[0])
    console.log("LSDKJFLSDKJF");
    console.log("quicksnap", quicksnap);
  }
  return (
    <div className="accent-lime-200 ">
      <Meta title="Our Resources" />
      <div className="bg-red-500" onClick={logger}><br></br></div>
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

// async function getQDocData(question) {
//   const qdata = question.data();
//     console.log("qdata", qdata);
//     const usersnap = await getDoc(
//       doc(db, "users", question.data().createdBy.toString())
//     );

//     console.log("usersnap", usersnap.data());
//     qdata.createdBy =
//       usersnap.data().firstName + " " + usersnap.data().lastName;


//     return {id: question.id.toString(), data: qdata};
// }


// export async function getServerSideProps() {
//   const quicksnap = [];
//   const snapshot = await getDocs(collection(db, "quickqs"))
//   snapshot.forEach(async (question) => {
//     // const qdata = question.data();
//     // console.log("qdata", qdata);
//     // const usersnap = await getDoc(
//     //   doc(db, "users", question.data().createdBy.toString())
//     // );

//     // console.log("usersnap", usersnap.data());
//     // qdata.createdBy =
//     //   usersnap.data().firstName + " " + usersnap.data().lastName;

//     // console.log("6 qdata", qdata);
//     // quicksnap.push({ id: question.id.toString(), data: qdata });

//     // console.log("quicksnap", quicksnap[0].data.title);
//     quicksnap.push(getQDocData(question))
//   });
//   console.log("quisckqs index js", quicksnap);
//   return {
//     props: { quicksnap },
//     // revalidate: 10,
//   };
// }

export async function getServerSideProps() {
  const quicksnap = [];
  const snapshot = await getDocs(collection(db, "quickqs"));
  console.log("snapshot empty: ", snapshot.empty);
  console.log("snapshot size: ", snapshot.size);
  console.log("snapshot meta: ", snapshot.metadata);
  // var i=0
  // while(i<snapshot.size) {
  if (snapshot.size > 0) {
    // Promise.all(
    var ssize = snapshot.size
    snapshot.forEach(async (question) => {
      const qdata = question.data();

      const usersnap = await getDoc(
        doc(db, "users", question.data().createdBy.toString())
      );

      qdata.createdBy =
        usersnap.data().firstName + " " + usersnap.data().lastName;

      const qfull = qdata;
      qfull.id = question.id.toString();

      console.log("qfull", qfull);
      quicksnap.push(qfull);
    });
    //   i++
    // }
    console.log("quicksnap", quicksnap);
    return {
      props: { quicksnap },
      // revalidate: 10,
    };
    
  } else {
    quicksnap.push("no data");
    return {
      props: { quicksnap },
    };
  }
}