const fs = require('fs');

// Real image URLs for categories
const categoryImages = {
  "Mobiles & Tablets": [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdcaa?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=400&auto=format&fit=crop"
  ],
  "Electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop", // Headphones
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop", // Earbuds
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop", // Laptop
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", // Watch
    "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=400&auto=format&fit=crop"  // Gadget
  ],
  "Fashion": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1434389678219-e935749f7bb1?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c028b?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400&auto=format&fit=crop"
  ],
  "Beauty": [
    "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=400&auto=format&fit=crop"
  ],
  "Home & Furniture": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400&auto=format&fit=crop"
  ],
  "TVs & Appliances": [
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400&auto=format&fit=crop", // TV
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop", // Fridge
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop", // Kitchen
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop" // AC
  ],
  "Grocery": [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=400&auto=format&fit=crop"
  ]
};

const categoryData = {
  "Mobiles & Tablets": { brands: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo"], adjectives: ["5G", "Pro Max", "Ultra", "Lite"], items: ["Smartphone", "Tablet", "Phablet"] },
  "Electronics": { brands: ["Sony", "Boat", "JBL", "Dell", "HP"], adjectives: ["Wireless", "Noise Cancelling", "Gaming", "Pro"], items: ["Headphones", "Earbuds", "Laptop", "Smartwatch"] },
  "Fashion": { brands: ["Puma", "Nike", "Adidas", "H&M", "Zara"], adjectives: ["Casual", "Formal", "Sporty", "Trendy"], items: ["T-Shirt", "Sneakers", "Jacket", "Jeans"] },
  "Beauty": { brands: ["Cetaphil", "L'Oreal", "Plum", "Minimalist"], adjectives: ["Hydrating", "Glowing", "Anti-aging", "Daily"], items: ["Face Wash", "Serum", "Moisturizer", "Sunscreen"] },
  "Home & Furniture": { brands: ["IKEA", "HomeTown", "Godrej", "Pepperfry"], adjectives: ["Wooden", "Modern", "Classic", "Premium"], items: ["Sofa", "Dining Table", "Bed", "Chair"] },
  "TVs & Appliances": { brands: ["LG", "Samsung", "Whirlpool", "Sony"], adjectives: ["Smart", "4K", "Inverter", "Automatic"], items: ["TV", "Refrigerator", "Washing Machine", "AC"] },
  "Grocery": { brands: ["Tata", "Aashirvaad", "Fortune", "Nestle"], adjectives: ["Organic", "Fresh", "Premium", "Healthy"], items: ["Atta", "Rice", "Oil", "Coffee"] }
};

const categoryNames = Object.keys(categoryData);
const products = [];

for (let i = 1; i <= 500; i++) {
  // Randomly pick a category
  const categoryName = categoryNames[Math.floor(Math.random() * categoryNames.length)];
  const catData = categoryData[categoryName];
  const catImages = categoryImages[categoryName];
  
  const brand = catData.brands[Math.floor(Math.random() * catData.brands.length)];
  const adj = catData.adjectives[Math.floor(Math.random() * catData.adjectives.length)];
  const item = catData.items[Math.floor(Math.random() * catData.items.length)];
  const imgUrl = catImages[Math.floor(Math.random() * catImages.length)];
  
  const originalPrice = Math.floor(Math.random() * 50000) + 500;
  const discount = Math.floor(Math.random() * 80) + 5; 
  const price = Math.floor(originalPrice - (originalPrice * discount) / 100);
  
  products.push({
    id: `p${i}`,
    category: categoryName,
    title: `${brand} ${adj} ${item}`,
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 10000) + 50,
    images: [imgUrl]
  });
}

fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
console.log('Successfully generated 500 categorized products!');

// Generate categories JSON
const categories = [
  { id: "c1", name: "Top Offers", image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=100&auto=format&fit=crop" },
  { id: "c2", name: "Mobiles & Tablets", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=100&auto=format&fit=crop" },
  { id: "c3", name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=100&auto=format&fit=crop" },
  { id: "c4", name: "TVs & Appliances", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=100&auto=format&fit=crop" },
  { id: "c5", name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=100&auto=format&fit=crop" },
  { id: "c6", name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=100&auto=format&fit=crop" },
  { id: "c7", name: "Home & Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=100&auto=format&fit=crop" },
  { id: "c8", name: "Flights", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=100&auto=format&fit=crop" },
  { id: "c9", name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=100&auto=format&fit=crop" }
];

fs.writeFileSync('./src/data/categories.json', JSON.stringify(categories, null, 2));
console.log('Successfully generated categories!');
