import { Pressable, StyleSheet, Text } from 'react-native';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from 'src/utils/auth';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_POST, TOGGLE_COMMENT_LIKE } from 'src/requests';
import { useHistory } from 'react-router-dom';

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

const PostCommentCardLikeButton: React.FC<Props> = ({ comment, postId }) => {
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const [isLiked, setIsLiked] = useState(false);
  const [togglePostLike] = useMutation(TOGGLE_COMMENT_LIKE, {
    variables: { commentId: comment.id, postId },
    refetchQueries: [
      {
        query: GET_POST,
        variables: { postId },
      },
    ],
  });

  useEffect(() => {
    if (token && comment.likes.find((e) => e.username === comment.username))
      setIsLiked(true);
    else setIsLiked(false);
  }, [token, comment.username, comment.likes]);

  const handlePress = () => {
    if (token) togglePostLike();
    else history.push('/login');
  };

  return (
    <Pressable style={styles.commentsContainer} onPress={handlePress}>
      <Text style={styles.icon}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </Text>
      <Text style={styles.text}> {comment.likeCount}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: { color: '#bbb', fontSize: 14 },
  icon: { color: '#bbb', fontSize: 20, paddingTop: 5 },
  commentsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostCommentCardLikeButton;
