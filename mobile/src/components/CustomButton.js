
import { Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton({
  title,
  onPress,
  backgroundColor = '#A8420B',
  textColor = '#FFFFFF',
}) {
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
