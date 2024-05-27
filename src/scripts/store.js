class Store {
  constructor() {
    this.observers = []; // массив для хранения функций-наблюдателей
    this.products = [];
    this.categories = new Set();
  }

  subscribe(observerFunc) { // метод добавления новых наблюдателей
    this.observers.push(observerFunc);
  }

  notifyObservers() { //метод для уведомления всех наблюдателей об изменении хранилища
    this.observers.forEach(observer => observer());
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
}


export const store = new Store('Андрей', 36);