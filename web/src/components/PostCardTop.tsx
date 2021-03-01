import { getRelativeDate, truncate } from 'src/utils/helpers'
import { useProfilePicture } from 'src/utils/hooks'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'react-router-dom'
import { color, globalStyles } from 'src/globalStyles'

interface Props {
  post: {
    id: string
    createdAt: string
    username: string
    name: string
    postBody: string
    likeCount: number
    likes: any[]
    commentCount: number
  }
}

const PostCardTop: React.FC<Props> = ({ post }) => {
  const profilePicture = useProfilePicture(post.username)

  return (
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
            <Text style={[globalStyles.mediumText, { marginLeft: 10 }]}>
              {truncate(post.name)}
            </Text>
            <Text
              style={[
                globalStyles.smallText,
                { marginLeft: 10, color: color.secondary }
              ]}
            >
              @{truncate(post.username)}
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
  )
}

const styles = StyleSheet.create({
  postTopContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 9999
  }
})

export default PostCardTop
