import { useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useHistory } from 'react-router-dom';
import {
  GENERATE_NEW_PROFILE_PICTURE,
  GET_POSTS,
  GET_USER,
  UPDATE_USER_PROFILE,
} from 'src/requests';
import { AuthContext } from 'src/utils/auth';
import { useCurrentUserData } from 'src/utils/hooks';
import { VscRefresh } from 'react-icons/vsc';
import StandardTextInput from './common/StandardTextInput';
import StandardButton from './common/StandardButton';

const Settings: React.FC = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
  if (!context.token) history.push('/login');
  const username = useCurrentUserData()?.username;

  let rotateAnimValue = useRef(new Animated.Value(0)).current;
  const rotateData = rotateAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const { data } = useQuery(GET_USER, {
    variables: { username },
  });

  const [state, setState] = useState({
    Username: '',
    Name: '',
    Bio: '',
    Location: '',
  });

  const profilePicture = data?.getUser.profilePicture
    ? 'data:image/jpeg;base64,' + data.getUser.profilePicture
    : null;

  const [generateNewProfilePicture] = useMutation(
    GENERATE_NEW_PROFILE_PICTURE,
    {
      refetchQueries: [
        {
          query: GET_USER,
          variables: { username },
        },
      ],
    }
  );

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE, {
    variables: {
      username: state.Username,
      name: state.Name,
      bio: state.Bio,
      location: state.Location,
    },
    update(_, data: any) {
      if (data?.data?.updateUserProfile)
        context.updateToken(data.data.updateUserProfile);
    },
    refetchQueries: [
      {
        query: GET_USER,
        variables: { username },
      },
      {
        query: GET_POSTS,
      },
    ],
  });

  const handlePress = () => {
    rotateAnimValue.setValue(0);
    Animated.timing(rotateAnimValue, {
      useNativeDriver: false,
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }).start();
    generateNewProfilePicture();
  };

  const handleChange = (e: NativeSyntheticEvent<any>) => {
    setState({
      ...state,
      [e.nativeEvent.srcElement.placeholder]: e.nativeEvent.text,
    });
  };

  const handleSubmit = () => updateUserProfile();

  useEffect(() => {
    if (data && data.getUser) {
      const { getUser } = data;
      setState({
        Username: getUser.username,
        Name: getUser.name,
        Bio: getUser.bio,
        Location: getUser.location,
      });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View>
        <Image
          source={{ uri: profilePicture as string }}
          style={styles.image}
        />
        <Pressable style={styles.updateAvatarContainer} onPress={handlePress}>
          <Animated.View
            style={{
              transform: [{ rotate: rotateData }],
            }}
          >
            <Text style={styles.updateAvatarText}>
              <VscRefresh />
            </Text>
          </Animated.View>
        </Pressable>
      </View>
      <View>
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
          value={state.Bio}
          onChange={handleChange}
          title="Bio"
        />
        <StandardTextInput
          value={state.Location}
          onChange={handleChange}
          title="Location"
        />
        <StandardButton
          title="Update Profile"
          onPress={handleSubmit}
          customStyles={{ marginTop: 20 }}
        />
      </View>
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 9999,
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateAvatarText: {
    color: '#bbb',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 6,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 9999,
  },
});

export default Settings;
