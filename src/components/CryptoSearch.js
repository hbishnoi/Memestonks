import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
const CryptoSearch = (props) => {
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name="formName"
      className="center"
    >
      <Autocomplete
        id="combo-box-demo"
        options={[
          { ticker: "BTC", name: "Bitcoin" },
          { ticker: "ETH", name: "Ethereum" },
          { ticker: "ADA", name: "Cardano" },
          { ticker: "DOGE", name: "Doge Coin" },
          { ticker: "SHIB", name: "Shiba INU" },
        ]}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Top Cryptocurrencies"
            variant="outlined"
          />
        )}
        onChange={(event, newValue) => {
          props.searchValue(newValue);
        }}
      />
    </form>
  );
};

export default CryptoSearch;
