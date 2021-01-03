import { getRelativeDate, truncate } from 'src/utils/helpers';
import { useProfilePicture } from 'src/utils/hooks';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';

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
  const profilePicture = useProfilePicture(post.username);

  return (
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
            <Text style={styles.name}>{truncate(post.name)}</Text>
            <Text style={styles.username}>@{truncate(post.username, 20)}</Text>
          </View>
        </View>
      </Link>
      <Text style={styles.createdAt}>{getRelativeDate(post.createdAt)}</Text>
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
