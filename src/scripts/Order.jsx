export const Order = () => (
  <div class="order">
    <div class="order__wrapper">
      <h2 class="order__title">Оформить заказ</h2>

      <form class="order__form" id="order">
        <fieldset class="order__fieldset">
          <legend class="order__legend">Данные заказчика</legend>

          <div class="order__input-group">
            <input class="order__input" type="text" name="name-buyer" placeholder="Имя"/>
            <input class="order__input" type="text" name="phone-buyer" placeholder="Телефон"/>
          </div>
        </fieldset>

        <fieldset class="order__fieldset">
          <legend class="order__legend">Данные получателя</legend>
          <div class="order__input-group">
            <input class="order__input" type="text" name="name-recipient" placeholder="Имя"/>
            <input class="order__input" type="text" name="phone-recipient" placeholder="Телефон"/>
          </div>
        </fieldset>

        <fieldset class="order__fieldset">
          <legend class="order__legend">Адрес</legend>
          <div class="order__input-group">
            <input class="order__input" type="text" name="street" placeholder="Улица"/>
            <input class="order__input order__input_min" type="text" name="house" placeholder="Дом"/>
            <input class="order__input order__input_min" type="text" name="apartment" placeholder="Квартира"/>
          </div>
        </fieldset>

        <fieldset class="order__fieldset">
          <div class="order__payment">
            <label class="order__label-radio">
              <input class="order__radio" type="radio" name="payment-online" checked />
              Оплата онлайн
            </label>
          </div>

          <div class="order__delivery">
            <label for="delivery">Доставка 10.05</label>
            <input type="hidden" name="delivery-date" value="10.05"/>

            <div class="order__select-wrapper">
              <select class="order__select" name="delivery-time" id="delivery">
                <option value="9-12">с 9:00 до 12:00</option>
                <option value="12-15">с 12:00 до 15:00</option>
                <option value="15-18">с 15:00 до 18:00</option>
                <option value="18-21">с 18:00 до 21:00</option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>

      <div class="order__footer">
        <p class="order__total">9000&nbsp;₽</p>
        <button class="order__button" type="submit" form="order">Заказать</button>
      </div>
    </div>
    <button class="order__close" type="button">&times;</button>
  </div>
);