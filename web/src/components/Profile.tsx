import { useQuery } from '@apollo/client';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouteMatch } from 'react-router-dom';
import { GET_POSTS, GET_USER } from 'src/requests';
import { useProfilePicture } from 'src/utils/hooks';
import LoadingScreen from './LoadingScreen';
import NotFound from './NotFound';
import PostCard from './PostCard';
import { truncate } from 'src/utils/helpers';
import { color, globalStyles } from 'src/globalStyles';

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
    <ScrollView style={globalStyles.fullSpace}>
      <View style={[globalStyles.centeredContainer, { padding: 16 }]}>
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        ) : (
          <Text style={globalStyles.mediumText}>Profile Picture</Text>
        )}
        <View
          style={[
            globalStyles.centeredContainer,
            globalStyles.flexRow,
            { marginTop: 10 },
          ]}
        >
          <Text style={[globalStyles.bigText, { fontWeight: 'bold' }]}>
            {truncate(user.name)}
          </Text>
          <Text
            style={[
              globalStyles.smallText,
              { marginLeft: 10, color: color.secondary },
            ]}
          >
            @{truncate(user.username, 20)}
          </Text>
        </View>
        <Text style={globalStyles.mediumText}>{user.bio}</Text>
        <Text
          style={[
            globalStyles.mediumText,
            { marginTop: 10, paddingHorizontal: 16 },
          ]}
        >
          Posts by {user.name}:
        </Text>
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
  profilePicture: {
    height: 240,
    width: 240,
    borderRadius: 9999,
  },
});

export default Profile;
