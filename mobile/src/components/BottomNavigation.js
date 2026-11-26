import { View, Text, Pressable, StyleSheet } from 'react-native';

// Display the bottom navigation bar
export default function BottomNavigation({
  currentScreen,
  onNavigate,
  isAdmin,
}) {
  // Define the navigation items
  const navigationItems = [
    { name: 'Home', screen: 'products', icon: '⌂' },
    { name: 'Cart', screen: 'cart', icon: '🛒' },
     ...(isAdmin
    ? [{ name: 'Manage Products', screen: 'adminProducts', icon: '⚙️' }]
    : []),
    { name: 'Account', screen: 'profile', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      {navigationItems.map((item) => (
        <Pressable
          key={item.screen}
          style={styles.navItem}
          onPress={() => onNavigate(item.screen)}
        >
          <Text style={styles.icon}>{item.icon}</Text>

          <Text
            style={[
              styles.label,
              currentScreen === item.screen && styles.activeLabel,
            ]}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// Styles for the bottom navigation bar
const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5CFC0',
    
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 22,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#80513B',
  },
  activeLabel: {
    color: '#A8420B',
    fontWeight: 'bold',
  },
});