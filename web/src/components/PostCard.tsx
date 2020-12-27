import { useQuery } from '@apollo/client';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GET_PROFILE_PICTURE, TOGGLE_POST_LIKE } from 'src/requests';
import { FaComments } from 'react-icons/fa';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';
import { getRelativeDate } from 'src/utils/helpers';
import { BsThreeDots } from 'react-icons/bs';

interface Props {
  post: {
    id: string;
    createdAt: string;
    username: string;
    name: string;
    postBody: string;
    likeCount: number;
    likes: any[];
    commentCount: number;
  };
}

const PostCard: React.FC<Props> = ({ post }) => {
  const { data } = useQuery(GET_PROFILE_PICTURE, {
    variables: { username: post.username },
  });

  const profilePicture = data?.getUser.profilePicture
    ? 'data:image/jpeg;base64,' + data.getUser.profilePicture
    : null;

  const handlePress = () => alert('oh mah gawd no popup');

  return (
    <View key={post.id} style={styles.postBox}>
      <View style={styles.post}>
        <View style={styles.postTop}>
          <View style={styles.flex}>
            <Link to={post.username}>
              <View style={styles.imageContainer}>
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={styles.noProfilePictureText}>
                    Profile Picture
                  </Text>
                )}
              </View>
            </Link>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.username}>@{post.username}</Text>
            </View>
          </View>
          <Text style={styles.username}>
            {getRelativeDate((post.createdAt as any) * 1)}
          </Text>
        </View>
        <Text style={styles.postText}>{post.postBody}</Text>
        <View style={styles.postBottom}>
          <View style={styles.flex}>
            <LikeButton
              id={post.id}
              likes={post.likes}
              username={post.username}
              likeCount={post.likeCount}
              MUTATION={TOGGLE_POST_LIKE}
            />
            <View style={styles.commentContainer}>
              <Text style={styles.icon}>
                <FaComments />
              </Text>
              <Text style={styles.text}> {post.commentCount}</Text>
            </View>
          </View>
          <Pressable onPress={handlePress}>
            <Text style={styles.icon}>
              <BsThreeDots />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postBottom: {
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
  icon: { color: '#bbb', fontSize: 20 },
  text: { color: '#bbb', fontSize: 14 },
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
  commentContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default PostCard;
