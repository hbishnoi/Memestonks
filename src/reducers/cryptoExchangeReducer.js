const initialState = {
  cryptoExchange: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_CRYPTO_EXCHANGE":
      console.log("payload", payload);
      return {
        ...state,
        cryptoExchange: payload,
      };

    default:
      return state;
  }
}
