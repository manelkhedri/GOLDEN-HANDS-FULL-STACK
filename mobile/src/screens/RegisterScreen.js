
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

// Registration screen for creating a new user account
export default function RegisterScreen({ onBack, onRegister }) {

  // Store the values entered by the user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validate the registration form before submitting
  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match.');
      return;
    }

    onRegister({
      name: name.trim(),
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

      {/* Store branding and registration title */}
      <Logo />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join the GOLDEN HANDS family!
      </Text>

      {/* Registration form fields */}
      <View style={styles.form}>
        <CustomInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

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

        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        <CustomButton
          title="Create Account"
          onPress={handleRegister}
          backgroundColor="#A8420B"
          textColor="#FFFFFF"
        />
      </View>

    </View>
  );
}

// Styles for the registration screen
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
    marginTop: 8,
    marginBottom: 20,
  },

  form: {
    width: '100%',
    marginTop: 10,
  },
});
