import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "../../utils/Firebase";

export default function QuickQ({ qdata }) {
  const router = useRouter();
  const { quickqid } = router.query;
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
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const qsnap = await getDoc(doc(db, "quickqs", params.quickqid.toString()));
  if (qsnap.exists()) {
    const qdata = qsnap.data();
    const usersnap = await getDoc(doc(db, "users", qdata.createdBy.toString()));
    qdata.createdBy =
      usersnap.data().firstName + " " + usersnap.data().lastName;
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
