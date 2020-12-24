import { useQuery } from '@apollo/client';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GET_POSTS } from '../requests';
import { AuthContext } from 'src/utils/auth';
import { useContext } from 'react';
import NewPost from './NewPost';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const context = useContext(AuthContext);

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>Error.</Text>;

  return (
    <ScrollView style={styles.postsFeed}>
      {context.token ? <NewPost /> : null}
      {data.getPosts.map((post: any) => (
        <View key={post.id} style={styles.postBox}>
          <View style={styles.post}>
            <Text style={styles.text}>{post.postBody}</Text>
            <Text style={styles.text}>{post.username}</Text>
          </View>
        </View>
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
  postBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    padding: 20,
    margin: 10,
    borderRadius: 15,
    height: '6rem',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#222',
  },
  text: { fontWeight: 'bold', color: '#bbb' },
});

export default PostsList;
