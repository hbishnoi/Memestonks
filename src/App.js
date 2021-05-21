import React from "react";
import FinancialItem from "./components/FinancialItem";
import FinancialItemWeekly from "./components/FinancialItemWeekly";
import FinancialItemMonthly from "./components/financialItemMonthly";
import Overview from "./components/Overview";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/aboutus";
import Brokerage from "./components/Brokerage";
import Signout from './components/SignOut'
import CryptoDaily from "./components/CryptoDaily";
import CryptoWeekly from "./components/CryptoWeekly";
import CryptoMonthly from "./components/CryptoMonthly";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
const defaultPath = () => {
  return(
  <h1>Page not found</h1>
  );
};

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="sidenav">
              <Link className="home-link item" to="/">
                Home
              </Link>
              <Link className="stock-chart-link item" to="/stock-chart">
                Stock Charts
              </Link>
              <Link className="crypto-chart-link item" to="/crypto-chart">
                Crypto Charts
              </Link>             
              <Link className="dashboard-link item" to="/dashboard">
                My Dashboard
              </Link>
              <Link className="account-link item" to="/account">
                Account
              </Link>
              <Link className="brokerage-link item" to="/brokerage">
                Brokerage Apps
              </Link>
              <Link className="about-link item" to="/about">
                About Us
              </Link>
              <br/>
              <br/>
              {/* <Link className="signout item" to="/signout">
                Sign out
              </Link> */}
              <Signout/>
            </div>
            <div className="App-body">
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute
                  exact
                  path="/stock-chart"
                  component={FinancialItem}
                />
                <PrivateRoute
                  exact
                  path="/stock-chart-weekly"
                  component={FinancialItemWeekly}
                />
                <PrivateRoute
                  exact
                  path="/stock-chart-monthly"
                  component={FinancialItemMonthly}
                />
                <PrivateRoute
                  exact
                  path="/crypto-chart"
                  component={CryptoDaily}
                />
                <PrivateRoute
                  exact
                  path="/crypto-chart-weekly"
                  component={CryptoWeekly}
                />
                <PrivateRoute
                  exact
                  path="/crypto-chart-monthly"
                  component={CryptoMonthly}
                />
                <PrivateRoute exact path="/account" component={Account} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/about" component={About} />
                <Route exact path="/brokerage" component={Brokerage} />
                <Route exact path="/signout" component={Signout} />
                <Route component={defaultPath} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
