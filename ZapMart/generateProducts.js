import fs from 'fs';

const categoriesInfo = {
  "Mobiles & Tablets": {
    minPrice: 10000,
    maxPrice: 120000,
    names: ["iPhone 14 Pro", "Samsung Galaxy S23", "OnePlus 11 5G", "Xiaomi 13 Pro", "Google Pixel 7", "Vivo X90", "iPad Air", "Samsung Tab S8"],
    brands: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Google"],
    imageKeyword: "smartphone"
  },
  "Electronics": {
    minPrice: 1500,
    maxPrice: 150000,
    names: ["MacBook Pro 16", "Dell XPS 13", "Sony WH-1000XM5", "Apple AirPods Pro", "Sony A7 III Camera", "Logitech MX Master 3", "Samsung Curved Monitor"],
    brands: ["Sony", "Dell", "Apple", "Logitech", "Samsung"],
    imageKeyword: "laptop"
  },
  "TVs & Appliances": {
    minPrice: 12000,
    maxPrice: 85000,
    names: ["LG 4K OLED Smart TV", "Samsung Double Door Refrigerator", "Whirlpool Washing Machine", "Bosch Microwave Oven", "Dyson Vacuum Cleaner", "Haier AC"],
    brands: ["LG", "Samsung", "Whirlpool", "Bosch", "Dyson"],
    imageKeyword: "appliance"
  },
  "Fashion": {
    minPrice: 400,
    maxPrice: 6000,
    names: ["Men's Solid T-Shirt", "Levi's Slim Fit Jeans", "Nike Running Shoes", "Zara Floral Dress", "Puma Sports Jacket", "Adidas Sneakers"],
    brands: ["Nike", "Levi's", "Zara", "Puma", "Adidas"],
    imageKeyword: "fashion"
  },
  "Beauty": {
    minPrice: 100,
    maxPrice: 3500,
    names: ["L'Oreal Matte Lipstick", "MAC Foundation", "Maybelline Mascara", "Nivea Body Lotion", "Lakme Eye Liner", "Plum Green Tea Toner", "Minimalist Serum"],
    brands: ["L'Oreal", "MAC", "Maybelline", "Nivea", "Minimalist"],
    imageKeyword: "cosmetics"
  },
  "Home & Furniture": {
    minPrice: 1500,
    maxPrice: 45000,
    names: ["IKEA 3-Seater Sofa", "Wooden Dining Table", "Ergonomic Office Chair", "Godrej Steel Almirah", "Modern Coffee Table", "Cotton Bedsheet Set"],
    brands: ["IKEA", "HomeTown", "Godrej", "Wakefit", "Urban Ladder"],
    imageKeyword: "furniture"
  },
  "Grocery": {
    minPrice: 40,
    maxPrice: 1200,
    names: ["Aashirvaad Whole Wheat Atta", "Nestle Classic Coffee", "Tata Premium Tea", "Amul Pure Ghee", "India Gate Basmati Rice", "Maggi 2-Minute Noodles"],
    brands: ["Nestle", "Amul", "Tata", "Aashirvaad", "Maggi"],
    imageKeyword: "grocery"
  }
};

const categoriesList = Object.keys(categoriesInfo);

const products = [];

for (let i = 1; i <= 1000; i++) {
  const category = categoriesList[Math.floor(Math.random() * categoriesList.length)];
  const catData = categoriesInfo[category];
  
  const brand = catData.brands[Math.floor(Math.random() * catData.brands.length)];
  const nameBase = catData.names[Math.floor(Math.random() * catData.names.length)];
  const title = `${brand} ${nameBase} - Variant ${Math.floor(Math.random() * 100)}`;
  
  const minP = catData.minPrice;
  const maxP = catData.maxPrice;
  const price = Math.floor(Math.random() * (maxP - minP + 1)) + minP;
  
  const discount = Math.floor(Math.random() * 60) + 5;
  const originalPrice = Math.floor(price * (1 + discount / 100));
  
  // To create some clear bestsellers
  const isBestseller = Math.random() > 0.85; 
  const rating = isBestseller ? (4.6 + Math.random() * 0.4).toFixed(1) : (3.0 + Math.random() * 1.5).toFixed(1);
  const reviews = isBestseller ? Math.floor(Math.random() * 9000) + 1100 : Math.floor(Math.random() * 900) + 10;
  
  const image = `https://loremflickr.com/400/400/${catData.imageKeyword}?lock=${i}`;

  products.push({
    id: `p${i}`,
    title: title,
    category: category,
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat(rating),
    reviews: reviews,
    images: [image, image, image], // Same image for gallery for simplicity
    description: `This is a premium ${title} from ${brand}. It offers great value and top-notch quality, perfect for your needs.`
  });
}

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2));
console.log("Successfully generated 1000 realistic products with real category-wise images!");
