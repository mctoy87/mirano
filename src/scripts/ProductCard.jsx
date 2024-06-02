import { API_URL } from "./api";
import { cartStore } from "./store";

export const ProductCard = (product) => (
  <li class="goods__item">
    <article class="goods__card card">
      <img class="card__image" src={`${API_URL}${product.photoUrl}`} alt={product.name} />
      <div class="card__content">
        <h3 class="card__title">{product.name}</h3>
        <div class="card__footer">
          <p class="card__date-delivery">сегодня в 14:00</p>
          <button class="card__btn"
            onMouseEnter = {(e) => {
              e.target.textContent = "В корзину";
            }}
            onMouseLeave = {(e) => {
              e.target.innerHTML = `${product.price}&nbsp;₽`;
            }}
            onClick= {() => { // по клику передаем id товара в корзину
              cartStore.addProductCart(product.id); 
            }}>
            {product.price}&nbsp;₽
          </button>
        </div>
      </div>
    </article>
  </li>
);

