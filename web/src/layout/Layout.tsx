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
            accessibilityLabel="Writing by Nubaia Karim Barsha from the Noun Project"
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
        <Text style={styles.footerText}>Posty</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100vh',
    width: '100vw',
    overflow: 'visible',
    backgroundColor: '#111',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: '#777',
  },
  body: {
    height: '100%',
  },
  footerText: {
    color: '#bbb',
    fontWeight: '700',
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
