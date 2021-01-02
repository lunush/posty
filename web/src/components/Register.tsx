import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  ActivityIndicator,
} from 'react-native';
import { REGISTER } from 'src/requests';
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from 'src/utils/auth';
import StandardTextInput from './common/StandardTextInput';
import StandardButton from './common/StandardButton';

const Register: React.FC = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [state, setState] = useState({
    Username: '',
    Name: '',
    Password: '',
    'Confirm Password': '',
  });

  if (context.token) history.push('/');

  const [register, { error, loading }] = useMutation(REGISTER, {
    variables: {
      username: state.Username,
      name: state.Name,
      password: state.Password,
    },
    update(_, { data: { register: token } }) {
      if (token) {
        context.login(token);
        history.push('/');
      }
    },
  });

  const handleChange = (e: NativeSyntheticEvent<any>) => {
    setState({
      ...state,
      [e.nativeEvent.srcElement.placeholder]: e.nativeEvent.text,
    });
  };

  const handleSubmit = () => {
    if (
      state.Username.trim() !== '' &&
      state.Name.trim() !== '' &&
      state.Password.trim() !== '' &&
      state.Password === state['Confirm Password']
    )
      register();
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Register</Text>
      <StandardTextInput
        value={state.Username}
        onChange={handleChange}
        title="Username"
      />
      <StandardTextInput
        value={state.Name}
        onChange={handleChange}
        title="Name"
      />
      <StandardTextInput
        value={state.Password}
        onChange={handleChange}
        title="Password"
        secureTextEntry
      />
      <StandardTextInput
        value={state['Confirm Password']}
        onChange={handleChange}
        title="Confirm Password"
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <StandardButton title="Register" onPress={handleSubmit} />
      )}
      {error && <Text style={styles.error}>{error.message}</Text>}
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
  error: {
    color: 'red',
    fontSize: 20,
  },
});

export default withRouter(Register);
