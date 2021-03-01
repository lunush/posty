import { StyleSheet, View } from 'react-native'
import { color, globalStyles } from 'src/globalStyles'

interface Props {
  id?: string
}

const Card: React.FC<Props> = ({ children }) => (
  <View
    style={[
      globalStyles.centeredContainer,
      { width: '100%', paddingHorizontal: 16 }
    ]}
  >
    <View style={styles.cardInnerContainer}>
      <View style={globalStyles.fullSpace}>{children}</View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  cardInnerContainer: {
    padding: 6,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 8,
    height: 'auto',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
    backgroundColor: color.bgSecondary
  }
})

export default Card
