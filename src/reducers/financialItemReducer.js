
const initialState = {
    financialItem: null
};

export default function (state=initialState,action) {
    const {type,payload}= action;

    switch (type) {
        case 'GET_FINANCIAL_ITEM':
          console.log('payload', payload);
          return {
              ...state,
              financialItem:payload
            };

        default:
          return state;
      }
}
