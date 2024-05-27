import { ProductCard } from "./ProductCard";
import { store } from "./store";

export const renderProducts = async () => {
  const goodsList = document.querySelector('.goods__list');

  const updateList = () => {
    const products = store.getProducts(); // получим продукты через store
    goodsList.innerHTML = '';

    products.forEach((product) => {
      const productCard = ProductCard(product);
      goodsList.append(productCard);
    });
  };

  store.subscribe(updateList); // подписываемся на стор (т.е. создаем наблюдателя updateList)
  updateList();

};