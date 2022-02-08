
import { collection, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../../utils/Firebase";

export default function QuickQ({props}) {
  const router = useRouter();
  const { quickqid } = router.query;
  //   alert(id);

  return <p>QuickQ: {quickqid}</p>;
};


export async function getStaticPaths() {
  // const router = useRouter();
  // const {quickqid} = router.query
  const snapshot = await getDocs(collection(db, "quickqs"))
  // const paths = snapshot.array.map(question=> ({
  //   params: {id: question.id}
  // }))
  let paths = []
  snapshot.forEach((question) => {
    paths.push({params: {quickqid: question.id.toString()}})
  })
  console.log(paths)
  return {
    paths,
    // paths: [
    //   { params: {id: quickqid}}
    // ],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const {quickqid} = params;
  console.log(quickqid)
  return {
    props: {quickqid},
    revalidate: 10,
    
  }
}