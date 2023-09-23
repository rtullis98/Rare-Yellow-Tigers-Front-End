import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postsData';
import ViewPost from '../../components/ViewPost';
import AddCommentForm from '../../components/AddCommentForm';
import { getCommentsByPostId } from '../../api/commentData';
import ListComponent from '../../components/ListComponent';

export default function SinglePostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getComments = () => {
    getCommentsByPostId(id).then((data) => setComments(data));
  };
  useEffect(() => {
    if (id) {
      getSinglePost(id).then((data) => {
        setPost(data);
      });
    }
    getComments();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-3">
      <h2>View a Post</h2>
      <div className="mt-5" style={{ display: 'flex' }}>
        <div style={{ flex: 2 }}>
          {Object.keys(post).length > 0 && (
            <ViewPost posts={post} style={{ width: '100%' }} />
          )}
          <div className="w-70">
            <table className="w-75" style={{ fontSize: '16px' }}>
              <thead> <h5>Comments:</h5></thead>
              <tbody>
                {comments.map((comment) => (<ListComponent key={comment.id} item={comment.content} />))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <AddCommentForm postId={post[0]?.id} />
        </div>

      </div>
    </div>
  );
}
