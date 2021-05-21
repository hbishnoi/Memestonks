import { combineReducers } from "redux";
import financialItem from "./financialItemReducer";
import financialItemWeekly from "./financialItemWeeklyReducer";
import financialItemMonthly from "./financialItemMonthlyReducer";
import financialOverview from "./financialOverviewReducer";
import cryptoExchange from "./cryptoExchangeReducer";
import cryptoHealth from "./cryptoHealthReducer";
import cryptoDaily from "./cryptoDailyReducer";
import cryptoWeekly from "./cryptoWeeklyReducer";
import cryptoMonthly from "./cryptoMonthlyReducer";
export default combineReducers({
  financialItem,
  financialItemWeekly,
  financialItemMonthly,
  financialOverview,
  cryptoExchange,
  cryptoHealth,
  cryptoDaily,
  cryptoWeekly,
  cryptoMonthly,
});
