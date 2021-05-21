import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCryptoItem, get_search_term } from "../actions/cryptoDaily";
import CryptoSearch from "./CryptoSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CryptoHealth from "./CryptoHealth";
import CryptoExchange from "./CryptoExchange";
import CryptoNavApi from "./CryptoNavApi";

const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto daily useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getCryptoItem(searchTerm.ticker));
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
  const financialItem = useSelector((state) => state.cryptoDaily.financialItem);
  console.log("SELECTOR", financialItem);
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
              duration={"Daily chart"}
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

export default connect(mapStateToProps, { getCryptoItem })(FinancialItem);