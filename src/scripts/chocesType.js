import { ListType } from "./ListType";
import { store } from "./store";

export const initChoicesType = () => {
  const typeChoices = document.querySelector('.filter__choices_type');
  const choicesBox = document.querySelector('.filter__choices-box_type');
  
  const updateTypeChoicesVisibility = () => {
    const categories = store.getCategories();

    

    if (categories.size) { //проверяем есть ли что-то в категориях (размер коллекцию Set)
      typeChoices.style.display = ''; // отображаем категории
      choicesBox.textContent = '';
      const listType = ListType([...categories]);
      choicesBox.append(listType);
    } else  {
      typeChoices.style.display = 'none'; // скрываем 
    }
  };

  store.subscribe(updateTypeChoicesVisibility); // подписываемся на стор (т.е. создаем наблюдателя)
  
  updateTypeChoicesVisibility();
};