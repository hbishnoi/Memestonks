import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { get_search_term } from "../actions/cryptoExchangeRate";
import { getCryptoHealth, get_search_term } from "../actions/cryptoHealthIndex";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import CryptoSearch from "./CryptoSearch";

const CryptoHealth = (props) => {
  const [searchTerm, setSearchTerm] = useState(props.searchValue);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Health Use effect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(props.searchValue.ticker));
        dispatch(getCryptoHealth(props.searchValue.ticker));
      } catch (e) {
        console.log(e);
      }
    }
    if (props.searchValue != null) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [props.searchValue]);
  //   const searchValue = async (value) => {
  //     setSearchTerm(props.searchValue);
  //     console.log(searchTerm);
  //   };

  const cryptoHealth = useSelector((state) => state.cryptoHealth.cryptoHealth);
  console.log("Crypto Health SELECTOR", cryptoHealth);
  if (cryptoHealth != null) {
    let data = cryptoHealth["Crypto Rating (FCAS)"];
    console.log(data);
    return (
      <div>
        <div>
          {data ? <h2>Crypto health</h2> : null}
          {data ? data["2. name"] + "'s health is currently " : null}
          {data ? data["3. fcas rating"] : null}

          {data ? <p>FCAS Score : {data["4. fcas score"]}</p> : null}
          {data ? <p>Developer Score : {data["5. developer score"]}</p> : null}
          {data ? (
            <p>Market Maturity Score : {data["6. market maturity score"]}</p>
          ) : null}
          {data ? <p>Last Updated on {data["8. last refreshed"]} </p> : null}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  finOverview: state.finOverview,
});

export default connect(mapStateToProps, { getCryptoHealth })(CryptoHealth);
