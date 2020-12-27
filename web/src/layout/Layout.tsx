import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/utils/auth';
import { GET_PROFILE_PICTURE } from 'src/requests';
import { useQuery } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import Popup from './Popup';
import { IoIosText } from 'react-icons/io';
import { AiOutlineLogin } from 'react-icons/ai';

interface UserPayload {
  username: string;
  id: string;
}

const Layout: React.FC = ({ children }) => {
  // const history = useHistory();
  const context = useContext(AuthContext);
  const [isPopupVisible, toggleIsPopupVisible] = useState(false);
  const username = context.token
    ? jwtDecode<UserPayload>(context.token).username
    : null;

  const { data } = useQuery(GET_PROFILE_PICTURE, {
    variables: { username },
  });

  const profilePicture = data?.getProfilePicture
    ? 'data:image/jpeg;base64,' + data.getProfilePicture
    : null;

  const handlePress = () => {
    // context.logout();
    // history.push('/');
    toggleIsPopupVisible(!isPopupVisible);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Link to="/">
          <Text style={styles.logo}>
            <IoIosText />
          </Text>
        </Link>
        {context.token ? (
          <Pressable onPress={handlePress}>
            <Image
              source={{ uri: profilePicture as string }}
              style={styles.image}
            />
          </Pressable>
        ) : (
          <Link to="/login">
            <Text style={styles.authText}>
              <AiOutlineLogin />
            </Text>
          </Link>
        )}
      </View>
      {isPopupVisible && (
        <Popup isVisible={isPopupVisible} toggle={toggleIsPopupVisible} />
      )}
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
    fontSize: 25,
  },
  logo: {
    color: '#bbb',
    fontSize: 35,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 9999,
  },
});

export default Layout;
