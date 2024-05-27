import { store } from "./store";

export const initChoicesType = () => {
  const typeChoices = document.querySelector('.filter__choices_type');
  
  const updateTypeChoicesVisibility = () => {
    const categories = store.getCategories();

    if (categories.size) { //проверяем есть ли что-то в категориях (размер коллекцию Set)
      typeChoices.style.display = ''; // отображаем категории
      // !todo обновить категории
    } else  {
      typeChoices.style.display = 'none'; // скрываем 
    }
  };

  store.subscribe(updateTypeChoicesVisibility); // подписываемся на стор (т.е. создаем наблюдателя)
  
  updateTypeChoicesVisibility();
};