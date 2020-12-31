import { BsFillTrashFill, BsThreeDots } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';
import { StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useCurrentUserData } from 'src/utils/hooks';
import PostLikeButton from './PostLikeButton';
import { DELETE_POST, GET_POSTS } from 'src/requests';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

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
    comments: any[];
  };
}

const PostActionMenu: React.FC<Props> = ({ post }) => {
  const currentUser = useCurrentUserData();
  const history = useHistory();

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: post.id },
    update() {
      history.push('/');
    },
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleDelete = () => deletePost();

  return (
    <View style={styles.actionMenu}>
      <PostLikeButton post={post} />
      <View style={styles.commentContainer}>
        <Text style={styles.icon}>
          <FaRegComments />
        </Text>
        <Text style={styles.commentCountText}> {post.commentCount}</Text>
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
  actionMenu: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: '#333',
    borderBottomColor: '#333',
    padding: 10,
    overflow: 'hidden',
  },
  text: {
    color: '#bbb',
    fontSize: 40,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: { color: '#bbb', fontSize: 20, paddingTop: 2 },
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

export default PostActionMenu;
