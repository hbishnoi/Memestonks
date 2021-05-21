const axios = require("axios")
export const getFinancialItemWeekly = (symbol) => async dispatch => {

    let ticker = symbol;

    try{
        let financialItem = await axios(`http://localhost:8080/financialWeekly/${ticker}`)
        console.log("Data from the api call")
        console.log(financialItem.data)
        dispatch({
            type: "GET_FINANCIAL_ITEM_WEEKLY",
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