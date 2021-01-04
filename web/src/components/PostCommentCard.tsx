import { StyleSheet, Text } from 'react-native';
import Card from 'src/components/common/Card';
import { color } from 'src/globalStyles';
import PostCommentCardBottom from './PostCommentCardBottom';
import PostCommentCardTop from './PostCommentCardTop';

interface Props {
  comment: {
    id: string;
    createdAt: string;
    username: string;
    name: string;
    commentBody: string;
    likeCount: number;
    likes: any[];
  };
  postId: string;
}

const PostCommentCard: React.FC<Props> = ({ comment, postId }) => (
  <Card id={comment.id}>
    <PostCommentCardTop comment={comment} />
    <Text style={styles.commentBody}>{comment.commentBody}</Text>
    <PostCommentCardBottom comment={comment} postId={postId} />
  </Card>
);

const styles = StyleSheet.create({
  commentBody: {
    color: color.primary,
    height: '100%',
    width: '100%',
    padding: 4,
    marginVertical: 10,
  },
});

export default PostCommentCard;
