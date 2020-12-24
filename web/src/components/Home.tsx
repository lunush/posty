import { StyleSheet, View } from 'react-native';
import PostsList from './PostsList';

const Home: React.FC = () => (
  <View style={styles.main}>
    <PostsList />
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  text: { fontWeight: 'bold', color: '#bbb' },
});

export default Home;
