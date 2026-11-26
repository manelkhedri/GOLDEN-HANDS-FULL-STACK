
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Logo from '../components/Logo';

// Welcome screen displayed when the application starts
export default function WelcomeScreen({ onContinue }) {
  return (
    <View style={styles.container}>

      {/* Navigation button to open the account screen */}
      <Pressable
        style={styles.arrow}
        onPress={onContinue}
      >
        <Text style={styles.arrowText}>→</Text>
      </Pressable>

      {/* Store logo */}
      <Logo />

      {/* Store name and welcome message */}
      <Text style={styles.appName}>GOLDEN HANDS</Text>

      <Text style={styles.welcomeTitle}>Welcome!</Text>

      <Text style={styles.welcomeMessage}>
        Welcome to our store. Enjoy!
      </Text>

    </View>
  );
}

// Styles for the welcome screen layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  arrow: {
    position: 'absolute',
    top: 55,
    right: 25,
    padding: 10,
  },

  arrowText: {
    fontSize: 32,
    color: '#A8420B',
  },

  appName: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#A8420B',
    letterSpacing: 2,
    marginBottom: 25,
  },

  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A8420B',
    marginBottom: 12,
  },

  welcomeMessage: {
    fontSize: 17,
    color: '#80513B',
    textAlign: 'center',
  },
});
