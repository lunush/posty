import { useQuery } from '@apollo/client';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, useRouteMatch } from 'react-router-dom';
import { GET_POST } from 'src/requests';
import { getRelativeDate } from 'src/utils/helpers';
import { useProfilePicture } from 'src/utils/hooks';
import LoadingScreen from './LoadingScreen';
import NotFound from './NotFound';
import PostActionMenu from './PostActionMenu';
import PostNewComment from './PostNewComment';
import PostCommentCard from './PostCommentCard';

const Post: React.FC = () => {
  const {
    params: { postId },
  }: any = useRouteMatch();

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
  });
  const post = data?.getPost;
  const profilePicture = useProfilePicture(post ? post.username : '');

  if (loading) return <LoadingScreen />;
  if (error) return <NotFound />;

  return (
    <ScrollView style={styles.postContainer}>
      <View style={styles.postTopContainer}>
        <Link to={`/${post.username}`} style={{ textDecoration: 'none' }}>
          <View style={styles.flexContainer}>
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={styles.profilePicture}
              />
            ) : (
              <Text style={styles.noProfilePictureText}>Profile Picture</Text>
            )}
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.username}>@{post.username}</Text>
            </View>
          </View>
        </Link>
        <Text style={styles.text}>{getRelativeDate(post.createdAt)}</Text>
      </View>
      <View style={styles.postBodyContainer}>
        <Text style={styles.postBodyText}>{post.postBody}</Text>
      </View>
      <PostActionMenu post={post} />
      <PostNewComment post={post} />
      {post.comments.map((c: any) => (
        <PostCommentCard comment={c} postId={post.id} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    height: '100%',
    width: '100%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postTopContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  postBodyContainer: {
    width: '100%',
    minHeight: 160,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 9999,
  },
  noProfilePictureText: {
    fontSize: 10,
    color: '#bbb',
    fontWeight: 'bold',
  },
  commentContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: { color: '#bbb', fontSize: 20 },
  text: { color: '#bbb', fontSize: 14 },
  postBodyText: {
    color: '#bbb',
    fontSize: 20,
    padding: 32,
    // textAlign: 'left',
  },
  username: {
    marginLeft: 10,
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    color: '#bbb',
    fontWeight: 'bold',
  },
});

export default Post;
