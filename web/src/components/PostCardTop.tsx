import { useQuery } from '@apollo/client';
import { getRelativeDate } from 'src/utils/helpers';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import { GET_PROFILE_PICTURE } from 'src/requests';

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

const PostCardTop: React.FC<Props> = ({ post }) => {
  const { data } = useQuery(GET_PROFILE_PICTURE, {
    variables: { username: post.username },
  });

  const profilePicture = data?.getUser.profilePicture
    ? 'data:image/jpeg;base64,' + data.getUser.profilePicture
    : null;

  return (
    <View style={styles.postTopContainer}>
      <View style={styles.flexContainer}>
        <Link to={post.username}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          ) : (
            <Text style={styles.noProfilePictureText}>Profile Picture</Text>
          )}
        </Link>
        <View>
          <Text style={styles.name}>{post.name}</Text>
          <Link to={post.username} style={{ textDecoration: 'none' }}>
            <Text style={styles.username}>@{post.username}</Text>
          </Link>
        </View>
      </View>
      <Text style={styles.createdAt}>
        {getRelativeDate((post.createdAt as any) * 1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 9999,
  },
  noProfilePictureText: {
    fontSize: 10,
    color: '#bbb',
    fontWeight: 'bold',
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
  createdAt: {
    marginLeft: 10,
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default PostCardTop;
