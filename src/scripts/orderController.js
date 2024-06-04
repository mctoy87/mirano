import { Order } from "./Order";
import { sendOrder } from "./api";
import { OrderSuccess } from "./orderSuccess";
import { cartStore } from "./store";

const cartOrderBtn = document.querySelector('.cart__order-btn');
const cartElem = document.querySelector('.cart');

const openOrder = () => { // открывает форму 'заказа'
  const cart = cartStore.getCart(); // получаем 'корзину'
  cartOrderBtn.disabled = !cart.length; // дизейблим кнопку офорить 'заказ', если товаров в корзине нет

  cartElem.classList.remove('cart_open'); // закрываем корзину товаров когда открылась форма заказа

  const totalPriceValue = cart.reduce((acc, product) => { // подсчет общей стоимости 'корзины' 
    return acc + product.price * product.quantity;
  }, 0);

  const order = Order(totalPriceValue); // создаем 'заказ' на основе Order.jsx и общей стоимости 'заказа'
  document.body.append(order); // вставляем 'заказ' в HTML

  order.addEventListener('click', ({target}) => {
    if (target === order || target.closest('.order__close')) { // закрыть форму запроса при клике мимо формы или на крестик
      order.remove();
    }
  });

  const form = order.querySelector('.order__form'); // получим форму из формы заказа

  form.addEventListener('submit',async (e) => {
    e.preventDefault();

    const formData = new FormData(form); // получим данные формы

    const data = { // собираем body для передачи на сервер
      buyer: {
        name: formData.get('name-buyer'),
        phone: formData.get('phone-buyer'),
      },
      recipient: {
        name: formData.get('name-recipient'),
        phone: formData.get('phone-recipient'),
      },
      address: `${formData.get('street')}, ${formData.get('house')}-${formData.get('apartment')}`,
      paymentOnline: `${formData.get('payment-online') === 'true'}`,
      deliveryDate: formData.get('delivery-date'),
      deliveryTime: formData.get('delivery-time'),
    };

    const result = await sendOrder(data); // отправляем данные заказа на сервер

    const orderSuccess = OrderSuccess(result.orderId); // если заказ оформлен успешно - показать инфо заказчику
    
    order.textContent = ''; // очищаем текст в форме заказа
    order.append(orderSuccess); //покажем что заказ отправлен

    cartStore.clearCart(); // очищаем стор



  })
};

export const initOrder = () => { // запускает скрипт оформления 'заказа'
  const checkCart = () => {
    const cart = cartStore.getCart(); // получаем 'корзину'
    cartOrderBtn.disabled = !cart.length; // дизейблим кнопку офорить 'заказ', если товаров в корзине нет
  };

  cartStore.subscribe(checkCart); // подпишемся на обновление 'корзины', чтобы вызывать checkCart

  cartOrderBtn.addEventListener('click', openOrder); // по клику открываем форму 'заказа'


};