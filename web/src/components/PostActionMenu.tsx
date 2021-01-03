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
import { color, globalStyles } from 'src/globalStyles';

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
        <Text style={[globalStyles.mediumText, { paddingTop: 2 }]}>
          <FaRegComments />
        </Text>
        <Text style={globalStyles.smallText}> {post.commentCount}</Text>
      </View>
      <Menu>
        <MenuTrigger>
          <Text style={[globalStyles.mediumText, { paddingTop: 2 }]}>
            <BsThreeDots />
          </Text>
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {currentUser?.username === post.username ? (
            <MenuOption onSelect={handleDelete}>
              <View
                style={[globalStyles.centeredContainer, globalStyles.flexRow]}
              >
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
  actionMenu: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: color.border,
    borderBottomColor: color.border,
    padding: 10,
    overflow: 'hidden',
  },
  text: {
    color: color.primary,
    fontSize: 40,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: color.bgSecondary,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.border,
  },
  optionText: {
    color: color.primary,
  },
};

export default PostActionMenu;
