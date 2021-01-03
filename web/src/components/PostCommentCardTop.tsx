import { getRelativeDate, truncate } from 'src/utils/helpers';
import { useProfilePicture } from 'src/utils/hooks';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-dom';
import { color, globalStyles } from 'src/globalStyles';

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

const PostCommentCardTop: React.FC<Props> = ({ comment }) => {
  const profilePicture = useProfilePicture(comment.username);

  return (
    <View style={styles.commentTopContainer}>
      <Link to={`/${comment.username}`} style={{ textDecoration: 'none' }}>
        <View style={[globalStyles.centeredContainer, globalStyles.flexRow]}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          ) : (
            <Text style={globalStyles.smallText}>Profile Picture</Text>
          )}
          <View>
            <Text
              style={[
                globalStyles.mediumText,
                { marginLeft: 10, fontWeight: 'bold' },
              ]}
            >
              {truncate(comment.name)}
            </Text>
            <Text
              style={[
                globalStyles.smallText,
                { marginLeft: 10, color: color.secondary },
              ]}
            >
              @{truncate(comment.username, 20)}
            </Text>
          </View>
        </View>
      </Link>
      <Text style={globalStyles.smallText}>
        {getRelativeDate(comment.createdAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PostCommentCardTop;
