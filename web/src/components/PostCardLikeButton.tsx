import { Pressable, Text } from 'react-native'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { AuthContext } from 'src/utils/auth'
import { useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_POSTS, TOGGLE_POST_LIKE } from 'src/requests'
import { useHistory } from 'react-router-dom'
import { useCurrentUserData } from 'src/utils/hooks'
import { globalStyles } from 'src/globalStyles'

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

const LikeButton: React.FC<Props> = ({ post }) => {
  const { token } = useContext(AuthContext)
  const history = useHistory()
  const currentUser = useCurrentUserData()

  const [isLiked, setIsLiked] = useState(false)
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE, {
    variables: { postId: post.id },
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  })

  useEffect(() => {
    if (
      currentUser &&
      currentUser.username &&
      post.likes.find((like) => like.username === currentUser.username)
    )
      setIsLiked(true)
    else setIsLiked(false)
  }, [token, currentUser, post.likes])

  const handlePress = () => {
    if (token) togglePostLike()
    else history.push('/login')
  }

  return (
    <Pressable
      style={[globalStyles.centeredContainer, globalStyles.flexRow]}
      onPress={handlePress}
    >
      <Text style={[globalStyles.mediumText, { paddingTop: 5 }]}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </Text>
      <Text style={globalStyles.smallText}> {post.likeCount}</Text>
    </Pressable>
  )
}

export default LikeButton
