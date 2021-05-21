const initialState = {
  cryptoHealth: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_CRYPTO_HEALTH":
      console.log("payload", payload);
      return {
        ...state,
        cryptoHealth: payload,
      };

    default:
      return state;
  }
}
