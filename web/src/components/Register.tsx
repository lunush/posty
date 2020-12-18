import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  ActivityIndicator,
} from 'react-native';
import { REGISTER } from 'src/requests';
import { useHistory, withRouter } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState({
    isSubmitted: false,
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [
    register,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(REGISTER, {
    update(_, { data: { register: token } }) {
      if (token) {
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
    if (
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
        placeholder="Login"
        placeholderTextColor="#aaa"
        style={styles.textInput}
      />
      <TextInput
        autoCompleteType="password"
        onChange={(e) => handleChange(e, 'password')}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#aaa"
        style={styles.textInput}
      />
      <TextInput
        autoCompleteType="password"
        onChange={(e) => handleChange(e, 'confirmPassword')}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#aaa"
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
      {mutationLoading && <Text>Loading...</Text>}
      {mutationError && <Text>Error</Text>}
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
  button: {
    padding: 20,
  },
});

export default withRouter(Register);
