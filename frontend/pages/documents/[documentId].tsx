import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { documentId } = router.query;

  return <p>Post: {documentId}</p>;
};

export default Post;
