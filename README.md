# 📱 Mobilezone - Smartphones & Accessories Market

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A premier, fully responsive e-commerce web application engineered with **React 19**, **Vite**, and **Tailwind CSS v4**. Built for tech enthusiasts, it features flagship smartphones, MagSafe wireless ecosystems, GaN fast chargers, and an interactive administrative suite.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
  - [1. Multi-Angle High-Resolution Product Galleries](#1-multi-angle-high-resolution-product-galleries)
  - [2. Smartphone Spec Comparison Matrix](#2-smartphone-spec-comparison-matrix)
  - [3. Accessory Compatibility Matcher](#3-accessory-compatibility-matcher)
  - [4. Old Phone Trade-In Estimator](#4-old-phone-trade-in-estimator)
  - [5. Cart, Coupon Engine & 3-Step Checkout](#5-cart-coupon-engine--3-step-checkout)
  - [6. Master Admin Control Panel](#6-master-admin-control-panel)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🔑 Demo Login Credentials](#-demo-login-credentials)
- [📂 Project Directory Structure](#-project-directory-structure)

---

## ✨ Key Features

### 1. Multi-Angle High-Resolution Product Galleries
- **5 High-Res Photos per Device**: Front, rear camera island, sides, and lifestyle packaging.
- **Dynamic Colorway Swatching**: Selecting swatches updates the main device preview in real time.
- **Capacity & Variant Switcher**: Live storage selection (128GB, 256GB, 512GB, 1TB) dynamically calculates price adjustments.

### 2. Smartphone Spec Comparison Matrix
- Compare up to **4 devices side-by-side**.
- Comprehensive breakdown of Displays (OLED, AMOLED, 120Hz), SoCs (Apple A18 Pro, Snapdragon 8 Gen 3, Tensor G4), Cameras, Batteries, Fast Charging, and direct Add-to-Cart buttons.

### 3. Accessory Compatibility Matcher
- Filter 100% fitting MagSafe cases, 9H tempered glasses, GaN chargers, and magnetic car mounts for specific smartphone models (*iPhone 16 Pro Max, Galaxy S24 Ultra, Pixel 9 Pro XL*).

### 4. Old Phone Trade-In Estimator
- Step-by-step trade-in calculator evaluating model, storage, and cosmetic condition to compute instant cash credit with a 1-click **"Apply Credit to Cart"** button.

### 5. Cart, Coupon Engine & 3-Step Checkout
- **Free Express Shipping Meter**: Real-time progress bar towards free 2-day delivery ($50 threshold).
- **Promo Coupon Engine**: Supports codes like `MOBILE20` (20% off), `ZONE10` (10% off), `FREESHIP` ($15 credit), and `SUPER50`.
- **Checkout Wizard**: Shipping details, simulated payment gateways (Card, UPI/QR, Apple Pay, COD), order tracking reference (`#MZ-XXXXX`), and celebratory confetti animations!

### 6. Master Admin Control Panel
- **Real-Time KPIs**: Total Revenue, Completed Orders, Active Catalog Items, and Customer Satisfaction rating.
- **Catalog Management**: Add new products, update prices, manage stock quantities, and remove items.
- **Live Orders Queue**: Track customer orders and update status (`Processing` ➔ `Shipped` ➔ `Delivered`).
- **Promo Code Manager**: Create custom coupon codes with percentage discounts and minimum spend thresholds.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: React 19 (Hooks, Context API, Suspense)
- **Build Tool**: Vite 8 with `@tailwindcss/vite`
- **Styling**: Tailwind CSS v4 (Glassmorphism, dark/light theme, custom scrollbars)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **State Persistence**: LocalStorage sync for Cart, Wishlist, Comparison list, Authentication, and Orders.

---

## 🚀 Quick Start & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) installed.

### 1. Clone the Repository
```bash
git clone https://github.com/saivamshi38/Mobilezone-React-E-Commerce-Project.git
cd Mobilezone-React-E-Commerce-Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:5173`**.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Login Credentials

Click **"👤 Sign In"** in the top navigation bar:

- **👑 1-Click Demo Admin**:
  - **Email**: `admin@mobilezone.com`
  - **Password**: `admin123`
  - *Unlocks the full **Admin Control Panel** in the navigation bar.*

- **👤 1-Click Demo Customer**:
  - **Email**: `alex.reynolds@example.com`
  - **Password**: `user123`

---

## 📂 Project Directory Structure

```
mobilezone-app/
├── public/                  # Favicon & assets
├── src/
│   ├── components/
│   │   ├── admin/           # AdminDashboard, AddProductModal
│   │   ├── auth/            # AuthModal (Sign in & Registration)
│   │   ├── cart/            # CartDrawer, CheckoutModal
│   │   ├── catalog/         # ProductCard, FilterSidebar, ProductGrid
│   │   ├── common/          # Navbar, Footer, StarRating, Badge
│   │   ├── compare/         # PhoneComparisonModal
│   │   ├── home/            # HeroBanner, FlashDeals, BrandShowcase
│   │   ├── product/         # ProductDetailModal, SpecTable, ReviewSection
│   │   ├── tools/           # CompatibilityMatcher, TradeInCalculator
│   │   └── wishlist/        # WishlistDrawer
│   ├── context/             # AuthContext, CartContext, WishlistContext, CompareContext, ThemeContext, ToastContext
│   ├── data/                # products.js, brands.js, categories.js, coupons.js
│   ├── App.jsx              # Main application router and shell
│   ├── main.jsx             # React DOM root entry
│   └── index.css            # Tailwind CSS v4 styling rules
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).