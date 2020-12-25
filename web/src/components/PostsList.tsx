import { useQuery } from '@apollo/client';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { GET_POSTS } from '../requests';
import { AuthContext } from 'src/utils/auth';
import { useContext } from 'react';
import NewPost from './NewPost';
import PostCard from './PostCard';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const context = useContext(AuthContext);

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>Error.</Text>;

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
});

export default PostsList;
