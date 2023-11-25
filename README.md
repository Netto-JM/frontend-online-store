# Front-End Online Store

A simplified front-end application for an online store without database persistence. This project allows users to:

- Search for products by terms and categories using the Mercado Livre API.
- Interact with searched products, adding and removing them from a shopping cart with different quantities.
- View details and previous reviews of a product.
- Simulate the checkout process for selected items.

## Features

- **Search Products:** Explore a wide range of products by searching with terms or choosing from categories provided by the Mercado Livre API.

- **Shopping Cart:** Add and remove products from a shopping cart. Track different quantities for each item.

- **Product Details:** View detailed information about a product, including images, price, and shipping details.

- **Checkout Simulation:** Simulate the checkout process by entering buyer information and selecting a payment method.

## Pages Implemented

### Home

- The main page where users can search for products, view categories, and explore available items.

### Payment Page

- Simulates the checkout process, allowing users to enter buyer information and select a payment method.

### Products Detail

- Displays detailed information about a specific product, including images, price, and shipping details.

### Shopping Cart

- Shows the items added to the shopping cart, allowing users to review and proceed to checkout.

## How to Run

1. Clone the repository to your local environment.
2. Navigate to the project's root directory.
3. Install dependencies using `npm install`.
4. Start the application with `npm start`.

## Dependencies

- React
- React Router
- React Icons
- PropTypes
- FontAwesome

## API Integration

The project integrates with the Mercado Livre API to fetch product and category data.

## Local Storage

Local storage is used to store shopping cart items, buyer information, and product reviews.

## Contributors

- Juvenal Martins dos Santos Netto
- Bruna Freitas
- Izabela Fattori
- Giovane Fernandes
- Marcus Saviotti


## License

This project is licensed under the [MIT License](LICENSE).
