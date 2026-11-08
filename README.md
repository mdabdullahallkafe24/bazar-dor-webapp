
# 🛒 বাজার দর | BazarDor

### Know Today's Market Prices at a Glance

BazarDor is a responsive web application that helps users explore daily essential product prices across different markets in Bangladesh. Users can compare prices, browse categories, view product details, and manage their accounts.

## 🚀 Live Website

Coming Soon

## 🛠️ Technologies Used

- Next.js (App Router)
- React.js
- JavaScript
- Tailwind CSS
- MongoDB
- Better Auth
- Google OAuth
- GitHub OAuth
- React Hot Toast

## ✨ Key Features

1. **Product Listing:** Browse essential products with their current prices and units.
2. **Price Comparison:** Explore products with increasing and decreasing price trends.
3. **Category Filtering:** Find products by category and sort them by price.
4. **Product Details:** View product information, minimum price, maximum price, average price, and market-wise prices.
5. **Authentication:** Register and sign in using email/password, Google, and GitHub.
6. **User Profile:** View and update profile information.
7. **Responsive Design:** Enjoy a user-friendly experience on mobile, tablet, and desktop devices.
8. **Protected Routes:** Restrict selected pages to authenticated users.

## 🔌 API Information

BazarDor uses the following API endpoints:

**Main API**
```text
https://openapi.programming-hero.com/api/bazardor
```

**Alternative APIs**
```text
https://api.api-store.workers.dev/api/bazardor
https://api.abcz.workers.dev/api/bazardor
```

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/mdabdullahallkafe24/bazar-dor-webapp.git
```

Go to the project directory:

```bash
cd bazar-dor-webapp
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory and configure the required environment variables:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

MONGODB_URI=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```text
bazar-dor-webapp/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Security

- Environment variables are kept out of version control.
- Authentication is handled using Better Auth.
- Social login uses Google and GitHub OAuth.

## 👨‍💻 Author

**Abdullah Al-Kafi**

GitHub: [@mdabdullahallkafe24](https://github.com/mdabdullahallkafe24)

---

Made with ❤️ for Bangladesh.

