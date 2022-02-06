import { useRouter } from "next/router";

const TutorQ = () => {
  const router = useRouter();
  const { tutorqid } = router.query;
  //   alert(id);

  return <p>TutorQ: {tutorqid}</p>;
};

export default TutorQ;
