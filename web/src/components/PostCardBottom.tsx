import { StyleSheet, Text, View } from 'react-native';
import { FaRegComments } from 'react-icons/fa';
import PostCardLikeButton from './PostCardLikeButton';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsThreeDots } from 'react-icons/bs';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useCurrentUserData } from 'src/utils/hooks';
import { DELETE_POST, GET_POSTS } from 'src/requests';
import { useMutation } from '@apollo/client';

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
  const currentUser = useCurrentUserData();

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: post.id },
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleDelete = () => deletePost();
  return (
    <View style={styles.postBottomContainer}>
      <View style={styles.flexContainer}>
        <PostCardLikeButton post={post} />
        <Link
          to={`${post.username}/${post.id}`}
          style={{ textDecoration: 'none' }}
        >
          <View style={styles.commentContainer}>
            <Text style={styles.icon}>
              <FaRegComments />
            </Text>
            <Text style={styles.commentCountText}> {post.commentCount}</Text>
          </View>
        </Link>
      </View>
      <Menu>
        <MenuTrigger>
          <Text style={styles.icon}>
            <BsThreeDots />
          </Text>
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {currentUser?.username === post.username ? (
            <MenuOption onSelect={handleDelete}>
              <View style={styles.flexContainer}>
                <Text style={{ color: 'red' }}>
                  <BsFillTrashFill />{' '}
                </Text>
                <Text style={{ color: 'red' }}>Delete</Text>
              </View>
            </MenuOption>
          ) : (
            <MenuOption
              onSelect={() => alert('We promise to take action')}
              text="Report"
            />
          )}
        </MenuOptions>
      </Menu>
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
  icon: { color: '#bbb', fontSize: 20, paddingTop: 5 },
  commentCountText: { color: '#bbb', fontSize: 14 },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionText: {
    color: '#bbb',
  },
};

export default PostCardBottom;
