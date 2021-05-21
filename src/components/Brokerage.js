import React from "react";
import "../css/brokerage.css";
function Root() {
  return (
    <div className="page">
      <h1 className="title">
          Which Brokerage is right for you?
        </h1>
      <div className="container">
        <nav id="toc" data-toggle="toc">
          <ul className="no-bullets">
            <li className="head">
              <a href="#commissions_brokerages">Commissions Brokerages</a>
            </li>
            <li className="toc_child">
              <ul>
                <li className="item">
                  <a href="#tdameritrade">TDAmeritrade</a>
                </li>
                <li className="item">
                  <a href="#Ninjatrader7/8*">Ninjatrader 7/8*</a>
                </li>
                <li className="item">
                  <a href="#Tastyworks">Tastyworks</a>
                </li>
                <li className="item">
                  <a href="#AMP">AMP</a>
                </li>
                <li className="item">
                  <a href="#interactivebrokers">Interactive Brokers</a>
                </li>
              </ul>
            </li>
            <br></br>
            <li className="head">
              <a href="#NO_commissions_brokerages">NO commissions brokerages</a>
            </li>
            <li className="toc_child">
              <ul>
                <li className="item">
                  <a href="#Robinhood">Robinhood</a>
                </li>
                <li className="item">
                  <a href="#Fidelity">Fidelity</a>
                </li>
                <li className="item">
                  <a href="#Alpaca">Alpaca</a>
                </li>
                <li className="item">
                  <a href="#Oanda">Oanda</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div id="commissions_brokerages">
        <h2>Commissions Brokerages</h2>
        <h3 id="tdameritrade">TDAmeritrade</h3>
        <p>
          ThinkOrSwim is the all-around best stock/options/forex/futures
          platform. It has issues but it also has a lot of features and is used
          by tons of traders. The commissions are relatively high but you can
          call in and get them lowered if you complain. The charts are widely
          considered to be the best. At least a few times a year there will be
          data outages during trading hours on ThinkOrSwim.
        </p>
        <h3 id="Ninjatrader7/8*">Ninjatrader 7/8*</h3>
        <p>
          Ninjatrader 8 is a great platform for trading futures. The Ninjatrader
          site gives you a choice of two different futures brokerages which are
          pretty similar. There are rarely data outage issues but the charts are
          comparatively not as good as ThinkOrSwim though they have many
          standout features that no other platform has. If you can program you
          can indefinitely extend nearly every aspect of the platform.You can
          optionally buy the expensive multibroker license and use Ninjatrader 8
          simultaneously with a lot of different brokerages for futures, forex,
          and stocks, but the free/lease licenses are sufficient for futures
          trading depending on the features you need.
        </p>
        <h3 id="Tastyworks">Tastyworks</h3>
        <p>
          Lowest trading fees of all the commissions-having brokerages. The
          charts are crap and there is no tick data but a lot of people like it
          for executing trades due to the low fees.
        </p>
        <h3 id="AMP">AMP</h3>
        <p>
          The Walmart of futures trading. It's got a bunch of platforms you can
          choose from and some of the lowest commissions. I've traded with it.
          It's not bad. Most of the platforms they offer are garbage but the
          TT-Web trading platform is pretty good.
        </p>
        <h3 id="interactivebrokers">Interactive Brokers</h3>
        <p>
          Probably one of the worst interfaces but it has low fees and a lot of
          people swear by it.
        </p>
      </div>
      <div id="NO_commissions_brokerages">
        <h2>No Commissions Brokerages</h2>
        <h3 id="Robinhood">Robinhood</h3>
        <p>
          (Because of the Gamestop and crypocurrency fiascos, Robinhood has lost
          significant respect amongst wallstreebets users) Robinhood is the
          original no-fee brokerage. They now offer options as well as long-only
          stock trades. They have a phone client and a new PC interface.
        </p>
        <h3 id="Fidelity">Fidelity</h3>
        <p>
          As Robinhood lost respect and its users for not allowing trading on
          some of the most popular meme stocks(GME,AMC,etc), Fidelity was the
          brokerage that gained the most users and respect. It is now one of the
          top choices of wallstreetbets users.
        </p>
        <h3 id="Alpaca">Alpaca</h3>
        <p>
          Alpaca is a no-fee algo-trading brokerage that is in early access. I
          don't have a whole lot of information about it but I'm interested to
          see what people do with the free market data API.
        </p>
        <h3 id="Oanda">Oanda</h3>
        <p>
          Technically free forex brokerage, you just pay spread. TD has that too
          though.
        </p>
      </div>

      <p>
        This website is purely for educational purposes, all content was taken
        directly from https://www.reddit.com/r/wallstreetbets/wiki/brokerages
        and from posts within the subreddit
      </p>
    </div>
  );
}

export default Root;
