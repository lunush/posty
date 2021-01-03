import { StyleSheet, Text } from 'react-native';
import { color } from 'src/globalStyles';
import Card from 'src/components/common/Card';
import PostCardBottom from './PostCardBottom';
import PostCardTop from './PostCardTop';

interface Props {
  post: {
    id: string;
    createdAt: string;
    username: string;
    name: string;
    postBody: string;
    likeCount: number;
    likes: any[];
    commentCount: number;
  };
}

const PostCard: React.FC<Props> = ({ post }) => (
  <Card id={post.id}>
    <PostCardTop post={post} />
    <Text style={styles.postBody}>{post.postBody}</Text>
    <PostCardBottom post={post} />
  </Card>
);

const styles = StyleSheet.create({
  postBody: {
    color: color.primary,
    height: '100%',
    width: '100%',
    padding: 8,
    marginVertical: 10,
  },
});

export default PostCard;
