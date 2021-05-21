const express = require("express");
const app = express();
const md5 = require("blueimp-md5");
const axios = require("axios");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
const PORT = 8080;
const fetch = require("node-fetch");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/financial/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`finItemData${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      let errorMessage = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data["Error Message"] || data["Note"]) {
              errorMessage = "error";
            } else {
              for (let key in data["Time Series (Daily)"]) {
                financialChartXValuesFunction.push(key);
                financialChartCloseValuesFunction.push(
                  data["Time Series (Daily)"][key]["4. close"]
                );
                financialChartOpenValuesFunction.push(
                  data["Time Series (Daily)"][key]["1. open"]
                );
                financialChartHighValuesFunction.push(
                  data["Time Series (Daily)"][key]["2. high"]
                );
                financialChartLowValuesFunction.push(
                  data["Time Series (Daily)"][key]["3. low"]
                );
              }
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        errorMessage: errorMessage,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      if (errorMessage === null) {
        await client.setAsync(
          `finItemData${ticker}`,
          JSON.stringify(financialItem)
        );
      } else {
        res.json(financialItem);
      }
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/financial/overview/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("financial overview fired");
    let overview = await client.getAsync(`finOverview${ticker}`);
    if (overview == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let overviewData = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            overviewData = data;
          });
      } catch (e) {
        return e;
      }

      await client.setAsync(
        `finOverview${ticker}`,
        JSON.stringify(overviewData)
      );
      res.json(overviewData);
    } else {
      console.log("Overview already cached");
      res.json(JSON.parse(overview));
    }
  } catch (e) {
    console.log("Error in Overview express route");
    res.json(e);
  }
});

app.get("/financialWeekly/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`finItemDataWeekly${ticker}`);
    // console.log(finItemData);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      let errorMessage = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data["Error Message"] || data["Note"]) {
              errorMessage = "error";
            }
            // console.log(data)
            else {
              for (let key in data["Weekly Adjusted Time Series"]) {
                financialChartXValuesFunction.push(key);
                financialChartCloseValuesFunction.push(
                  data["Weekly Adjusted Time Series"][key]["4. close"]
                );
                financialChartOpenValuesFunction.push(
                  data["Weekly Adjusted Time Series"][key]["1. open"]
                );
                financialChartHighValuesFunction.push(
                  data["Weekly Adjusted Time Series"][key]["2. high"]
                );
                financialChartLowValuesFunction.push(
                  data["Weekly Adjusted Time Series"][key]["3. low"]
                );
              }
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        errorMessage: errorMessage,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      if (errorMessage === null) {
        await client.setAsync(
          `finItemDataWeekly${ticker}`,
          JSON.stringify(financialItem)
        );
        res.json(financialItem);
      } else {
        res.json(financialItem);
      }
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/financialMonthly/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`finItemDataMonthly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      let errorMessage = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data["Error Message"] || data["Note"]) {
              errorMessage = "error";
            }
            // console.log(data)
            else {
              for (let key in data["Monthly Adjusted Time Series"]) {
                financialChartXValuesFunction.push(key);
                financialChartCloseValuesFunction.push(
                  data["Monthly Adjusted Time Series"][key]["4. close"]
                );
                financialChartOpenValuesFunction.push(
                  data["Monthly Adjusted Time Series"][key]["1. open"]
                );
                financialChartHighValuesFunction.push(
                  data["Monthly Adjusted Time Series"][key]["2. high"]
                );
                financialChartLowValuesFunction.push(
                  data["Monthly Adjusted Time Series"][key]["3. low"]
                );
              }
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        errorMessage: errorMessage,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      if (errorMessage === null) {
        await client.setAsync(
          `finItemDataMonthly${ticker}`,
          JSON.stringify(financialItem)
        );
        res.json(financialItem);
      } else {
        res.json(financialItem);
      }
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get(
  "/addStockToprofile1/:userName/:companyName",
  async function (req, res) {
    try {
      let companyName = req.params.companyName;
      let userName = req.params.userName;

      let companySymbol = "";
      let companyPriceArray = [];
      let companyPrice = "";
      console.log("Company Name fired");
      // let companyNameData = await client.smembersAsync(userName);
      let oldBinnedImage = null;
      let companyNameData = await client.smembersAsync(userName);
      // console.log(companyNameData);
      companyNameData.forEach((x) => {
        let parseImages = JSON.parse(x);
        if (parseImages.companyName == companyName) {
          oldBinnedImage = x;
        }
      });
      if (oldBinnedImage == null) {
        // console.log(companyName, userName);
        const API_KEY = "B72KIC37FDER7YGS";
        try {
          await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${companyName}&market=CNY&apikey=${API_KEY}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              // console.log(data);
              // companyName = data.data["Meta Data"]["2. Symbol"];
              companySymbol = data["Meta Data"]["2. Symbol"];
              for (let key in data["Time Series (Daily)"]) {
                companyPriceArray.push(
                  data["Time Series (Daily)"][key]["4. close"]
                );
              }
              companyPrice = companyPriceArray[0];
            });
        } catch (e) {
          return e;
        }
        // console.log("profileStockData");
        const profileStockData = {
          companyName: companyName,
          companySymbol: companySymbol,
          companyPrice: companyPrice,
        };
        await client.saddAsync(userName, JSON.stringify(profileStockData));
        // const checkValue = await client.hexistAsync(userName, companyName);
        // console.log(profileStockData);
        res.json(profileStockData);
      } else {
        console.log("already cached binned");
        // console.log(oldBinnedImage);
        res.json(JSON.parse(oldBinnedImage));
      }
    } catch (e) {
      console.log("error");
      console.log(e);
      res.json(e);
    }
  }
);

app.get(
  "/addCryptoToprofile/:userName/:companyName",
  async function (req, res) {
    try {
      let companyName = req.params.companyName;
      let userName = req.params.userName;

      let newCompanyName = "";
      let companySymbol = "";
      let companyPriceArray = [];
      let companyPrice = "";
      console.log("crypto Company Name fired");
      // let companyNameData = await client.smembersAsync(userName);
      let oldBinnedImage = null;
      let companyNameData = await client.smembersAsync(userName);
      // console.log(companyNameData);
      companyNameData.forEach((x) => {
        let parseImages = JSON.parse(x);
        if (parseImages.companySymbol == companyName) {
          oldBinnedImage = x;
        }
      });

      console.log("crypto Company Name fired1");
      if (oldBinnedImage == null) {
        console.log("crypto Company Name fired2");
        // console.log(companyName, userName);
        // const API_KEY = "9SEJV46K465GDV17";
        const API_KEY = "B72KIC37FDER7YGS";
        try {
          await fetch(
            `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${companyName}&market=CNY&apikey=${API_KEY}`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              // res.json(data);
              // console.log(data.data);
              // console.log(data["Meta Data"]["Digital Currency Code"]);

              newCompanyName = data["Meta Data"]["3. Digital Currency Name"];
              companySymbol = data["Meta Data"]["2. Digital Currency Code"];
              for (let key in data["Time Series (Digital Currency Daily)"]) {
                companyPriceArray.push(
                  data["Time Series (Digital Currency Daily)"][key][
                    "4b. close (USD)"
                  ]
                );
              }
              companyPrice = companyPriceArray[0];
            });
        } catch (e) {
          return e;
        }
        // console.log("newCompanyName", newCompanyName);
        // console.log("companySymbol", companySymbol);
        // console.log("companyPrice", companyPrice);
        const profileStockData = {
          companyName: newCompanyName,
          companySymbol: companySymbol,
          companyPrice: companyPrice,
        };
        await client.saddAsync(userName, JSON.stringify(profileStockData));
        // const checkValue = await client.hexistAsync(userName, companyName);
        // console.log(profileStockData);
        res.json(profileStockData);
      } else {
        console.log("already cached binned");
        // console.log(oldBinnedImage);
        res.json(JSON.parse(oldBinnedImage));
      }
    } catch (e) {
      console.log("error");
      console.log(e);
      res.json(e);
    }
  }
);

app.get("/checkStock/:userName/:companyName", async function (req, res) {
  try {
    let companyName = req.params.companyName;
    let userName = req.params.userName;

    console.log("check Company Name fired");
    let oldBinnedStockData = null;
    let companyNameData = await client.smembersAsync(userName);
    // console.log(companyNameData);
    companyNameData.forEach((x) => {
      let parseData = JSON.parse(x);
      if (parseData.companyName == companyName) {
        oldBinnedStockData = x;
      }
    });
    res.json(JSON.parse(oldBinnedStockData));
    // if (oldBinnedStockData == null) {
    //   console.log("false");
    //   res.json({ buttonVaue: true });
    // } else {
    //   console.log("true");
    //   res.json({ buttonVaue: false });
    // }
  } catch (e) {
    console.log("error");
    console.log(e);
    res.json(e);
  }
});

app.get("/checkCryptoStock/:userName/:companyName", async function (req, res) {
  try {
    let companyName = req.params.companyName;
    let userName = req.params.userName;

    console.log("check Company Name fired");
    let oldBinnedStockData = null;
    let companyNameData = await client.smembersAsync(userName);
    // console.log(companyNameData);
    companyNameData.forEach((x) => {
      let parseData = JSON.parse(x);
      if (parseData.companySymbol == companyName) {
        oldBinnedStockData = x;
      }
    });
    // console.log(oldBinnedStockData);
    res.json(JSON.parse(oldBinnedStockData));
    // if (oldBinnedStockData == null) {
    //   console.log("false");
    //   res.json({ buttonVaue: true });
    // } else {
    //   console.log("true");
    //   res.json({ buttonVaue: false });
    // }
  } catch (e) {
    console.log("error");
    console.log(e);
    res.json(e);
  }
});

app.get("/checkStock/:userName/", async function (req, res) {
  try {
    // let companyName = req.params.companyName;
    let userName = req.params.userName;

    console.log("check Company Name fired");
    // let oldBinnedImage = null;
    let companyNameData = await client.smembersAsync(userName);
    // console.log(companyNameData);
    res.json(companyNameData);
  } catch (e) {
    console.log("error");
    console.log(e);
    res.json(e);
  }
});

app.get(
  "/deleteStockFromprofile/:userName/:companyName",
  async function (req, res) {
    try {
      let companyName = req.params.companyName;
      let userName = req.params.userName;

      console.log("Delete Company Name fired");
      // console.log("companyName", companyName);

      let oldUploadStockData = null;
      let companyNameData = await client.smembersAsync(userName);

      companyNameData.forEach((x) => {
        let parsedData = JSON.parse(x);
        if (parsedData.companySymbol == companyName) {
          oldUploadStockData = x;
        }
      });

      // console.log(oldUploadStockData);

      if (oldUploadStockData != null) {
        // console.log("here1");
        const asd = await client.sremAsync(userName, oldUploadStockData);
        // console.log(asd);
        let newUploadData = null;
        let newCompanyNameData = await client.smembersAsync(userName);
        newCompanyNameData.forEach((x) => {
          let parsedData = JSON.parse(x);
          if (parsedData.companySymbol == companyName) {
            newUploadData = x;
          }
        });
        // let x = null;
        let y = await client.smembersAsync(userName);
        // console.log(y);
        // y.forEach((i) => {
        //   let parsedImages = JSON.parse(i);
        //   if (parsedImages.companyName == companyName) {
        //     x.push(parsedImages);
        //     console.log(parsedImages)
        //   }
        // });
        if (newUploadData == null) {
          console.log("Delete Company Name fired 11");
          res.json({ buttonVaue: false, newCompanyValue: newCompanyNameData });
        } else {
          console.log("Delete Company Name fired 12");
          res.json({ buttonVaue: true, newCompanyValue: newCompanyNameData });
        }
        // res.json(false);
      } else {
        // console.log("here2");
        res.json({ buttonVaue: false, newCompanyValue: companyNameData });
      }

      // let companyNameData = await client.hdelAsync(userName, companyName);
      // console.log(companyNameData);
      // if (companyNameData) {
      //   let newCompanyNameData = await client.hgetallAsync(userName);
      //   const newProfileStockData = {
      //     companyName: newCompanyNameData[companyName].companyName,
      //     companySymbol: newCompanyNameData[companyName].companySymbol,
      //     companyPrice: newCompanyNameData[companyName].companyPrice,
      //   };
      //   res.json(JSON.parse(newProfileStockData[companyName]));
      //   // res.json(true);
      // } else {
      //   res.json(false);
      // }
    } catch (e) {
      console.log("error");
      console.log(e);
      res.json(e);
    }
  }
);

app.get("/cryptoExchangeRates/:ticker", async function (req, res) {
  try {
    const ticker = req.params.ticker;
    let financialItem = await client.getAsync(`exchangerates${ticker}`);
    if (financialItem) {
      let financialitem = JSON.parse(financialItem);
      res.json(financialitem);
    } else {
      const API_KEY = "9SEJV46K465GDV17";
      let data = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${ticker}&to_currency=USD&apikey=${API_KEY}`
      );
      await client.setAsync(
        `exchangerates${ticker}`,
        JSON.stringify(data.data)
      );
      res.json(data.data);
    }
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.get("/cryptoHealthIndex/:ticker", async function (req, res) {
  try {
    const ticker = req.params.ticker;
    let financialdata = await client.getAsync(`healthindex${ticker}`);
    if (financialdata) {
      res.json(JSON.parse(financialdata));
    } else {
      const API_KEY = "9SEJV46K465GDV17";
      let data = await axios.get(
        `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${ticker}&apikey=${API_KEY}`
      );
      await client.setAsync(`healthindex${ticker}`, JSON.stringify(data.data));
      res.json(data.data);
    }
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.get("/cryptoDaily/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`cryptoDaily${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      let errorMessage = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data["Error Message"] || data["Note"]) {
              errorMessage = "error";
            } else {
              for (let key in data["Time Series (Digital Currency Daily)"]) {
                financialChartXValuesFunction.push(key);
                financialChartCloseValuesFunction.push(
                  data["Time Series (Digital Currency Daily)"][key][
                    "4b. close (USD)"
                  ]
                );
                financialChartOpenValuesFunction.push(
                  data["Time Series (Digital Currency Daily)"][key][
                    "1b. open (USD)"
                  ]
                );
                financialChartHighValuesFunction.push(
                  data["Time Series (Digital Currency Daily)"][key][
                    "2b. high (USD)"
                  ]
                );
                financialChartLowValuesFunction.push(
                  data["Time Series (Digital Currency Daily)"][key][
                    "3b. low (USD)"
                  ]
                );
              }
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        errorMessage: errorMessage,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      if (errorMessage === null) {
        await client.setAsync(
          `cryptoDaily${ticker}`,
          JSON.stringify(financialItem)
        );
        res.json(financialItem);
      } else {
        res.json(financialItem);
      }
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/cryptoWeekly/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`cryptoWeekly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      let errorMessage = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data["Error Message"] || data["Note"]) {
              errorMessage = "error";
            } else {
              for (let key in data["Time Series (Digital Currency Weekly)"]) {
                financialChartXValuesFunction.push(key);
                financialChartCloseValuesFunction.push(
                  data["Time Series (Digital Currency Weekly)"][key][
                    "4b. close (USD)"
                  ]
                );
                financialChartOpenValuesFunction.push(
                  data["Time Series (Digital Currency Weekly)"][key][
                    "1b. open (USD)"
                  ]
                );
                financialChartHighValuesFunction.push(
                  data["Time Series (Digital Currency Weekly)"][key][
                    "2b. high (USD)"
                  ]
                );
                financialChartLowValuesFunction.push(
                  data["Time Series (Digital Currency Weekly)"][key][
                    "3b. low (USD)"
                  ]
                );
              }
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        errorMessage: errorMessage,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      if (errorMessage === null) {
        await client.setAsync(
          `cryptoWeekly${ticker}`,
          JSON.stringify(financialItem)
        );
        res.json(financialItem);
      } else {
        res.json(financialItem);
      }
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/cryptoMonthly/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`cryptoMonthly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      let errorMessage = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data["Error Message"] || data["Note"]) {
              errorMessage = "error";
            }
            // console.log(data)
            else {
              for (let key in data["Time Series (Digital Currency Monthly)"]) {
                financialChartXValuesFunction.push(key);
                financialChartCloseValuesFunction.push(
                  data["Time Series (Digital Currency Monthly)"][key][
                    "4b. close (USD)"
                  ]
                );
                financialChartOpenValuesFunction.push(
                  data["Time Series (Digital Currency Monthly)"][key][
                    "1b. open (USD)"
                  ]
                );
                financialChartHighValuesFunction.push(
                  data["Time Series (Digital Currency Monthly)"][key][
                    "2b. high (USD)"
                  ]
                );
                financialChartLowValuesFunction.push(
                  data["Time Series (Digital Currency Monthly)"][key][
                    "3b. low (USD)"
                  ]
                );
              }
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        errorMessage: errorMessage,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      if (errorMessage === null) {
        await client.setAsync(
          `cryptoMonthly${ticker}`,
          JSON.stringify(financialItem)
        );
        res.json(financialItem);
      } else {
        res.json(financialItem);
      }
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
