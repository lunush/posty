import { StyleSheet, Text, View } from 'react-native';
import PostCommentCardLikeButton from './PostCommentCardLikeButton';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsThreeDots } from 'react-icons/bs';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useCurrentUserData } from 'src/utils/hooks';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT, GET_POST } from 'src/requests';

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
  postId: string;
}

const PostCommentCardBottom: React.FC<Props> = ({ comment, postId }) => {
  const currentUser = useCurrentUserData();

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { commentId: comment.id, postId },
    refetchQueries: [
      {
        query: GET_POST,
        variables: { postId },
      },
    ],
  });
  const handleDelete = () => deleteComment();

  return (
    <View style={styles.postBottomContainer}>
      <View style={styles.flexContainer}>
        <PostCommentCardLikeButton comment={comment} postId={postId} />
        <Link
          to={`${comment.username}/${comment.id}`}
          style={{ textDecoration: 'none' }}
        ></Link>
      </View>
      <Menu>
        <MenuTrigger>
          <Text style={styles.icon}>
            <BsThreeDots />
          </Text>
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {currentUser?.username === comment.username ? (
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
  icon: { color: '#bbb', fontSize: 20 },
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

export default PostCommentCardBottom;
