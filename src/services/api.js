export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export function constructorURL(categoryId, query) {
  let URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  if (!query && categoryId) {
    URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  }
  return URL;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = constructorURL(categoryId, query);
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getProductById(PRODUCT_ID) {
  const URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

const getKeyFromLocalStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  if (!data) {
    return defaultValue;
  }
  return JSON.parse(data);
};

const setKeyFromLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export function getCartItems() {
  const cartItems = getKeyFromLocalStorage('productKeys', []);
  return cartItems;
}

export function addToCart(item) {
  const cartItems = getKeyFromLocalStorage('productKeys', []);
  const curItem = cartItems.find(({ id }) => id === item.id);
  if (!curItem) {
    cartItems.push({
      id: item.id,
      quantity: 1,
      item,
    });
  }

  if (curItem) {
    curItem.quantity += 1;
  }
  setKeyFromLocalStorage('productKeys', cartItems);
}

export function removeFromCart(item) {
  const cartItems = getKeyFromLocalStorage('productKeys', []);
  const curItem = cartItems.find(({ id }) => id === item.id);
  if (!curItem) {
    return;
  }

  if (curItem.quantity <= 1) {
    return;
  }

  curItem.quantity -= 1;
  setKeyFromLocalStorage('productKeys', cartItems);
}

export function removeCompleteItemFromCart(item) {
  const cartItems = getKeyFromLocalStorage('productKeys', []);
  const index = cartItems.findIndex(({ id }) => id === item.id);

  const notFound = -1;
  if (index !== notFound) {
    cartItems.splice(index, 1);
  }
  setKeyFromLocalStorage('productKeys', cartItems);
}

export function addComment({ productId, rating, email, text }) {
  const comments = getKeyFromLocalStorage(productId, []);
  comments.push({
    rating,
    email,
    text,
  });
  setKeyFromLocalStorage(productId, comments);
}

export function getComment(productId) {
  return getKeyFromLocalStorage(productId, []);
}

export function getTotal() {
  const cartItems = getCartItems();
  const totalPrice = cartItems.reduce((acc, curr) => {
    const { quantity, item: { price } } = curr;
    const total = quantity * price;
    return acc + total;
  }, 0);
  return totalPrice;
}

export function getTotalQuantity() {
  const cartItems = getCartItems();
  const totalQuantity = cartItems.reduce((acc, curr) => (acc + curr.quantity), 0);
  return totalQuantity;
} // não sei se essa função é tão necessária, req 13 não passa, ele quer total de itens únicos?
