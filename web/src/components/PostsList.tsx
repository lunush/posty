import { useQuery } from '@apollo/client';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GET_POSTS } from '../requests';
import { AuthContext } from 'src/utils/auth';
import { useContext } from 'react';
import NewTwibt from './NewTwibt';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const context = useContext(AuthContext);

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>Error.</Text>;

  return (
    <ScrollView style={styles.twibtFeed}>
      {context.token ? <NewTwibt /> : null}
      {data.getPosts.map((post: any) => (
        <View key={post.id} style={styles.twibtBox}>
          <View style={styles.twibt}>
            <Text style={styles.text}>{post.postBody}</Text>
            <Text style={styles.text}>{post.username}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  twibtFeed: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  twibtBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twibt: {
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
