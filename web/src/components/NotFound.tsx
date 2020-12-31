import { StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import Twemoji from 'react-twemoji';

const NotFound = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      <Twemoji>😢</Twemoji>
    </Text>
    <Text style={styles.text}>Not Found</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#bbb',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default NotFound;
