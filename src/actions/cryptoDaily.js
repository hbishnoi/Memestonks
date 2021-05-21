const axios = require("axios");

export const getCryptoItem = (symbol) => async (dispatch) => {
  const API_KEY = "9SEJV46K465GDV17";
  let ticker = symbol;

  try {
    let financialItem = await axios(
      `http://localhost:8080/cryptoDaily/${ticker}`
    );
    console.log(financialItem.data);
    dispatch({
      type: "GET_CRYPTO_ITEM",
      payload: financialItem.data,
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
