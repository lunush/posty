import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Link } from 'react-router-dom';

const Login: React.FC = () => (
  <View style={styles.box}>
    <Text style={styles.title}>Login</Text>
    <TextInput placeholder="Login" style={styles.textInput} />
    <TextInput placeholder="Password" style={styles.textInput} />
    <Text style={styles.noAccount}>
      Don't have an account yet? Click
      <Link to="/register" style={{ color: 'teal', textDecoration: 'none' }}>
        {' '}
        here{' '}
      </Link>
      to get one!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    color: '#bbb',
    fontSize: 32,
    height: 40,
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#222',
    fontSize: 20,
    marginTop: 10,
  },
  noAccount: {
    color: '#bbb',
    fontSize: 12,
    marginTop: 20,
  },
});

export default Login;
