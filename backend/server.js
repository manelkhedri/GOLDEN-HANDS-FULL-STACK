
require('dotenv').config();

const express = require('express');

const upload = require('./config/upload');

const rateLimit = require('express-rate-limit');

const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const passport = require('passport');

const configurePassport = require('./config/passport');

const connectDB = require('./db');

const Product = require('./models/Product');

const authMiddleware = require('./middleware/authMiddleware');

const adminMiddleware = require('./middleware/adminMiddleware');

// Create an Express application
const app = express();
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: 'Too many requests. Please try again later.'
  }
});

app.use(cors());
app.use(express.json());
app.use(generalLimiter);
app.use(passport.initialize());
configurePassport(passport);

app.use('/api/auth', authRoutes);

// Define the server port
const PORT = 3000;

// Define the home route
app.get('/', (req, res) => {
  res.send('Welcome to GOLDEN HANDS Backend!');
});

// Get all products from MongoDB
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// Get a single product by ID from MongoDB
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the ID is valid
    if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching product',
      error: error.message
    });
  }
});


// Add a new product with an image
app.post(
  '/api/products',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  async (req, res) => {
    try {
      const productData = {
        ...req.body,
        image: req.file
          ? `/uploads/${req.file.filename}`
          : req.body.image
      };

      const newProduct = await Product.create(productData);

      res.status(201).json({
        message: 'Product added successfully',
        product: newProduct
      });

    } catch (error) {
      res.status(400).json({
        message: 'Error adding product',
        error: error.message
      });
    }
  }
);



// Update an existing product with an optional image
app.put(
  '/api/products/:id',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  async (req, res) => {
    try {
      const productId = req.params.id;

      if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
        return res.status(400).json({
          message: 'Invalid product ID'
        });
      }

      const updateData = {
        ...req.body
      };

      // Replace image only if a new one was uploaded
      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          message: 'Product not found'
        });
      }

      res.json({
        message: 'Product updated successfully',
        product: updatedProduct
      });

    } catch (error) {
      res.status(400).json({
        message: 'Error updating product',
        error: error.message
      });
    }
  }
);


// Delete a product from MongoDB
app.delete('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the ID is valid
    if (!/^[0-9a-fA-F]{24}$/.test(productId)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message
    });
  }
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});