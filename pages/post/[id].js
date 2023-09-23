import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postsData';
import ViewPost from '../../components/ViewPost';
import AddCommentForm from '../../components/AddCommentForm';

export default function SinglePostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    if (id) {
      getSinglePost(id).then((data) => {
        setPost(data);
      });
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View a Post</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2 }}>
          {Object.keys(post).length > 0 && (
            <ViewPost posts={post} style={{ width: '100%' }} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <AddCommentForm postId={post[0]?.id} />
        </div>
      </div>
    </div>
  );
}
