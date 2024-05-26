import { fetchProducts } from "./api";
import { ProductCard } from "./ProductCard";

export const renderProducts = async () => {
  const goodsList = document.querySelector('.goods__list');
  const products = await fetchProducts();

  goodsList.innerHTML = '';

  products.forEach((product) => {
    console.log('product: ', product);
    const productCard = ProductCard(product);
    goodsList.append(productCard);
  });
};