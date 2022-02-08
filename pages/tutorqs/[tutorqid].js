import { useRouter } from "next/router";

export default function TutorQ() {
  const router = useRouter();
  const { tutorqid } = router.query;
  //   alert(id);

  return <p>TutorQ: {tutorqid}</p>;
};

