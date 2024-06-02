import { ProductCard } from "./ProductCard";
import { productStore } from "./store";

export const renderProducts = async () => {
  const goodsList = document.querySelector('.goods__list');

  const updateList = () => {
    const products = productStore.getProducts(); // получим продукты через store
    goodsList.innerHTML = '';

    if (products.length === 0) {
      const messageItem = document.createElement('li');
      messageItem.textContent = 'Товары не найдены';
      messageItem.classList.add('goods__no-product');
      goodsList.append(messageItem);
    } else {
      products.forEach((product) => {
        const productCard = ProductCard(product);
        goodsList.append(productCard);
      });
    }

  };

  productStore.subscribe(updateList); // подписываемся на стор (т.е. создаем наблюдателя updateList)
  updateList();

};