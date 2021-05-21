const axios = require("axios")

export const getFinancialItemMonthly = (symbol) => async dispatch => {

    const API_KEY = '9SEJV46K465GDV17';
    let ticker = symbol;

    try{
        let financialItem = await axios(`http://localhost:8080/financialMonthly/${ticker}`)
        dispatch({
            type: "GET_FINANCIAL_ITEM_MONTHLY",
            payload: financialItem.data
        })
    }catch (e) {
        console.log(e)
    }
}

export const get_search_term = (ticker) => ({
    type:'GET_SEARCH_TERM',
    payload: {
        ticker:ticker
    }
})