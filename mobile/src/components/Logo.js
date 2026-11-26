
import { Image, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <Image
      source={require('../../assets/images/logo.jpg')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 220,
    height: 170,
    marginBottom: 15,
  },
});
