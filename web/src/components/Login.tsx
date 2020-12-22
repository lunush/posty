import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { LOGIN } from 'src/requests';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from 'src/utils/auth';

const Login: React.FC = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState({
    isSubmitted: false,
    username: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOGIN, {
    update(_, { data: { login: token } }) {
      if (token) {
        context.login(token);
        history.push('/');
      }
    },
    variables: {
      username: state.username,
      password: state.password,
    },
  });

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    value: string
  ) => {
    setState({ ...state, [value]: e.nativeEvent.text });
  };

  const handleSubmit = () => {
    setState({ ...state, isSubmitted: true });
    if (state.password.trim() !== '') login();
    else setState({ ...state, isSubmitted: false });
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        autoCompleteType="username"
        onChange={(e) => handleChange(e, 'username')}
        placeholderTextColor="#aaa"
        placeholder="Login"
        style={styles.textInput}
      />
      <TextInput
        autoCompleteType="password"
        onChange={(e) => handleChange(e, 'password')}
        placeholderTextColor="#aaa"
        placeholder="Password"
        style={styles.textInput}
      />
      <View style={styles.button}>
        {state.isSubmitted ? (
          <ActivityIndicator />
        ) : (
          <Button
            onPress={handleSubmit}
            title="Login"
            color="#222"
            accessibilityLabel="Authentication button"
          />
        )}
      </View>
      <Text style={styles.noAccount}>
        Don't have an account yet? Click
        <Link to="/register" style={{ color: 'teal', textDecoration: 'none' }}>
          {' '}
          here{' '}
        </Link>
        to get one!
      </Text>
      {loading && <Text style={styles.text}>Loading...</Text>}
      {error && <Text style={styles.text}>Error</Text>}
    </View>
  );
};

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
    color: '#bbb',
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
  },
  text: {
    color: '#bbb',
    fontSize: 20,
  },
  button: {
    padding: 20,
  },
});

export default Login;
