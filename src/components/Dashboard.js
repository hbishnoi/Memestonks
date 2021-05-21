import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  makeStyles,
  withStyles,
  Container,
  Button,
} from "@material-ui/core";
const axios = require("axios");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  add_remove_stock_chart: {
    backgroundColor: "rgb(248, 113, 113)",
  },
});

function Dashboard() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const [deleteTerm, setDeleteTerm] = useState("");
  const [searchData, setSearchData] = useState(false);

  const [mainData, setMainData] = useState(undefined);

  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      try {
        axios("http://localhost:8080/checkStock/" + currentUser.email + "/")
          .then((result) => {
            console.log("check button", result);
            setMainData(result.data);
            setSearchData(true);
          })
          .catch((error) => {
            console.error("error happened:" + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("delete useEffect fired");
    async function fetchData() {
      try {
        axios(
          "http://localhost:8080/deleteStockFromprofile/" +
            currentUser.email +
            "/" +
            deleteTerm
        )
          .then((result) => {
            console.log(result);

            console.log(result.newCompanyValue);
            setMainData(result.data.newCompanyValue);
            setSearchData(true);
          })
          .catch((error) => {
            console.error("error happened:" + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (deleteTerm) {
      console.log("deleteTerm is set");
      fetchData();
    }
  }, [deleteTerm]);

  const deleteValue = async (value) => {
    setDeleteTerm(value);
  };

  console.log("mainData", mainData);

  let profileStockData = [];
  let mainParsedData = mainData;
  console.log("mainParsedData", mainParsedData);
  for (let i in mainParsedData) {
    console.log(mainParsedData[i]);
    profileStockData.push(JSON.parse(mainParsedData[i]));
  }

  let card = null;

  console.log("profileStockData", profileStockData);

  const buildCard = (character) => {
    if (searchData) {
      return (
        <TableBody>
          {/* {companyname} */}
          <StyledTableRow key={"row.name"}>
            <StyledTableCell component="th" scope="row">
              {character.companyName}
            </StyledTableCell>
            <StyledTableCell align="right">
              {character.companySymbol}
            </StyledTableCell>
            <StyledTableCell align="right">
              {character.companyPrice}
            </StyledTableCell>
            <StyledTableCell align="right">
              <Button
                // type="submit"
                // className="add-remove-stock-chart"
                className={classes.add_remove_stock_chart}
                variant="contained"
                // color="secondary"
                onClick={() => deleteValue(character.companySymbol)}
              >
                Remove
              </Button>
            </StyledTableCell>
          </StyledTableRow>
          {/* ))} */}
        </TableBody>
      );
    } else {
      return null;
    }
  };

  if (profileStockData.length != 0) {
    card =
      profileStockData &&
      profileStockData.map((character) => {
        // let { show } = shows;
        return buildCard(character);
      });
  }

  return (
    <div>
      <div className="heading-name">
        <h1>Dashboard</h1>
      </div>
      {profileStockData.length == 0 ? (
        <Container>
          <h2>
            Currently, You don't have any stock to see. Go to stock charts or
            crypto charts and add it to the list.
          </h2>
        </Container>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table className={"classes.table"} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Symbol</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Option</StyledTableCell>
                </TableRow>
              </TableHead>
              {card}
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
  );
}

export default Dashboard;
