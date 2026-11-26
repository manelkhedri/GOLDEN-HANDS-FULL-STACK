
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import CustomButton from '../components/CustomButton';

// Display the logged-in user's account information
export default function ProfileScreen({ user, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      {/* User profile information */}
      <View style={styles.profileCard}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || 'Not available'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || 'Not available'}</Text>

        <Text style={styles.label}>Account Type</Text>
        <Text style={styles.value}>
          {user?.role || 'User'}
        </Text>
      </View>

      {/* Logout button */}
      <CustomButton
        title="Log Out"
        onPress={onLogout}
        backgroundColor="#A8420B"
        textColor="#FFFFFF"
      />
    </View>
  );
}

// Styles for the profile screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
    padding: 22,
    paddingTop: 65,
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#A8420B',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 15,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#80513B',
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#A8420B',
    marginTop: 5,
  },
});
