import jwtDecode from 'jwt-decode';
import { useContext, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from 'src/utils/auth';
import { useComponentVisible } from 'src/utils/hooks';

interface Props {
  isVisible: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserPayload {
  username: string;
  id: string;
}

const DropdownMenu: React.FC<Props> = ({ isVisible, toggle }) => {
  const history = useHistory();
  const context = useContext(AuthContext);

  const username = context.token
    ? jwtDecode<UserPayload>(context.token).username
    : null;

  const handleLogout = () => {
    context.logout();
    history.push('/');
    toggle(!isVisible);
  };

  const ref = useRef(null);
  useComponentVisible(ref, isVisible, toggle);

  return (
    <View ref={ref} style={styles.popup}>
      <Link
        to={username as string}
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>Profile</Text>
        </View>
      </Link>
      <Link to="/settings" style={{ textDecoration: 'none', width: '100%' }}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Settings</Text>
        </View>
      </Link>
      <Pressable onPress={handleLogout}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Logout</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    width: 150,
    height: 150,
    alignItems: 'center',
    right: 16,
    top: 80,
    backgroundColor: '#222',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 20,
    zIndex: 10,
    overflow: 'hidden',
  },
  item: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#777',
    width: '100%',
    height: '3.1rem',
    alignItems: 'center',
    justifyContent: 'center',
    textDecorationLine: 'none',
  },
  itemText: {
    fontSize: 16,
    color: '#bbb',
  },
});

export default DropdownMenu;
