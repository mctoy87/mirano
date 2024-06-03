import { cartStore } from "./store";

const cartOrderBtn = document.querySelector('.cart__order-btn');

export const initOrder = () => {
  const checkCart = () => {
    const cart = cartStore.getCart(); // получаем корзину
    cartOrderBtn.disabled = !cart.length; // дизейблим кнопку офорить заказ, если товаров в корзине нет
  };

  cartStore.subscribe(checkCart); // подпишемся на обновление корзины, чтобы вызывать checkCart
};