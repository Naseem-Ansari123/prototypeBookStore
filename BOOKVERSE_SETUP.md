# BookVerse auth + cart + payments update

## 1. Backend
```bash
cd backend
npm install
node index.js
```

MongoDB must be running at `mongodb://localhost:27017/BookStore`.

Optional real Razorpay test mode:
```bash
npm install razorpay
```
Then set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `JWT_SECRET` in your shell/environment and restart the backend. Without Razorpay keys/package, checkout uses a local demo payment so the complete order/store flow can be tested.

## 2. Frontend
```bash
cd "http request"
npm install
npm run dev
```

## Important changes
- User and admin sessions are now stored separately:
  - `bookverse-user-session`
  - `bookverse-admin-session`
- Admin logout cannot clear the user session and user logout cannot clear the admin session.
- `/users/me` and `/admins/me` validate persisted JWT sessions after refresh.
- User signup/login return proper 400/401/409 errors instead of HTTP 505.
- Admin signup stores the logo as a data URL instead of a temporary `blob:` URL.
- Products created by an admin are always assigned to the authenticated admin on the server.
- Cart is persisted separately and initialized for the logged-in user.
- Checkout re-reads price/discount/stock from MongoDB on the server.
- Paid orders are stored in the `orders` collection.
- `/orders/admin` only returns paid orders containing products belonging to the logged-in store.
- The seller dashboard shows paid-order count and store revenue.
- `/user/orders` now loads real orders instead of hard-coded demo data.

## Test flow
1. Create a normal user and log in.
2. Open `/user/books`, add books from one or more stores to cart.
3. Open Cart -> Checkout.
4. Enter delivery details.
5. In development without Razorpay keys, click **Pay & Place Order** and the demo payment creates a real MongoDB order.
6. Log in as the store owner that owns a purchased book.
7. Open Seller Dashboard -> Orders. The paid order and only that store's items/revenue are shown.
8. Repeat with a second store to verify store isolation.
