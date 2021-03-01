import { useQuery } from '@apollo/client'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Link, useRouteMatch } from 'react-router-dom'
import { GET_POST } from 'src/requests'
import { getRelativeDate, truncate } from 'src/utils/helpers'
import { useProfilePicture } from 'src/utils/hooks'
import LoadingScreen from './LoadingScreen'
import NotFound from './NotFound'
import PostActionMenu from './PostActionMenu'
import PostNewComment from './PostNewComment'
import PostCommentCard from './PostCommentCard'
import { color, globalStyles } from 'src/globalStyles'

const Post: React.FC = () => {
  const {
    params: { postId }
  }: any = useRouteMatch()

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId }
  })
  const post = data?.getPost
  const profilePicture = useProfilePicture(post ? post.username : '')

  if (loading) return <LoadingScreen />
  if (error) return <NotFound />

  return (
    <ScrollView style={globalStyles.fullSpace}>
      <View style={styles.postTopContainer}>
        <Link to={`/${post.username}`} style={{ textDecoration: 'none' }}>
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
              <Text style={styles.name}>{truncate(post.name, 16)}</Text>
              <Text
                style={[
                  globalStyles.smallText,
                  { marginLeft: 10, color: color.secondary }
                ]}
              >
                @{truncate(post.username, 30)}
              </Text>
            </View>
          </View>
        </Link>
        <Text
          style={[globalStyles.smallText, { transform: [{ translateY: -6 }] }]}
        >
          {getRelativeDate(post.createdAt)}
        </Text>
      </View>
      <View style={styles.postBodyContainer}>
        <Text style={styles.postBodyText}>{post.postBody}</Text>
      </View>
      <PostActionMenu post={post} />
      <PostNewComment post={post} />
      {post.comments.map((c: any) => (
        <PostCommentCard key={c.id} comment={c} postId={post.id} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  postTopContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  postBodyContainer: {
    width: '100%',
    minHeight: 160,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 9999
  },
  commentContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  postBodyText: {
    color: color.primary,
    fontSize: 20,
    padding: 32
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    color: color.primary,
    fontWeight: 'bold'
  }
})

export default Post
