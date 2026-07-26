import fs from 'fs';

const exactProducts = [
  // Mobiles
  { name: "Apple iPhone 14 Pro", category: "Mobiles & Tablets", price: 129900, imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" }, 
  { name: "Samsung Galaxy S23 Ultra", category: "Mobiles & Tablets", price: 124999, imgUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400" }, 
  { name: "OnePlus 11 5G", category: "Mobiles & Tablets", price: 56999, imgUrl: "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=400" }, 
  { name: "Xiaomi 13 Pro", category: "Mobiles & Tablets", price: 79999, imgUrl: "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=400" }, 
  
  // Electronics
  { name: "Apple MacBook Pro M2", category: "Electronics", price: 199900, imgUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" }, 
  { name: "Sony WH-1000XM5 Headphones", category: "Electronics", price: 29990, imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" }, 
  { name: "Dell XPS 13", category: "Electronics", price: 145990, imgUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400" }, 
  { name: "Apple AirPods Pro", category: "Electronics", price: 24900, imgUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400" }, 
  
  // Beauty
  { name: "M.A.C Studio Fix Fluid Foundation", category: "Beauty", price: 3300, imgUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400" }, 
  { name: "L'Oreal Paris Revitalift Serum", category: "Beauty", price: 999, imgUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" }, 
  { name: "Plum Green Tea Face Wash", category: "Beauty", price: 345, imgUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400" }, 
  { name: "Maybelline New York Mascara", category: "Beauty", price: 399, imgUrl: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400" }, 
  
  // Grocery
  { name: "Aashirvaad Shudh Chakki Atta, 5kg", category: "Grocery", price: 220, imgUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" }, 
  { name: "Tata Salt, 1kg", category: "Grocery", price: 28, imgUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400" }, 
  { name: "Maggi 2-Minute Noodles, 12 Pack", category: "Grocery", price: 168, imgUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400" }, 
  { name: "Amul Pure Ghee, 1L", category: "Grocery", price: 540, imgUrl: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400" }, 
  
  // Home & Furniture
  { name: "IKEA KIVIK 3-Seat Sofa", category: "Home & Furniture", price: 35000, imgUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" }, 
  { name: "Wakefit Memory Foam Mattress", category: "Home & Furniture", price: 12499, imgUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400" }, 
  { name: "Godrej Slimline Wardrobe", category: "Home & Furniture", price: 22000, imgUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400" }, 
  
  // Fashion
  { name: "Levi's Men's 511 Slim Fit Jeans", category: "Fashion", price: 2599, imgUrl: "https://images.unsplash.com/photo-1542272604-780c822830f2?w=400" }, 
  { name: "Nike Air Force 1 '07", category: "Fashion", price: 7495, imgUrl: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400" }, 
  { name: "Puma Men's Solid T-Shirt", category: "Fashion", price: 999, imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" }, 
  { name: "Zara Floral Print Midi Dress", category: "Fashion", price: 2990, imgUrl: "https://images.unsplash.com/photo-1515347619362-e6eb20194bfb?w=400" } 
];

const products = [];
let idCounter = 1;

// Generate exactly 200 items by repeating
for (let i = 0; i < 200; i++) {
  const base = exactProducts[i % exactProducts.length];
  
  const discount = Math.floor(Math.random() * 30) + 5; 
  const originalPrice = Math.floor(base.price * (1 + (discount / 100)));
  const rating = (4.0 + Math.random() * 0.9).toFixed(1);
  const reviews = Math.floor(Math.random() * 5000) + 50;
  
  products.push({
    id: `p${idCounter++}`,
    title: base.name,
    category: base.category,
    price: base.price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat(rating),
    reviews: reviews,
    images: [base.imgUrl, base.imgUrl],
    description: `Experience the best with ${base.name}. High quality, premium build, and excellent value for money.`
  });
}

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2));
console.log("Successfully generated exactly 200 perfectly realistic products with fixed Unsplash images!");
