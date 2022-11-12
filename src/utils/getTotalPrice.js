const getTotalPrice = (cart) => {
  let totalPrice = cart.reduce(
    (accu, curr) => accu + curr.price * curr.quantity,
    0
  );
  return totalPrice;
};

export default getTotalPrice;
