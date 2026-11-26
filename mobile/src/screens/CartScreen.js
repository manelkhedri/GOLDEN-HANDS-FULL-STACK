
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import { API_URL } from '../services/api';
import CustomButton from '../components/CustomButton';

// Display the shopping cart and manage product quantities
export default function CartScreen({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  onBack,
}) {
  // Calculate the total price of all cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Prepare the product image URL
  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith('http')) {
      return image;
    }

    return `${API_URL}/${image.replace(/^\/+/, '')}`;
  };

  // Display one product inside the shopping cart
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: getImageUrl(item.image) }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.productPrice}>
          {item.price} DA
        </Text>

        {/* Quantity controls */}
        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => onDecrease(item._id)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>

          <Pressable
            style={styles.quantityButton}
            onPress={() => onIncrease(item._id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        {/* Remove product from cart */}
        <Pressable onPress={() => onRemove(item._id)}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cart header */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>My Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Your cart is empty.
          </Text>

          <CustomButton
            title="Continue Shopping"
            onPress={onBack}
            backgroundColor="#A8420B"
            textColor="#FFFFFF"
          />
        </View>
      ) : (
        <>
          {/* List of selected products */}
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />

          {/* Cart total and checkout button */}
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: {totalPrice} DA
            </Text>

            <CustomButton
              title="Proceed to Checkout"
              onPress={onCheckout}
              backgroundColor="#A8420B"
              textColor="#FFFFFF"
            />
          </View>
        </>
      )}
    </View>
  );
}

// Styles for the shopping cart screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFE5',
    paddingTop: 45,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#A8420B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#A8420B',
    marginRight: 45,
  },
  list: {
    paddingBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },
  productImage: {
    width: 105,
    height: 115,
    borderRadius: 10,
    backgroundColor: '#F4D9E8',
  },
  productInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A8420B',
  },
  productPrice: {
    fontSize: 14,
    color: '#80513B',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 15,
  },
  quantityButton: {
    width: 27,
    height: 27,
    borderRadius: 7,
    backgroundColor: '#F4D9E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#A8420B',
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#80513B',
  },
  removeText: {
    color: '#B00020',
    fontSize: 12,
    marginTop: 8,
  },
  footer: {
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: '#E5CFC0',
  },
  totalText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#A8420B',
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#80513B',
  },
});
