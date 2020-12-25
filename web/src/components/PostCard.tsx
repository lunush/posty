import { useQuery } from '@apollo/client';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GET_PROFILE_PICTURE } from 'src/requests';
import LikeIcon from 'src/components/icons/LikeIcon';
import CommentIcon from 'src/components/icons/CommentIcon';

interface Props {
  post: {
    id: string;
    username: string;
    name: string;
    postBody: string;
    profilePicture: string;
  };
}

const PostCard: React.FC<Props> = ({ post }) => {
  const { data } = useQuery(GET_PROFILE_PICTURE, {
    variables: { username: post.username },
  });

  const profilePicture = data?.getProfilePicture
    ? 'data:image/jpeg;base64,' + data.getProfilePicture
    : null;

  return (
    <View key={post.id} style={styles.postBox}>
      <View style={styles.post}>
        <View style={styles.postTop}>
          <View style={styles.imageContainer}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.image} />
            ) : (
              <Text style={styles.noProfilePictureText}>Profile Picture</Text>
            )}
          </View>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.username}>@{post.username}</Text>
        </View>
        <Text style={styles.postText}>{post.postBody}</Text>
        <View style={styles.postBottom}>
          <View style={styles.reactionBox}>
            <Text style={styles.notLiked}>
              <LikeIcon />
            </Text>
            <Text style={styles.notLiked}> 1</Text>
          </View>
          <View style={styles.reactionBox}>
            <Text style={styles.text}>
              <CommentIcon />
            </Text>
            <Text style={styles.text}> 1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    padding: 20,
    margin: 10,
    borderRadius: 15,
    height: '13rem',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#222',
  },
  postTop: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  postBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 9999,
  },
  imageContainer: {
    width: 50,
  },
  text: { color: '#bbb' },
  liked: { color: 'red' },
  notLiked: {
    color: '#bbb',
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
  noProfilePictureText: {
    fontSize: 10,
    color: '#bbb',
    fontWeight: 'bold',
  },
  postText: {
    color: '#bbb',
    height: '100%',
    padding: 8,
    marginVertical: 10,
  },
  reactionBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default PostCard;
