
const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');

const products = [
  // 1. Keychains
  {
    name: "Strawberry Keychain",
    category: "Keychains",
    type: "Fruit",
    price: 500,
    image: "strowberry.jpg",
    description: "Handmade crochet strawberry keychain"
  },
  {
    name: "Letter A Keychain",
    category: "Keychains",
    type: "Letter",
    price: 600,
    image: "aletter.jpg",
    description: "Personalized crochet letter keychain"
  },
  {
    name: "Crochet Flower Keychain",
    category: "Keychains",
    type: "Flower",
    price: 500,
    image: "flower.jpg",
    description: "Cute handmade crochet flower keychain"
  },

  // 2. Gloves
  {
    name: "Full Finger Gloves",
    category: "Gloves",
    type: "Full Finger",
    price: 2000,
    image: "fullfing.jpg",
    description: "Warm handmade crochet gloves covering all fingers"
  },
  {
    name: "Fingerless Gloves",
    category: "Gloves",
    type: "Fingerless",
    price: 1800,
    image: "fingless.jpg",
    description: "Comfortable crochet gloves with exposed fingers"
  },
  {
    name: "Floral Fingerless Gloves",
    category: "Gloves",
    type: "Floral",
    price: 2200,
    image: "floglo.jpg",
    description: "Fingerless crochet gloves with a floral design"
  },

  // 3. Bags
  {
    name: "Mini Crochet Bag",
    category: "Bags",
    type: "Small",
    price: 2500,
    image: "minibag.jpg",
    description: "Small handmade crochet bag for everyday essentials"
  },
  {
    name: "Everyday Crochet Bag",
    category: "Bags",
    type: "Medium",
    price: 3500,
    image: "dailybag.jpg",
    description: "Medium-sized crochet bag for daily use"
  },
  {
    name: "Large Crochet Bag",
    category: "Bags",
    type: "Large",
    price: 4500,
    image: "largebag.jpg",
    description: "Large handmade crochet tote bag"
  },

  // 4. Table Decor
  {
    name: "Round Crochet Doily",
    category: "Table Decor",
    type: "Round",
    price: 1200,
    image: "round.jpg",
    description: "Round handmade crochet table decoration"
  },
  {
    name: "Rectangular Table Runner",
    category: "Table Decor",
    type: "Rectangular",
    price: 2500,
    image: "rectongular.jpg",
    description: "Rectangular crochet decoration for your table"
  },
  {
    name: "Heart Crochet Doily",
    category: "Table Decor",
    type: "Heart",
    price: 1500,
    image: "heart.jpg",
    description: "Heart-shaped handmade crochet table decoration"
  },

  // 5. Vests
  {
    name: "Crochet Vest M",
    category: "Vests",
    type: "Clothing",
    size: "M",
    price: 4500,
    image: "Mvest.jpg",
    description: "Handmade crochet vest in size M"
  },
  {
    name: "Crochet Vest L",
    category: "Vests",
    type: "Clothing",
    size: "L",
    price: 4800,
    image: "lvest.jpg",
    description: "Handmade crochet vest in size L"
  },
  {
    name: "Crochet Vest XL",
    category: "Vests",
    type: "Clothing",
    size: "XL",
    price: 5200,
    image: "xlvest.jpg",
    description: "Handmade crochet vest in size XL"
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    const operations = products.map(product => ({
      updateOne: {
        filter: { name: product.name },
        update: { $set: product },
        upsert: true
      }
    }));

    await Product.bulkWrite(operations);

    console.log('15 products added successfully!');

    await mongoose.disconnect();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error adding products:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedProducts();
