import { left } from "@popperjs/core";

// cached data
let bitcoinData = [];
let rubleData = [];
let percent = 0;
let initialized = false;

function loadBTCCurrency(targetCurrency) {
  return new Promise((resolve, reject) => {
    fetch("https://cex.io/api/last_price/BTC/" + targetCurrency)
      .then((response) => response.json())
      .then((jsonData) => {
        bitcoinData[targetCurrency] = Number(jsonData["lprice"]);
        resolve();
      });
  });
}

function loadRUBCurrency() {
  return new Promise((resolve, reject) => {
    fetch("api/currency.php")
      .then((response) => response.json())
      .then((jsonData) => {
        rubleData["USD"] = Number(jsonData["data"]["USDRUB"]);
        rubleData["EUR"] = Number(jsonData["data"]["EURRUB"]);
        resolve();
      })
      .catch((error) => {
        console.log("Error when connecting to API");
        console.log(error);
        rubleData["USD"] = 64.1824;
        rubleData["EUR"] = 69.244;
        resolve();
      });
  });
}

function loadPercent() {
  return new Promise((resolve, reject) => {
    fetch("api/percent.php")
      .then((response) => response.json())
      .then((jsonData) => {
        percent = Number(jsonData["percent"]);
        resolve();
      })
      .catch((error) => {
        console.log("Error when connecting to API");
        console.log(error);
        percent = 3.7;
        resolve();
      });
  });
}

function init() {
  return new Promise((resolve, reject) => {
    if (!initialized) {
      Promise.all([
        loadBTCCurrency("USD"),
        loadBTCCurrency("EUR"),
        loadRUBCurrency(),
        loadPercent(),
      ]).then(() => {
        initialized = true;
        resolve();
      });
    } else {
      resolve();
    }
  });
}

function convertToBTC(value, currency) {
  return new Promise((resolve, reject) => {
    init().then(() => {
      if (!["USD", "RUB", "EUR"].includes(currency)) {
        console.error("Wrong currency value, use: USD, RUB, EUR");
        reject();
      }
      // convert value to BTC
      let btcValue = 0;
      value = Number(value);
      if (currency == "USD") {
        btcValue = value / bitcoinData["USD"];
      }
      if (currency == "EUR") {
        btcValue = value / bitcoinData["EUR"];
      }
      if (currency == "RUB") {
        let usdValue = value / rubleData["USD"];
        btcValue = usdValue / bitcoinData["USD"];
      }
      resolve(btcValue);
    });
  });
}

function formatPart(value) {
  let i = 0;
  let j = 0;
  let newstr = "";
  while (i < value.length) {
    newstr = newstr + value.charAt(i);
    if (j == 2) {
      newstr = newstr + " ";
      j = -1;
    }
    i++;
    j++;
  }
  return newstr;
}

function reverse(str) {
  return str.split("").reverse().join("");
}

export function formatCurrency(value) {
  value = String(Number(Number(value).toFixed(8)));
  if (value.split(".").length > 1) {
    let parts = value.split(".");
    parts[0] = reverse(formatPart(reverse(parts[0])));
    parts[1] = formatPart(parts[1]);
    return parts[0] + "." + parts[1];
  } else {
    return reverse(formatPart(reverse(value)));
  }
}

export async function calculate(value, currency) {
  let btc0 = await convertToBTC(value, currency);
  let btc1 = btc0 * percent;
  let usd1 = btc1 * bitcoinData["USD"];
  let rub1 = usd1 * rubleData["USD"];
  return {
    BTC: btc1,
    RUB: rub1,
  };
}
