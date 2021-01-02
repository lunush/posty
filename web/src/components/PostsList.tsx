import { useQuery } from '@apollo/client';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { GET_POSTS } from '../requests';
import { AuthContext } from 'src/utils/auth';
import { useContext } from 'react';
import PostsNewPost from './PostsNewPost';
import PostCard from './PostCard';
import LoadingScreen from './LoadingScreen';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const context = useContext(AuthContext);

  if (loading) return <LoadingScreen />;
  if (error) return <Text style={styles.error}>{error.message}</Text>;

  return (
    <ScrollView style={styles.postsFeed}>
      {context.token ? <PostsNewPost /> : null}
      {data.getPosts.map((post: any) => (
        <PostCard post={post} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postsFeed: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  text: { color: '#bbb' },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default PostsList;
