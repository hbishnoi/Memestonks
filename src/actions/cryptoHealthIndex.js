const axios = require("axios");

export const getCryptoHealth = (symbol) => async (dispatch) => {
  const API_KEY = "9SEJV46K465GDV17";
  let ticker = symbol;

  try {
    let cryptoHealth = await axios(
      `http://localhost:8080/cryptoHealthIndex/${ticker}`
    );
    console.log(cryptoHealth.data);
    dispatch({
      type: "GET_CRYPTO_HEALTH",
      payload: cryptoHealth.data,
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
