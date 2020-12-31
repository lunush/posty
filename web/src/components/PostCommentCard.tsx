import { StyleSheet, Text, View } from 'react-native';
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
  <View key={comment.id} style={styles.commentContainer}>
    <View style={styles.commentInnerContainer}>
      <PostCommentCardTop comment={comment} />
      <Text style={styles.commentBody}>{comment.commentBody}</Text>
      <PostCommentCardBottom comment={comment} postId={postId} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    height: '13rem',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#222',
  },
  commentBody: {
    color: '#bbb',
    height: '100%',
    width: '100%',
    padding: 8,
    marginVertical: 10,
  },
});

export default PostCommentCard;
