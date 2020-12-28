import { Pressable, StyleSheet, Text } from 'react-native';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from 'src/utils/auth';
import { useContext, useEffect, useState } from 'react';
import { DocumentNode } from 'graphql';
import { useMutation } from '@apollo/client';
import { GET_POSTS } from 'src/requests';
import { useHistory } from 'react-router-dom';

interface Props {
  likeCount: number;
  likes: any[];
  id: string;
  username: string;
  MUTATION: DocumentNode;
}

const LikeButton: React.FC<Props> = ({
  likeCount,
  id,
  likes,
  username,
  MUTATION,
}) => {
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const [isLiked, setIsLiked] = useState(false);
  const [togglePostLike] = useMutation(MUTATION, {
    variables: { postId: id },
    update(proxy, data: any) {
      const {
        likes: newLikes,
        likeCount: newLikeCount,
      } = data.data.togglePostLike;
      const cachedPosts: any = proxy.readQuery({
        query: GET_POSTS,
      });
      let updatedCachedPosts = [...cachedPosts.getPosts].forEach((p) =>
        p.id === id ? { ...p, newLikes, newLikeCount } : p
      );
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...cachedPosts,
          getPosts: { updatedCachedPosts },
        },
      });
    },
  });

  useEffect(() => {
    if (token && likes.find((e) => e.username === username)) setIsLiked(true);
    else setIsLiked(false);
  }, [token, username, likes]);

  const handlePress = () => {
    if (token) togglePostLike();
    else history.push('/login');
  };

  return (
    <Pressable style={styles.commentsContainer} onPress={handlePress}>
      <Text style={styles.icon}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </Text>
      <Text style={styles.text}> {likeCount}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: { color: '#bbb', fontSize: 14 },
  icon: { color: '#bbb', fontSize: 20 },
  commentsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikeButton;
