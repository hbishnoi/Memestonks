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
            <Link className="daily item" to="/stock-chart">
              Daily
            </Link>
          </td>
          <td>
            <Link className="weekly item" to="/stock-chart-weekly">
              Weekly
            </Link>
          </td>
          <td>
            <Link className="monthly item" to="/stock-chart-Monthly">
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
