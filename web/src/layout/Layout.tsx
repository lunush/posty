import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/utils/auth';
import { GET_USER } from 'src/requests';
import { useQuery } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import Popup from './Popup';
import { AiOutlineLogin } from 'react-icons/ai';
import { IoIosText } from 'react-icons/io';

interface UserPayload {
  username: string;
  id: string;
}

const Layout: React.FC = ({ children }) => {
  const context = useContext(AuthContext);
  const [isPopupVisible, toggleIsPopupVisible] = useState(false);
  const username = context.token
    ? jwtDecode<UserPayload>(context.token).username
    : null;

  const { data } = useQuery(GET_USER, {
    variables: { username },
  });

  const profilePicture = data?.getUser.profilePicture
    ? 'data:image/jpeg;base64,' + data.getUser.profilePicture
    : null;

  const handlePress = () => {
    toggleIsPopupVisible(!isPopupVisible);
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
    paddingHorizontal: '1rem',
    paddingVertical: '0.5rem',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#333',
    backgroundColor: '#222',
  },
  body: {
    height: '100%',
  },
  authText: {
    color: '#bbb',
    fontSize: 25,
  },
  logo: {
    color: '#bbb',
    fontSize: 32,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 9999,
  },
});

export default Layout;
