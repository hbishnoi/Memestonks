import React from "react";
import "../App.css";

import { Link } from "react-router-dom";
function Root() {
  return (
    <div className="flatnav">
      <br></br>
      <table>
        <tr>
          <td>
            <Link className="daily item" to="/crypto-chart">
              Daily
            </Link>
          </td>
          <td>
            <Link className="weekly item" to="/crypto-chart-weekly">
              Weekly
            </Link>
          </td>
          <td>
            <Link className="monthly item" to="/crypto-chart-Monthly">
              Monthly
            </Link>
          </td>
        </tr>
      </table>
      {/* <Link className="flatnav-item" to="/stock-chart-info">
          Info
        </Link> */}
    </div>
  );
}

export default Root;
