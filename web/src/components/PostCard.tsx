import { StyleSheet, Text, View } from 'react-native';
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
  <View key={post.id} style={styles.postContainer}>
    <View style={styles.postInnerContainer}>
      <View style={styles.full}>
        <PostCardTop post={post} />
        <Text style={styles.postBody}>{post.postBody}</Text>
        <PostCardBottom post={post} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postInnerContainer: {
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
  link: {
    height: '13rem',
    width: '100%',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  postBody: {
    color: '#bbb',
    height: '100%',
    width: '100%',
    padding: 8,
    marginVertical: 10,
  },
});

export default PostCard;
