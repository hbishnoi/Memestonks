const initState = {
  finOverview: null,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_FINANCIAL_OVERVIEW":
      console.log("overview Payload", payload);
      return {
        ...state,
        finOverview: payload,
      };
    default:
      return state;
  }
}
