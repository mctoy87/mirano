import { CartElem } from "./CartElem";
import { cartStore } from "./store";

export const renderCart = () => { // создает карточки корзины
  const cartList = document.querySelector('.cart__list');


  const updateList = () => { // обновить данные корзины
    const cart = cartStore.getCart(); // получим данные с корзины

    cartList.textContent = ''; // очистим список товаров в корзине

    if (!cart.length) { // если товаров нет в корзине выводим сообщение
      const messageItem = document.createElement('li');
      messageItem.textContent = 'Корзина пуста';
      messageItem.classList.add('cart__no-product');
      cartList.append(messageItem);
      return;
    }
    const productCards = cart.map(CartElem); // создаем через jsx [] карточек товара на основе данных корзины
    cartList.append(...productCards); // запишем в html список товаров в корзине
  };
  
  cartStore.subscribe(updateList); // подписались за обновлением списка товаров в корзине
  updateList();
};