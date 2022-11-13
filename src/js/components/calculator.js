import * as calculator from "../functions/calculator";

window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".form-calculate__btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      let value = Number(
        document.querySelector(".form-calculate__input").value
      );
      let currency = document.querySelector(".custom-select__top").textContent;
      if (currency == "Валюта ₽") currency = "RUB";
      if (currency == "Валюта $") currency = "USD";
      if (currency == "Валюта €") currency = "EUR";
      let { BTC, RUB } = await calculator.calculate(value, currency);
      let BTCFormatted = calculator.formatCurrency(BTC);
      let RUBFormatted = calculator.formatCurrency(RUB);
      document.querySelector(".form-calculate__btc").textContent =
        BTCFormatted + " BTC";
      document.querySelector(".form-calculate__currency").textContent =
        "(РУБ " + RUBFormatted + ")";
    });
});
