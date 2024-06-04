import { productStore } from "./store";
export const API_URL = 'https://southern-interesting-moonflower.glitch.me';

const formatQueryString = params => { // создаем query на основе переданных параметров
  if (Object.entries(params).length === 0) { //проверяем отсутствие ключей
    return '';
  }
  
  const searchParams = new URLSearchParams(); //создаем объект на основе search параметров
  Object.entries(params).forEach(([key, value]) => { // перебираем все параметры 'Array[]'
    searchParams.append(key, value);
  });

  return `?${searchParams.toString()}`; // преобразует объект в строку. Для searchParams преобразует в удобную строку key=value
};

export const fetchProducts = async (params = {}) => {
  try {
    const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    
    productStore.setProducts(products); // внесем товары в стор
  } catch (error) {
    console.log(`Ошибка при получении данных: ${error}`);
    return [];
  }
};

export const sendOrder = async (orderData) => { // отправляет данные заказа на сервер
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST', 
      credentials: 'include', // позволить передавать куки серверу
      headers: {
        "Content-Type": 'application/json', //отправляем на сервер json 
      },
      body: JSON.stringify(orderData), //сами данные привденные к строке json
    });

      if (!response.ok) {
        throw new Error(`Ошибка при заказе, попробуйте позже!  :: ${response.status}`)
      }

      return await response.json();
  } catch (error) {
    console.log(error);
  }
};