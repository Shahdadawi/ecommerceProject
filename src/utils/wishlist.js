export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  if (!exists) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist().filter((item) => item.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const isInWishlist = (productId) => {
  return getWishlist().some((item) => item.id === productId);
};
