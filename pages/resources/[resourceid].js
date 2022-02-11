import { useRouter } from "next/router";

export default function Resource() {
  const router = useRouter();
  const { resourceid } = router.query;
  //   alert(id);

  return <p className="h-fit">Post: {resourceid}</p>;
};


export async function getStaticProps({ params }) {
  const qsnap = await getDoc(doc(db, "resources", params.quickqid.toString()));
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
      props: { fallb },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, "quickqs"));
  let paths = [];
  snapshot.forEach((question) => {
    paths.push({ params: { quickqid: question.id.toString() } });
  });
  console.log("paths",paths);
  return {
    paths,
    fallback: true,
  };
}

// export default Resource;
