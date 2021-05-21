const axios = require("axios");

export const getFinOverview = (symbol) => async (dispatch) => {
  console.log("inside actions overview");
  const API_KEY = "9SEJV46K465GDV17";
  let ticker = symbol;

  try {
    let finOverview = await axios(
      `http://localhost:8080/financial/overview/${ticker}`
    );
    console.log("overview actions", finOverview.data);
    dispatch({
      type: "GET_FINANCIAL_OVERVIEW",
      payload: finOverview.data,
    });
  } catch (e) {
    console.log(e);
  }
};
