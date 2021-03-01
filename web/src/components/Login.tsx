import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { LOGIN } from 'src/requests'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from 'src/utils/auth'
import StandardTextInput from './common/StandardTextInput'
import StandardButton from './common/StandardButton'
import { color, globalStyles } from 'src/globalStyles'

const Login: React.FC = () => {
  const context = useContext(AuthContext)
  const history = useHistory()
  const [state, setState] = useState({
    Username: '',
    Password: ''
  })

  if (context.token) history.push('/')

  const [login, { error, loading }] = useMutation(LOGIN, {
    variables: {
      username: state.Username,
      password: state.Password
    },
    update(_, { data: { login: token } }) {
      if (token) {
        context.login(token)
        history.push('/')
      }
    }
  })

  const handleChange = (e: NativeSyntheticEvent<any>) => {
    setState({
      ...state,
      [e.nativeEvent.srcElement.placeholder]: e.nativeEvent.text
    })
  }

  const handleSubmit = () => {
    if (state.Password.trim() !== '' && state.Username.trim() !== '') login()
  }

  return (
    <View style={[globalStyles.fullSpace, globalStyles.centeredContainer]}>
      <Text style={styles.title}>Login</Text>
      <StandardTextInput
        value={state.Username}
        onChange={handleChange}
        title="Username"
      />
      <StandardTextInput
        value={state.Password}
        onChange={handleChange}
        title="Password"
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <StandardButton title="Login" onPress={handleSubmit} />
      )}
      <Text style={globalStyles.smallText}>
        Don't have an account yet? Click
        <Link
          to="/register"
          style={{ color: color.link, textDecoration: 'none' }}
        >
          {' '}
          here{' '}
        </Link>
        to get one!
      </Text>
      {error && <Text style={globalStyles.mediumText}>{error.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    padding: 14,
    marginVertical: 10
  },
  title: {
    color: color.primary,
    fontSize: 32,
    height: 40
  }
})

export default Login
