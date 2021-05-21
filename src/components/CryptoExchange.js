import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  get_search_term,
  getCryptoExchange,
} from "../actions/cryptoExchangeRate";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
import { Divider } from "@material-ui/core";
import CryptoSearch from "./CryptoSearch";
import CryptoHealth from "./CryptoHealth";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  // StyledTableRow,
  withStyles,
  Container,
  Button,
} from "@material-ui/core";
const axios = require("axios");

const CryptoExchange = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [cacheSearchTerm, setCacheSearchTerm] = useState(undefined);
  var [cacheButton, setCacheButton] = useState(false);

  const [searchTerm, setSearchTerm] = useState(props.searchValue);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Exchange Use effect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(props.searchValue.ticker));
        dispatch(getCryptoExchange(props.searchValue.ticker));
      } catch (e) {
        console.log(e);
      }

      try {
        axios(
          "http://localhost:8080/checkCryptoStock/" +
            currentUser.email +
            "/" +
            props.searchValue.ticker
        )
          .then((result) => {
            console.log("check button", result);
            if (result.data == null) {
              setCacheButton(false);
              setCacheSearchTerm(undefined);
            } else {
              setCacheButton(true);
              setCacheSearchTerm(undefined);
            }
          })
          .catch((error) => {
            console.error("error happened:" + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (props.searchValue != null) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [props.searchValue]);

  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        axios(
          "http://localhost:8080/addCryptoToprofile/" +
            currentUser.email +
            "/" +
            props.searchValue.ticker
        )
          .then((result) => {
            console.log("result crypto", result);
            setCacheButton(true);
          })
          .catch((error) => {
            console.error("error happened:" + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (cacheSearchTerm == "add") {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [cacheSearchTerm]);

  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        axios(
          "http://localhost:8080/deleteStockFromprofile/" +
            currentUser.email +
            "/" +
            props.searchValue.ticker
        )
          .then((result) => {
            console.log(result);
            setCacheButton(false);
          })
          .catch((error) => {
            console.error("error happened:" + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (cacheSearchTerm == "remove") {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [cacheSearchTerm]);

  const searchValue = async (value) => {
    console.log("value", value);
    // if (value == "add") {
    setCacheSearchTerm(value);
    console.log("cacheSearchTerm", cacheSearchTerm);
    // } else {
    //   setCacheSearchTerm(value);
    // }
  };

  const cryptoExchange = useSelector(
    (state) => state.cryptoExchange.cryptoExchange
  );
  console.log("Crypto exchange SELECTOR", cryptoExchange);
  if (cryptoExchange != null) {
    let data = cryptoExchange["Realtime Currency Exchange Rate"];
    console.log(data);
    return (
      <div>
        {cacheButton ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => searchValue("remove")}
          >
            Remove from List
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => searchValue("add")}
          >
            Add to list
          </Button>
        )}
        <div>
          {data ? <h2>Exchange Rates</h2> : null}
          <p>
            {data ? data["2. From_Currency Name"] + "(" : null}
            {data ? data["1. From_Currency Code"] + ") = " : null}
            {data ? data["3. To_Currency Code"] : null}{" "}
            {data ? data["5. Exchange Rate"] : null}
          </p>
          {data ? <p>Last Updated on {data["6. Last Refreshed"]} </p> : null}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Choose a Cryptocurrency to learn more about it!</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  finOverview: state.finOverview,
});

export default connect(mapStateToProps, { getCryptoExchange })(CryptoExchange);
