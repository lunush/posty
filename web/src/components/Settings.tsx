import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useHistory } from 'react-router-dom';
import {
  GENERATE_NEW_PROFILE_PICTURE,
  GET_PROFILE_PICTURE,
} from 'src/requests';
import { AuthContext } from 'src/utils/auth';
import { useCurrentUserData } from 'src/utils/hooks';

const Settings: React.FC = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
  if (!context.token) history.push('/login');
  const username = useCurrentUserData()!.username;

  const [generateNewProfilePicture] = useMutation(
    GENERATE_NEW_PROFILE_PICTURE,
    {
      update(proxy, data: any) {
        const cachedProfilePicture: any = proxy.readQuery({
          query: GET_PROFILE_PICTURE,
          variables: {
            username: 'mario',
          },
        });
        console.log(data, cachedProfilePicture);
        proxy.writeQuery({
          query: GET_PROFILE_PICTURE,
          variables: {
            username,
          },
          data: {
            ...cachedProfilePicture,
            getUser: {
              ...cachedProfilePicture.getUser,
              profilePicture: data.data.generateNewProfilePicture,
            },
          },
        });
      },
    }
  );

  const handlePress = () => {
    generateNewProfilePicture();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Pressable style={styles.updateAvatarContainer} onPress={handlePress}>
        <Text style={styles.updateAvatarText}>Update avatar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 40,
  },
  updateAvatarContainer: {
    backgroundColor: '#222',
    borderRadius: 14,
    padding: 10,
  },
  updateAvatarText: {
    color: '#bbb',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Settings;
