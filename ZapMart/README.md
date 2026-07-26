<div align="center">
  <img src="./public/zapmart-banner.png" alt="ZapMart Banner" width="100%" />

# ⚡ ZapMart

### Modern E-Commerce Frontend built with React.js

A fully responsive online shopping web app — product discovery, cart & checkout flow, authentication, wishlist, order history, and a dark mode toggle — built end-to-end in a hackathon sprint.

**[View GitHub Repository](https://github.com/umakantatech-eng/react-projects)**

</div>

---

## 📌 About the Project

ZapMart is a frontend e-commerce application that simulates a real online shopping experience — browsing products by category, adding items to a cart, applying deals, checking out, and tracking orders — all powered by mock/local JSON data (no backend required).

This project was built as part of a **hackathon**, with a focus on clean component architecture, state management with Redux, and a polished, responsive UI.

---

## 🚀 Features

- 🏠 **Home page** with banners, deals, and suggested products
- 🔍 **Product listing & detail pages** with category filters
- 🛒 **Cart & Checkout flow** with Redux-powered state
- ❤️ **Wishlist** to save products for later
- 📦 **Order history & Payment pages**
- 👤 **Authentication** — Login / Signup with protected routes
- 🏷️ **Deals page** for discounted products
- 📍 **Address management** for checkout
- 🌗 **Dark mode** via Context API
- 🔔 **Toast notifications** for user feedback
- 📱 **Fully responsive** — works across desktop, tablet, and mobile
- 🧩 **Reusable UI components** (Navbar, Footer, Cards, Buttons, etc.)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Library | React.js |
| Routing | React Router |
| State Management | Redux Toolkit |
| Forms | React Hook Form |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Linting | ESLint (oxlint) |
| Data | Local JSON (mock API) |

---

## 📂 Folder Structure

```
ZapMart/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/               # Images & static assets
│   ├── components/
│   │   ├── auth/             # Auth-related components
│   │   ├── cart/             # Cart components
│   │   ├── common/           # Navbar, Footer, Toast, ProtectedRoute
│   │   ├── home/             # Home page sections
│   │   ├── layout/           # Layout wrappers
│   │   ├── product/          # Product cards, grids, filters
│   │   ├── profile/          # Profile-related components
│   │   └── ui/               # Generic reusable UI elements
│   ├── constants/            # App-wide constants
│   ├── context/
│   │   └── ThemeContext.jsx  # Dark mode context
│   ├── data/
│   │   ├── categories.json   # Mock category data
│   │   └── products.json     # Mock product data
│   ├── hooks/                # Custom React hooks
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Categories.jsx
│   │   ├── Deals.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Payment.jsx
│   │   ├── Orders.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Addresses.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ErrorPage.jsx
│   ├── redux/
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   ├── ordersSlice.js
│   │   ├── wishlistSlice.js
│   │   ├── toastSlice.js
│   │   └── store.js
│   ├── services/             # API/service helper functions
│   ├── utils/                # Utility/helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── generateData.cjs           # Script to generate mock data
├── generateProducts.js
├── generateExactProducts.js
├── fetchApiProducts.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/umakantatech-eng/react-projects/ZapMart.git

# Navigate into the project
cd ZapMart

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173` 🎉

---

## 📸 Screenshots

| Desktop View | Mobile View |
|---|---|
| Home page with banners & suggested products | Compact mobile-first layout |

*(Add your screenshots here)*

---

## 🧠 What I Learned

- Structuring a scalable React project with clear separation of components, pages, and state
- Managing global state (cart, wishlist, auth, orders) using Redux Toolkit
- Implementing protected routes for authenticated pages
- Building a dark mode toggle using Context API
- Working under time pressure to deliver a complete, functional product in a hackathon setting

---

## 👤 Author

**Umakanta**
Built as a hackathon project.

---

## 📄 License

This project is for learning/demo purposes.