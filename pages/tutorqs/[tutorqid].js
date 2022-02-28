import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "../../utils/Firebase";

export default function TutorQ({ tdata }) {
  const router = useRouter();
  const { tutorqid } = router.query;
  //   alert(id);
  

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
          <section id="app">
    <div className="max-w-2xl flex my-7 bg-white rounded-lg">
      <textarea type="text" class="input" placeholder="Write a comment"></textarea>
      <button className="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"> Add comment</button>
    </div>
  </section>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const tsnap = await getDoc(doc(db, "tutorqs", params.tutorqid.toString()));
  if (tsnap.exists()) {
    const tdata = tsnap.data();
    const usersnap = await getDoc(doc(db, "users", tdata.createdBy.toString()));
    tdata.createdBy =
      usersnap.data().firstName + " " + usersnap.data().lastName;
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
