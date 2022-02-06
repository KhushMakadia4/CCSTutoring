import { useRouter } from "next/router";

const QuickQ = () => {
  const router = useRouter();
  const { quickqid } = router.query;
  //   alert(id);

  return <p>QuickQ: {quickqid}</p>;
};

export default QuickQ;
