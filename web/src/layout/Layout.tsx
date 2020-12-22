import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import LogoIcon from '../components/icons/LogoIcon';
import LoginIcon from '../components/icons/LoginIcon';

const Layout: React.FC = ({ children }) => (
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
      <Link to="/login">
        <Text style={styles.authText}>{<LoginIcon />}</Text>
      </Link>
    </View>
    {children}
    <View style={styles.footer}>
      <Text style={styles.copyrightText}>Twibter</Text>
    </View>
  </View>
);

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
  copyrightText: {
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
