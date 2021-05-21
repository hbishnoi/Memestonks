const axios = require("axios");

export const getCryptoExchange = (symbol) => async (dispatch) => {
  const API_KEY = "9SEJV46K465GDV17";
  let ticker = symbol;

  try {
    let cryptoExchange = await axios(
      `http://localhost:8080/cryptoExchangeRates/${ticker}`
    );
    console.log(cryptoExchange.data);
    dispatch({
      type: "GET_CRYPTO_EXCHANGE",
      payload: cryptoExchange.data,
    });
  } catch (e) {
    console.log(e);
  }
};
export const get_search_term = (ticker) => ({
  type: "GET_SEARCH_TERM",
  payload: {
    ticker: ticker,
  },
});
