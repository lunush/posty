import { getRelativeDate } from 'src/utils/helpers';
import { useProfilePicture } from 'src/utils/hooks';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';

interface Props {
  comment: {
    id: string;
    createdAt: string;
    username: string;
    name: string;
    commentBody: string;
    likeCount: number;
    likes: any[];
  };
}

const PostCardTop: React.FC<Props> = ({ comment }) => {
  const profilePicture = useProfilePicture(comment.username);

  return (
    <View style={styles.commentTopContainer}>
      <View style={styles.flexContainer}>
        <Link to={comment.username}>
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
          <Text style={styles.name}>{comment.name}</Text>
          <Link to={comment.username} style={{ textDecoration: 'none' }}>
            <Text style={styles.username}>@{comment.username}</Text>
          </Link>
        </View>
      </View>
      <Text style={styles.createdAt}>{getRelativeDate(comment.createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentTopContainer: {
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
