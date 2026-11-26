
import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';

import { API_URL } from '../services/api';
import { getToken } from '../services/tokenService';
import CustomButton from '../components/CustomButton';

// Product form screen for adding or editing products
export default function ProductFormScreen({ product, onBack }) {

// Available product categories
const categories = [
  'Keychains',
  'Gloves',
  'Bags',
  'Table Decor',
  'Vests',
];

  // Store product form values
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [type, setType] = useState(product?.type || '');
  const [price, setPrice] = useState(
    product?.price != null ? String(product.price) : ''
  );
  const [description, setDescription] = useState(
    product?.description || ''
  );
  const [size, setSize] = useState(product?.size || '');
  const [image, setImage] = useState(null);

  // Open the device gallery and select a product image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Validate product information and prepare form data
  const handleSaveProduct = async () => {
    if (
      !name.trim() ||
      !category ||
      !type.trim() ||
      !price ||
      !description.trim()
    ) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    if (!product && !image) {
      Alert.alert('Missing Image', 'Please select a product image.');
      return;
    }

    // Prepare product data for the backend
    const formData = new FormData();

    formData.append('name', name.trim());
    formData.append('category', category);
    formData.append('type', type.trim());
    formData.append('price', String(Number(price)));
    formData.append('description', description.trim());

    if (size.trim()) {
      formData.append('size', size.trim().toUpperCase());
    }
// Attach the selected image as a file
if (image) {
  const productImage = new File(image.uri);
  formData.append('image', productImage);
}

    // Send product data to the backend
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Please log in again.');
      }

      const response = await fetch(
        product
          ? `${API_URL}/api/products/${product._id}`
          : `${API_URL}/api/products`,
        {
          method: product ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
  throw new Error(
    data.error || data.message || 'Failed to save product.'
  );
}

      Alert.alert(
        'Success',
        product ? 'Product updated successfully.' : 'Product added successfully.',
        [{ text: 'OK', onPress: onBack }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {product ? 'Edit Product' : 'Add New Product'}
      </Text>

      {/* Product name input */}
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#9B8275"
      />

      {/* Product category selection */}
<Text style={styles.label}>Category</Text>

<View style={styles.categoryContainer}>
  {categories.map((item) => (
    <Pressable
      key={item}
      style={[
        styles.categoryOption,
        category === item && styles.selectedCategory,
      ]}
      onPress={() => setCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          category === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </Pressable>
  ))}
</View>

      {/* Product type input */}
      <Text style={styles.label}>Product Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product type"
        value={type}
        onChangeText={setType}
        placeholderTextColor="#9B8275"
      />

      {/* Product price input */}
      <Text style={styles.label}>Price (DA)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholderTextColor="#9B8275"
      />

      {/* Product description input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Describe the product..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor="#9B8275"
      />

      {/* Product size input */}
      <Text style={styles.label}>Size</Text>
      <TextInput
        style={styles.input}
        placeholder="M, L, or XL"
        value={size}
        onChangeText={setSize}
        autoCapitalize="characters"
        placeholderTextColor="#9B8275"
      />

      {/* Product image picker */}
      <Text style={styles.label}>Product Image</Text>
      <Pressable style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          Choose Image from Gallery
        </Text>
      </Pressable>

      {/* Preview the selected product image */}
      {image ? (
        <Image
          source={{ uri: image.uri }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      ) : null}

      {/* Save product button */}
      <CustomButton
        title={product ? 'Update Product' : 'Save Product'}
        onPress={handleSaveProduct}
        backgroundColor="#A8420B"
        textColor="#FFFFFF"
      />

      {/* Cancel and return to admin products */}
      <View style={styles.cancelButton}>
        <CustomButton
          title="Cancel"
          onPress={onBack}
          backgroundColor="#F2A9C5"
          textColor="#80513B"
        />
      </View>
    </ScrollView>
  );
}

// Styles for the product form screen
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#F6EFE5',
  padding: 20,
  paddingTop: 20,
  paddingBottom: 100,
},
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#A8420B',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#80513B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5CFC0',
    fontSize: 15,
    color: '#80513B',
    marginBottom: 18,
  },
  descriptionInput: {
    height: 110,
  },
  imagePicker: {
    backgroundColor: '#F2A9C5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#80513B',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 180,
    height: 180,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 12,
    marginBottom: 25,
  },

  // Styles for product category options
categoryContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
  marginBottom: 18,
},

categoryOption: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E5CFC0',
},

selectedCategory: {
  backgroundColor: '#A8420B',
  borderColor: '#A8420B',
},

categoryText: {
  color: '#80513B',
  fontSize: 14,
  fontWeight: '600',
},

selectedCategoryText: {
  color: '#FFFFFF',
},
});

