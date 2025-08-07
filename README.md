# NearBuy 🛍️

A full-stack location-based platform that helps users find nearby shops selling the products they search for — complete with price, distance, and Google Maps redirection. Built with modern web technologies, NearBuy offers an intuitive experience for both customers and shop owners.

---

## 🚀 Features

### 🧑‍💼 For Users
- 🔍 Search for any product by name or category.
- 📍 Discover nearby shops based on live GPS coordinates.
- 📌 View shop details including price, distance, and availability.
- 🗺️ Get redirected to shop location via Google Maps.

### 🏪 For Shop Owners
- 📝 Register and manage shop profiles.
- 📦 Add, update, or delete product listings.
- 📊 Access a personalized shop dashboard.
- 🔐 Secure login & authentication.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API routes
- **Authentication**: JWT, Argon2
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Geolocation & Distance**: `ST_Distance_Sphere` SQL function
- **Other**: Google Maps API

---

## 🔐 Authentication & Security

- Passwords hashed using **argon2**
- JSON Web Token (**JWT**) based authentication
- Secure session handling for protected routes

---

## 🧭 How It Works

1. **User searches** for a product.
2. **Backend fetches nearby shops** based on current coordinates using `ST_Distance_Sphere`.
3. **Shops are sorted by distance** and displayed with redirection to Maps.
4. **Shop owners manage their products** via dashboard.

---

## 📸 Screenshots

*Add screenshots here if available*

---

## 📌 Setup & Run Locally

```bash
git clone https://github.com/your-username/nearbuy.git
cd nearbuy
npm install
# Set up your .env variables (DB, JWT secret, etc.)
npm run dev



