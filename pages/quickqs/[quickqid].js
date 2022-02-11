import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "../../utils/Firebase";

export default function QuickQ({ qdata }) {
  const router = useRouter();
  const { quickqid } = router.query;
  //   alert(id);

  return (
    <div className="flex flex-col">
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
      <h5>resolved: {qdata.resolved}</h5>
    </div>
  );
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, "quickqs"));
  let paths = [];
  snapshot.forEach((question) => {
    // console.log(question);
    paths.push({ params: { quickqid: question.id.toString() } });
  });
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log("params", params.quickqid);
  let fallb = { title: "This page does not exist" };
  const qsnap = await getDoc(doc(db, "quickqs", params.quickqid.toString()));
  if (qsnap.exists()) {
    const qdata = qsnap.data();
    const usersnap = await getDoc(doc(db, "users", qdata.createdBy.toString()));
    qdata.createdBy =
      usersnap.data().firstName + " " + usersnap.data().lastName;
    console.log("qsnap data", qdata);
    return {
      props: { qdata },
      revalidate: 10,
    };
  } else {
    console.log("qsnap data", "does not exist");
    return {
      props: { fallb },
      revalidate: 10,
    };
  }
}
