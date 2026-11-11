
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addProduct,
  deleteProduct,
  updateProduct
} from '../features/productsSlice';

import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import SearchBar from './SearchBar';

function ProductList() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const products = useSelector((state) => state.products.items);
  const user = useSelector((state) => state.auth.user);
  const productError = useSelector((state) => state.products.error);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
  if (!isAdmin) {
    setShowAddForm(false);
    setSelectedProduct(null);
  }
 }, [isAdmin]);

  // Edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowAddForm(false);
  };

  // Update product
  const handleUpdate = async (productData) => {
    const result = await dispatch(
      updateProduct({
        id: selectedProduct.id,
        productData
      })
    );

    if (updateProduct.fulfilled.match(result)) {
      setSelectedProduct(null);
    }
  };

  // Add product
  const handleAddProduct = async (productData) => {
    const result = await dispatch(addProduct(productData));

    if (addProduct.fulfilled.match(result)) {
      setShowAddForm(false);
    }
  };

  // Delete product
  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (confirmed) {
      dispatch(deleteProduct(productId));
    }
  };

  // Product categories
  const categories = [
    ...new Set(products.map((product) => product.category))
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="products-section">
      <h2>Our Crochet Collection</h2>

      {/* Add product button */}
      {isAdmin && (
        
     <button
     className="add-product-btn"
      onClick={() => {
      setSelectedProduct(null);
      setShowAddForm(true);
     }}
     >
      + Add New Product
     </button>

      )}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <p>{filteredProducts.length} products found</p>

      {productError && (
        <p className="error-message">{productError}</p>
      )}

      <div className="products-layout">

        {/* Products list */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No products found. Try another search.</p>
          )}
        </div>

        {/* Add product sidebar */}
        {showAddForm && (
          <aside className="edit-sidebar">
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddForm(false)}
            />
          </aside>
        )}

        {/* Edit product sidebar */}
        {selectedProduct && (
          <aside className="edit-sidebar">
            <ProductForm
              initialProduct={selectedProduct}
              onSubmit={handleUpdate}
              onCancel={() => setSelectedProduct(null)}
            />
          </aside>
        )}

      </div>
    </section>
  );
}

export default ProductList;





