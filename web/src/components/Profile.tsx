import { useQuery } from '@apollo/client';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouteMatch } from 'react-router-dom';
import { GET_POSTS, GET_USER } from 'src/requests';
import { useProfilePicture } from 'src/utils/hooks';
import LoadingScreen from './LoadingScreen';
import NotFound from './NotFound';
import PostCard from './PostCard';
import { truncate } from 'src/utils/helpers';

const Profile: React.FC = () => {
  const {
    params: { username },
  }: any = useRouteMatch();
  const { data: userData, loading: userLoading, error: userError } = useQuery(
    GET_USER,
    {
      variables: { username },
    }
  );
  const user = userData?.getUser;
  const profilePicture = useProfilePicture(user ? user.username : '');

  const { data, loading: postsLoading, error: postsError } = useQuery(
    GET_POSTS,
    { variables: { username } }
  );
  const posts = data?.getPosts;

  if (userLoading) return <LoadingScreen />;
  if (userError) return <NotFound />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoContainer}>
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        ) : (
          <Text style={styles.noProfilePictureText}>Profile Picture</Text>
        )}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{truncate(user.name)}</Text>
          <Text style={styles.username}>@{truncate(user.username, 20)}</Text>
        </View>
        <Text style={styles.bio}>{user.bio}</Text>
        <Text style={styles.postsByUserText}>Posts by {user.name}:</Text>
      </View>
      {postsLoading ? (
        <LoadingScreen />
      ) : postsError ? (
        <NotFound />
      ) : (
        posts.map((post: any) => <PostCard post={post} />)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#bbb',
    fontSize: 32,
  },
  username: {
    color: '#777',
    fontSize: 14,
    marginLeft: 10,
  },
  bio: {
    color: '#bbb',
    fontSize: 18,
  },
  postsByUserText: {
    color: '#bbb',
    fontSize: 18,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  profilePicture: {
    height: 240,
    width: 240,
    borderRadius: 9999,
  },
  noProfilePictureText: {
    fontSize: 20,
    color: '#bbb',
    fontWeight: 'bold',
  },
});

export default Profile;
