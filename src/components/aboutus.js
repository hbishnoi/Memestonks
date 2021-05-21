import React from "react";
import '../css/home.css'

function Root() {
    return (
        <div>
            <h1> About us 🌕🚀</h1>
            <p>
                We are Students at Stevens Institute of Technology, and this is our final project for CS554(Web development II) with Professor Patrick Hill
            </p>
            <h2 className="title">
                Our Team </h2>
                <ul>
                    <li>
                        Jordan Greenberg
                    </li>
                    <li>
                        Vineeth VS
                    </li>
                    <li>
                    Raj Mahajan
                    </li>
                    <li>
                    Himanshu Bishnoi
                    </li>
                </ul>
            <h3>What is MemeStonks</h3>
            <p className="whatis">
                During the Covid-19 pandemic, the stock market has seen a surge in popularity among the
                younger generations. More young people are putting their intellect together to invest cash into
                stocks that they think show potential. A popular subreddit called Wall Street bets now has 9.6
                million members, continuing to rise every day.
                While reddit is a great community, our application would bring some much needed features. Our
                app would take popular "meme stocks" and display real-time price updates about each stock
                using an api called ALPHA VANTAGE to get the information and PLOT.LY to display it on our
                website. We will also provide information about popular
                brokerage applications in order for people to make an educated decision on where they park
                their money. All in all, this is a one stop shop for young people to inform themselves on
                these popular "meme stocks".
            </p>
        </div>
    );
}

export default Root;