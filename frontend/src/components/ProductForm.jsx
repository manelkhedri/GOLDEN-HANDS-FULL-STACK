
import { useEffect, useState } from 'react';

const SERVER_URL = 'http://localhost:3000';

function ProductForm({ initialProduct, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Keychains',
    type: '',
    price: '',
    description: '',
    size: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        category: initialProduct.category || 'Keychains',
        type: initialProduct.type || '',
        price: initialProduct.price ?? '',
        description: initialProduct.description || '',
        size: initialProduct.size || ''
      });

      setImagePreview(initialProduct.image || '');
    } else {
      setFormData({
        name: '',
        category: 'Keychains',
        type: '',
        price: '',
        description: '',
        size: ''
      });

      setImagePreview('');
    }

    setImageFile(null);
  }, [initialProduct]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image (JPG, PNG, WEBP or GIF).');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must not exceed 5MB.');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      size: formData.size || undefined
    };

    if (imageFile) {
      productData.image = imageFile;
    } else if (!initialProduct) {
      alert('Please select a product image.');
      return;
    }

    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {initialProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      <input
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        {['Keychains', 'Gloves', 'Bags', 'Table Decor', 'Vests'].map(
          (category) => (
            <option key={category} value={category}>
              {category}
            </option>
          )
        )}
      </select>

      <input
        name="type"
        placeholder="Product type"
        value={formData.type}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        min="0"
        placeholder="Price (DA)"
        value={formData.price}
        onChange={handleChange}
        required
      />

      {/* Image upload */}
      <label htmlFor="product-image">
        Product Image
      </label>

      <input
        id="product-image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImageChange}
        required={!initialProduct}
      />

      {/* Image preview */}
      {imagePreview && (
        <div className="image-preview">
          <img
            src={
              imagePreview.startsWith('blob:')
                ? imagePreview
                : imagePreview.startsWith('http')
                  ? imagePreview
                  : `${SERVER_URL}${imagePreview}`
            }
            alt="Product preview"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'contain'
            }}
          />
        </div>
      )}

      <textarea
        name="description"
        placeholder="Product description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <select
        name="size"
        value={formData.size}
        onChange={handleChange}
      >
        <option value="">No size</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <button type="submit">
        {initialProduct ? 'Save Changes' : 'Add Product'}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ProductForm;

