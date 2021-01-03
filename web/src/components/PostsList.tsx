import { useQuery } from '@apollo/client';
import { ScrollView, Text } from 'react-native';
import { GET_POSTS } from '../requests';
import { AuthContext } from 'src/utils/auth';
import { useContext } from 'react';
import PostsNewPost from './PostsNewPost';
import PostCard from './PostCard';
import LoadingScreen from './LoadingScreen';
import { color, globalStyles } from 'src/globalStyles';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const context = useContext(AuthContext);

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <Text style={[globalStyles.mediumText, { color: color.danger }]}>
        {error.message}
      </Text>
    );

  return (
    <ScrollView style={globalStyles.fullSpace}>
      {context.token ? <PostsNewPost /> : null}
      {data.getPosts.map((post: any) => (
        <PostCard post={post} />
      ))}
    </ScrollView>
  );
};

export default PostsList;
