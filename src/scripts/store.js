import {API_URL} from './api';

class Store {
  constructor() {
    this.observers = []; // массив для хранения функций-наблюдателей
  }

  subscribe(observerFunc) { // метод добавления новых наблюдателей
    this.observers.push(observerFunc);
  }

  notifyObservers() { //метод для уведомления всех наблюдателей об изменении хранилища
    this.observers.forEach(observer => observer());
  }
};

class ProductStore extends Store { // новый store с товарами отнаследованный от Store
  constructor() {
    super(); // подтягиваем конструктор Store
    this.products = [];
    this.categories = new Set();
  }

  getProducts() {
    return this.products;
  }

  setProducts(newProducts) { // обновить список продуктов
    this.products = newProducts;
    this.updateCategories(newProducts); // обновить список категорий продуктов
    this.notifyObservers(); // уведомить наблюдателей об изменениях
  }

  getCategories() {
    return this.categories;
  }

  updateCategories(products) { // обновить список продуктов
    this.categories.clear(); // очищаем коллекцию Set от категорий

    products.forEach(product => { // проверим есть ли у продукта категории
      if (product.categories) {
        product.categories.forEach(category => { // записываем каждую категорию в коллекцию Set
          this.categories.add(category);
        })
      }
    });
    this.notifyObservers(); // уведомить наблюдателей об изменениях
  }
};

class CartStore extends Store { //новый store с корзиной
  constructor() {
    super();
    this.cart = [];
  }

  async init() {
    await this.registerCart(); // регистрация корзины и получение куки
    await this.fetchCart(); // получить данные и отправка куки
  }

  async registerCart() {
    try {
      const response = await fetch(`${API_URL}/api/cart/register`, {
        method: 'POST',
        credentials: 'include', // позволить передавать куки серверу
      });

      if (!response.ok) { //поймаем ошибку сервера
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) { // поймам вообще ошибки
      console.log(error);
    }
  };

  getCart() { //получить данные корзины
    return this.cart;
  }



  async addProductCart(id) { // добавить товар в корзину
    await this.postCart({id, quantity: 1});
  }

  async fetchCart() {
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'GET',
        credentials: 'include', // позволить передавать куки серверу
      });

      if (!response.ok) { //поймаем ошибку сервера
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // дожидаемся ответа с сервера и получаем в виде строки json
      this.cart = data; // запишем данные в корзину
      this.notifyObservers(); // оповестим слушателей об обновлении корзины
    } catch (error) { // поймам вообще ошибки
      console.log(error);
    }
  }

  async postCart({id, quantity}) { //удалить товар из корзины (если quantity: 0)
    try {
      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        credentials: 'include', // позволить передавать куки серверу
        headers: {
          "Content-Type": 'application/json', //отправляем на сервер json 
        },
        body: JSON.stringify({productId: id, quantity}), //сами данные привденные к строке json
      });

      if (!response.ok) { //поймаем ошибку сервера
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // дожидаемся ответа с сервера и получаем в виде строки json
      this.cart = data; // запишем данные в корзину
      this.notifyObservers(); // оповестим слушателей об обновлении корзины
    } catch (error) { // поймам вообще ошибки
      console.log(error);
    }
  }
}


export const productStore = new ProductStore();
export const cartStore = new CartStore();

