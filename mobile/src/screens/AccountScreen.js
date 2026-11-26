
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

// Account screen offering registration and login options
export default function AccountScreen({
  onBack,
  onCreateAccount,
  onLogin,
  onGoogleLogin,
}) {
  return (
    <View style={styles.container}>

      {/* Navigation button to return to the welcome screen */}
      <Pressable
        style={styles.backArrow}
        onPress={onBack}
      >
        <Text style={styles.arrowText}>←</Text>
      </Pressable>

      {/* Store logo and name */}
      <Logo />

      <Text style={styles.appName}>GOLDEN HANDS</Text>

      {/* Authentication buttons */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Create Account"
          onPress={onCreateAccount}
          backgroundColor="#A8420B"
          textColor="#FFFFFF"
        />

        <CustomButton
          title="Continue with Google"
          onPress={onGoogleLogin}
          backgroundColor="#FFFFFF"
          textColor="#444444"
        />

        <CustomButton
          title="Login"
          onPress={onLogin}
          backgroundColor="#F2A9C5"
          textColor="#FFFFFF"
        />
      </View>

    </View>
  );
}

// Styles for the account screen layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  backArrow: {
    position: 'absolute',
    top: 55,
    left: 25,
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

  buttonsContainer: {
    width: '100%',
    gap: 18,
    marginTop: 20,
  },
});
