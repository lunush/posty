import { Pressable, StyleSheet, Text } from 'react-native';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from 'src/utils/auth';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_POSTS, TOGGLE_POST_LIKE } from 'src/requests';
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
  };
}

const LikeButton: React.FC<Props> = ({ post }) => {
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const [isLiked, setIsLiked] = useState(false);
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE, {
    variables: { postId: post.id },
    refetchQueries: [
      {
        query: GET_POSTS,
      },
    ],
  });

  useEffect(() => {
    if (token && post.likes.find((e) => e.username === post.username))
      setIsLiked(true);
    else setIsLiked(false);
  }, [token, post.username, post.likes]);

  const handlePress = () => {
    if (token) togglePostLike();
    else history.push('/login');
  };

  return (
    <Pressable style={styles.commentsContainer} onPress={handlePress}>
      <Text style={styles.icon}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </Text>
      <Text style={styles.text}> {post.likeCount}</Text>
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

export default LikeButton;
