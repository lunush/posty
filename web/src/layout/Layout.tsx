import { StyleSheet, Text, View } from 'react-native';
import { Link, useHistory } from 'react-router-dom';
import LogoIcon from '../components/icons/LogoIcon';
import LoginIcon from '../components/icons/LoginIcon';
import LogoutIcon from '../components/icons/LogoutIcon';
import { useContext } from 'react';
import { AuthContext } from 'src/utils/auth';

const Layout: React.FC = ({ children }) => {
  const history = useHistory();
  const context = useContext(AuthContext);

  const handleLogout = () => {
    history.push('/');
    context.logout();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Link to="/">
          <Text
            accessibilityLabel="Bird by Oksana Latysheva from the Noun Project"
            style={styles.logo}
          >
            <LogoIcon />
          </Text>
        </Link>
        {context.token ? (
          <Link onClick={() => handleLogout()} to="/">
            <Text style={styles.authText}>
              <LogoutIcon />
            </Text>
          </Link>
        ) : (
          <Link to="/login">
            <Text style={styles.authText}>
              <LoginIcon />
            </Text>
          </Link>
        )}
      </View>
      {children}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Twibter</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100vh',
    width: '100vw',
    padding: '1.5rem',
    overflow: 'visible',
    backgroundColor: '#111',
  },
  header: {
    width: '100%',
    marginBottom: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1.5rem',
  },
  footer: {
    width: '100%',
    marginTop: '1rem',
    paddingTop: '1.5rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    height: '100%',
  },
  footerText: {
    fontWeight: '700',
    color: '#bbb',
    textAlign: 'center',
  },
  authText: {
    color: '#bbb',
  },
  logo: {
    color: '#bbb',
  },
});

export default Layout;
