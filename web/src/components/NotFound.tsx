import { StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import Twemoji from 'react-twemoji'
import { color, globalStyles } from 'src/globalStyles'

const NotFound = () => (
  <View style={[styles.container, globalStyles.centeredContainer]}>
    <Text style={styles.text}>
      <Twemoji>😢</Twemoji>
    </Text>
    <Text style={styles.text}>Not Found</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  text: {
    color: color.primary,
    fontSize: 40,
    fontWeight: 'bold'
  }
})

export default NotFound
