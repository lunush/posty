import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TOGGLE_POST_LIKE } from 'src/requests';
import { FaComments } from 'react-icons/fa';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';
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

const PostCardBottom: React.FC<Props> = ({ post }) => {
  const handlePress = () => alert('oh mah gawd no popup');

  return (
    <View style={styles.postBottomContainer}>
      <View style={styles.flexContainer}>
        <LikeButton
          id={post.id}
          likes={post.likes}
          username={post.username}
          likeCount={post.likeCount}
          MUTATION={TOGGLE_POST_LIKE}
        />
        <Link
          to={`${post.username}/${post.id}`}
          style={{ textDecoration: 'none' }}
        >
          <View style={styles.commentContainer}>
            <Text style={styles.icon}>
              <FaComments />
            </Text>
            <Text style={styles.commentCountText}> {post.commentCount}</Text>
          </View>
        </Link>
      </View>
      <Pressable onPress={handlePress}>
        <Text style={styles.icon}>
          <BsThreeDots />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: { color: '#bbb', fontSize: 20 },
  commentCountText: { color: '#bbb', fontSize: 14 },
});

export default PostCardBottom;
