import { renderCart } from "./renderCart";
import { cartStore } from "./store";

const headerCartButton = document.querySelector('.header__cart-button');
const cartClose = document.querySelector('.cart__close');
const cart = document.querySelector('.cart');
const cartPriceTotal = document.querySelector('.cart__price_total');

const toggleCart = () => {
  cart.classList.toggle('cart_open');

  if (cart.classList.contains('cart_open') && window.innerWidth > 1360) {
    cart.scrollIntoView({behavior: 'smooth'});
  };
};

export const initCart = async () => {
  await cartStore.init(); // дождемся когда корзина инициализируется
  
  headerCartButton.textContent = cartStore.getCart().length; // отобразить в первый раз количество товаров в svg корзины
  renderCart();


  cartStore.subscribe(() => { //меняем количество товаров в svg корзины
    const cart = cartStore.getCart(); // получим данные с корзины
    headerCartButton.textContent = cart.length;
    
    const totalPriceValue = cart.reduce((acc, product) => { // подсчет общей стоимости корзины 
      return acc + product.price * product.quantity;
    }, 0);

    cartPriceTotal.innerHTML = `${totalPriceValue}&nbsp;₽`; // запишем в html общую сумму корзины
  });
  
  headerCartButton.addEventListener('click', toggleCart);
  
  cartClose.addEventListener('click', () => {
    cart.classList.remove('cart_open');
  });
};