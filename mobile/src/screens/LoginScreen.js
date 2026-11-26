
import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import Logo from '../components/Logo';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

// Login screen for existing users
export default function LoginScreen({ onBack, onLogin }) {

  // Store the email and password entered by the user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validate the login form before submitting
  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing Information',
        'Please enter your email and password.'
      );
      return;
    }

    onLogin({
      email: email.trim(),
      password,
    });
  };

  return (
    <View style={styles.container}>

      {/* Navigation button to return to the previous screen */}
      <Pressable style={styles.backArrow} onPress={onBack}>
        <Text style={styles.arrowText}>←</Text>
      </Pressable>

      {/* Store branding and login title */}
      <Logo />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Login to your GOLDEN HANDS account
      </Text>

      {/* Login form fields */}
      <View style={styles.form}>
        <CustomInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <CustomButton
          title="Login"
          onPress={handleLogin}
          backgroundColor="#A8420B"
          textColor="#FFFFFF"
        />
      </View>

    </View>
  );
}

// Styles for the login screen
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
    top: 45,
    left: 20,
    padding: 10,
    zIndex: 1,
  },

  arrowText: {
    fontSize: 30,
    color: '#A8420B',
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#A8420B',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#80513B',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  form: {
    width: '100%',
    marginTop: 10,
  },
});
