import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { REGISTER } from 'src/requests';
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from 'src/utils/auth';

const Register: React.FC = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState({
    isSubmitted: false,
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  if (context.token) history.push('/');

  const [register, { error }] = useMutation(REGISTER, {
    update(_, { data: { register: token } }) {
      if (token) {
        context.login(token);
        history.push('/');
      }
    },
    variables: {
      username: state.username,
      name: state.name,
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
    if (
      state.username.trim() !== '' &&
      state.name.trim() !== '' &&
      state.password.trim() !== '' &&
      state.password === state.confirmPassword
    )
      register();
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        autoCompleteType="username"
        onChange={(e) => handleChange(e, 'username')}
        placeholder="Username"
        placeholderTextColor="#555"
        style={styles.textInput}
      />
      <TextInput
        autoCompleteType="name"
        onChange={(e) => handleChange(e, 'name')}
        placeholder="Name"
        placeholderTextColor="#555"
        style={styles.textInput}
      />
      <TextInput
        autoCompleteType="password"
        onChange={(e) => handleChange(e, 'password')}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#555"
        style={styles.textInput}
      />
      <TextInput
        autoCompleteType="password"
        onChange={(e) => handleChange(e, 'confirmPassword')}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#555"
        style={styles.textInput}
      />
      {state.isSubmitted && !error ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <Pressable
          onPress={handleSubmit}
          accessibilityLabel="Authentication button"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      )}
      {error && <Text style={styles.text}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    padding: 14,
    marginVertical: 10,
  },
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
    marginBottom: 10,
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
  text: {
    color: '#bbb',
    fontSize: 20,
  },
  buttonText: { fontWeight: 'bold', color: '#bbb' },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 14,
    marginVertical: 10,
  },
});

export default withRouter(Register);
