import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { globalStyles } from 'src/globalStyles';

const LoadingScreen = () => (
  <View style={[styles.container, globalStyles.centeredContainer]}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default LoadingScreen;
