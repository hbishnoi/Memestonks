import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCryptoMonthly, get_search_term } from "../actions/cryptoMonthly";
import CryptoSearch from "./CryptoSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CryptoNavApi from "./CryptoNavApi";
import CryptoHealth from "./CryptoHealth";
import CryptoExchange from "./CryptoExchange";

const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Monthly useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getCryptoMonthly(searchTerm.ticker));
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm]);
  const searchValue = async (value) => {
    setSearchTerm(value);
  };
  const financialItem = useSelector(
    (state) => state.cryptoMonthly.financialItem
  );
  console.log("Crypto Monthhly SELECTOR", financialItem);
  if (
    financialItem &&
    financialItem.errorMessage &&
    financialItem.errorMessage === "error"
  ) {
    return (
      <div className="financial-item-big-wrapper">
        <div>
          <CryptoSearch searchValue={searchValue} />
          <p className="error-message">
            {" "}
            Data for this company does not exist or API calls exceeded. Please
            Try again after sometime!{" "}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="financial-item-big-wrapper">
        <CryptoNavApi />
        <div>
          <CryptoSearch searchValue={searchValue} />
          {financialItem ? (
            <LineChart
              color="red"
              financialItem={financialItem}
              financialItemName={financialItem.symbol}
              duration={"Monthly chart"}
            />
          ) : null}
        </div>
        <div>
          { searchTerm ?
          <CryptoExchange searchValue={searchTerm} /> : null}
        </div>
        <div>
        {
            searchTerm ?            
          <CryptoHealth searchValue={searchTerm} />: null}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  financialItem: state.financialItem,
});

export default connect(mapStateToProps, { getCryptoMonthly })(FinancialItem);
