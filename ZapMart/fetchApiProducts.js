import fs from 'fs';
import https from 'https';

async function generate() {
  try {
    const data = await new Promise((resolve, reject) => {
      https.get('https://dummyjson.com/products?limit=200', (res) => {
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(rawData)); } catch(e) { reject(e); }
        });
      }).on('error', reject);
    });
    
    const categoryMapping = {
      'smartphones': 'Mobiles & Tablets',
      'tablets': 'Mobiles & Tablets',
      'laptops': 'Electronics',
      'mobile-accessories': 'Electronics',
      'fragrances': 'Beauty',
      'skincare': 'Beauty',
      'beauty': 'Beauty',
      'groceries': 'Grocery',
      'home-decoration': 'Home & Furniture',
      'furniture': 'Home & Furniture',
      'kitchen-accessories': 'Home & Furniture',
      'tops': 'Fashion',
      'womens-dresses': 'Fashion',
      'womens-shoes': 'Fashion',
      'mens-shirts': 'Fashion',
      'mens-shoes': 'Fashion',
      'mens-watches': 'Fashion',
      'womens-watches': 'Fashion',
      'womens-bags': 'Fashion',
      'womens-jewellery': 'Fashion',
      'sunglasses': 'Fashion'
    };

    const validProducts = [];

    data.products.forEach((p, index) => {
      const mappedCategory = categoryMapping[p.category];
      
      // If it's a category we support
      if (mappedCategory) {
        // DummyJSON prices are usually small (e.g. 549), convert roughly to INR
        const priceInr = Math.floor(p.price * 82); 
        const discount = Math.floor(p.discountPercentage || (Math.random() * 20 + 5));
        const originalPrice = Math.floor(priceInr * (1 + (discount / 100)));

        validProducts.push({
          id: `p${p.id}`,
          title: p.title,
          category: mappedCategory,
          price: priceInr,
          originalPrice: originalPrice,
          discount: discount,
          rating: p.rating || 4.0,
          reviews: p.reviews ? p.reviews.length : Math.floor(Math.random() * 5000) + 100,
          images: p.images && p.images.length > 0 ? p.images : [p.thumbnail],
          description: p.description
        });
      }
    });

    fs.writeFileSync('src/data/products.json', JSON.stringify(validProducts, null, 2));
    console.log(`Successfully fetched and transformed ${validProducts.length} products from DummyJSON!`);
  } catch (err) {
    console.error(err);
  }
}

generate();
