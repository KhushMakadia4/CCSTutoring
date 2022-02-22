import { useRouter } from "next/router";
import { db } from "../../utils/Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function Resource({ rdata }) {
  const router = useRouter();
  const { resourceid } = router.query;
  //   alert(id);

  return (
    <div className="flex flex-col">
      {rdata === undefined ? (
        <h1>
          No page for{" "}
          {process.env.NEXT_PUBLIC_HOST.substring(
            0,
            process.env.NEXT_PUBLIC_HOST.length - 2
          ) +
            process.env.NEXT_PUBLIC_HOSTNAME +
            ":" +
            process.env.NEXT_PUBLIC_PORT +
            "/resources/" +
            resourceid}
        </h1>
      ) : (
        <>
          <div className="flex-1 h-52 w-52">
            <Image
              src={rdata.image}
              height="10%"
              width="10%"
              layout="responsive"
            ></Image>
          </div>
          <h1>{rdata.title}</h1>
          <h3>{rdata.type}</h3>
          <Link href="https://google.com">Link</Link>
          <h5>{rdata.description}</h5>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const rsnap = await getDoc(
    doc(db, "resources", params.resourceid.toString())
  );
  if (rsnap.exists()) {
    const rdata = rsnap.data();
    return {
      props: { rdata },
      revalidate: 10,
    };
  } else {
    const fallb = { title: "" };
    return {
      redirect: {
        destination: "/resources",
        permanent: false,
        // statusCode: 301
      },
    };
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, "resources"));
  let paths = [];
  snapshot.forEach((question) => {
    // console.log(question.data());
    paths.push({ params: { resourceid: question.id.toString() } });
  });
  console.log("resources", paths);
  return {
    paths,
    fallback: true,
  };
}

// export default Resource;
