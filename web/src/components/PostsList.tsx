import { useQuery } from '@apollo/client';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { GET_POSTS } from '../requests';
import { AuthContext } from 'src/utils/auth';
import { useContext } from 'react';
import NewPost from './NewPost';
import PostCard from './PostCard';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const context = useContext(AuthContext);

  if (loading) return <ActivityIndicator style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView style={styles.postsFeed}>
      {context.token ? <NewPost /> : null}
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
  loading: {
    height: 50,
    width: 50,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default PostsList;
