import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postsData';
import PostGrid from '../../components/PostGrid';

export default function SinglePostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    if (id) {
      getSinglePost(id).then((data) => {
        setPost(data);
        console.warn(data);
      });
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View a Post</h2>
      {Object.keys(post).length > 0 && (
      <PostGrid posts={post} />
      )}
    </div>
  );
}
