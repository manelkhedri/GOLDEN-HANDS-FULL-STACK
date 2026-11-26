
import { View, TextInput, StyleSheet } from 'react-native';

// Reusable input component for collecting user information
export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#9B8275"
      />
    </View>
  );
}

// Styles for the input container and text field
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },

  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5CFC0',
    fontSize: 16,
    color: '#80513B',
  },
});
