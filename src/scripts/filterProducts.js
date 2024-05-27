import { fetchProducts } from "./api";

const filterType = type => {
  fetchProducts({type: type.value})
};

export const filterProducts = () => {
  const filterForm = document.querySelector('.filter__form');

  filterType(filterForm.type);

  filterForm.addEventListener('input', (event) => {
    const target = event.target;

    if (target.name === 'type') {
      filterType(filterForm.type);
    }
  });
};