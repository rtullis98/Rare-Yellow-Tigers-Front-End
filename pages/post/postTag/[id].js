import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../../api/postsData';
import AddTagToPost from '../../../components/AddTagToPost';

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
      <h2>Add a Tag</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2 }}>
          {Object.keys(post).length > 0 && (
            <AddTagToPost postId={post} style={{ width: '100%' }} />
          )}
        </div>
      </div>
    </div>
  );
}
