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

export function addToCart() {
  // TODO: criar
}

export function removeFromCart() {
  // TODO: criar
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
