import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get_search_term } from "../actions/financial";
import { getFinOverview } from "../actions/overview";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
import { Divider } from "@material-ui/core";
import "../App.css";
import { Button } from "@material-ui/core";
const axios = require("axios");

const FinancialOverview = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [cacheSearchTerm, setCacheSearchTerm] = useState(undefined);
  var [cacheButton, setCacheButton] = useState(false);

  const [searchTerm, setSearchTerm] = useState(props.searchValue);
  const dispatch = useDispatch();
  console.log("overview component", props.searchValue);
  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      try {
        //dispatch(get_search_term(searchTerm.ticker));
        dispatch(getFinOverview(props.searchValue.ticker));
      } catch (e) {
        console.log(e);
      }
      try {
        axios(
          "http://localhost:8080/checkStock/" +
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
          "http://localhost:8080/addStockToprofile1/" +
            currentUser.email +
            "/" +
            props.searchValue.ticker
        )
          .then((result) => {
            console.log(result);
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

  const finOverview = useSelector(
    (state) => state.financialOverview.finOverview
  );
  console.log("Overview SELECTOR", finOverview);
  if (finOverview != null) {
    return (
      <div className="overview">
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
        <p>
          EPS : {finOverview["EPS"] ? finOverview["EPS"] : "N/A"}, Target Price
          :{" "}
          {finOverview.AnalystTargetPrice
            ? finOverview.AnalystTargetPrice
            : "N/A"}{" "}
          , Dividend Yield :{" "}
          {finOverview.DividendYield ? finOverview.DividendYield : "N/A"}, 52
          week High :{" "}
          {finOverview["52WeekHigh"] ? finOverview["52WeekHigh"] : "N/A"}, 52
          week Low :{" "}
          {finOverview["52WeekLow"] ? finOverview["52WeekLow"] : "N/A"}
        </p>
        <ul className="overview-list">
          <li>
            <h2>Asset Type</h2>
            <p>{finOverview.AssetType ? finOverview.AssetType : "N/A"}</p>
          </li>
          <li>
            <h2>About the Company </h2>
            <p>{finOverview.Description ? finOverview.Description : "N/A"}</p>
          </li>
          <li>
            <h2>Sector </h2>
            <p>{finOverview.Sector ? finOverview.Sector : "N/A"}</p>
          </li>
          <li>
            <h2>Country </h2>
            <p>{finOverview.Country ? finOverview.Country : "N/A"}</p>
          </li>
        </ul>
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

export default connect(mapStateToProps, { getFinOverview })(FinancialOverview);
