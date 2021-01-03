import { Image, StyleSheet, Text, View } from 'react-native';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'src/utils/auth';
import { GET_USER } from 'src/requests';
import { useQuery } from '@apollo/client';
import { AiOutlineLogin } from 'react-icons/ai';
import { IoIosText } from 'react-icons/io';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useCurrentUserData } from 'src/utils/hooks';
import { color } from 'src/globalStyles';

const Layout: React.FC = ({ children }) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const username = useCurrentUserData()?.username;

  const { data } = useQuery(GET_USER, {
    variables: { username },
  });

  const currentUserUsername = useCurrentUserData()?.username;
  const profilePicture = data?.getUser.profilePicture
    ? 'data:image/jpeg;base64,' + data.getUser.profilePicture
    : null;

  const handleProfile = () => history.push(`/${currentUserUsername}`);
  const handleSettings = () => history.push('/settings');
  const handleLogout = () => {
    context.logout();
    history.push('/');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Link to="/">
          <Text style={styles.logo}>
            <IoIosText transform="translate(-1, 5)" />
          </Text>
        </Link>
        {context.token ? (
          <Menu>
            <MenuTrigger>
              <Image
                source={{ uri: profilePicture as string }}
                style={styles.image}
              />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={handleProfile} text="Profile" />
              <MenuOption onSelect={handleSettings} text="Settings" />
              <MenuOption onSelect={handleLogout} text="Logout" />
            </MenuOptions>
          </Menu>
        ) : (
          <Link to="/login">
            <Text style={styles.authText}>
              <AiOutlineLogin />
            </Text>
          </Link>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100vh',
    width: '100vw',
    overflow: 'visible',
    backgroundColor: color.bgPrimary,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '1rem',
    paddingVertical: '0.5rem',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: color.border,
    backgroundColor: color.bgSecondary,
  },
  authText: {
    color: color.primary,
    fontSize: 25,
  },
  logo: {
    color: color.primary,
    fontSize: 32,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 9999,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: color.bgSecondary,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.border,
    maxWidth: 120,
    textAlign: 'center',
  },
  optionText: {
    color: color.primary,
    fontSize: 18,
    width: '100%',
  },
};

export default Layout;
