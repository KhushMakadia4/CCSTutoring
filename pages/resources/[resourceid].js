import { useRouter } from "next/router";

const Resource = () => {
  const router = useRouter();
  const { resourceid } = router.query;
  //   alert(id);

  return <p className="h-fit">Post: {resourceid}</p>;
};

export default Resource;
